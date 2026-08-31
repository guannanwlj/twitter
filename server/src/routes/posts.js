import { Router } from 'express';
import { db } from '../db.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

const postSelect = `
  SELECT p.id, p.user_id, p.content, p.created_at,
         u.username AS author_username,
         u.display_name AS author_display_name,
         (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS like_count,
         (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comment_count,
         EXISTS(SELECT 1 FROM likes l WHERE l.post_id = p.id AND l.user_id = ?) AS liked_by_me
`;

function formatPost(row) {
  return {
    id: row.id,
    content: row.content,
    created_at: row.created_at,
    like_count: row.like_count,
    comment_count: row.comment_count,
    liked_by_me: !!row.liked_by_me,
    author: {
      id: row.user_id,
      username: row.author_username,
      display_name: row.author_display_name,
    },
  };
}

router.post('/', authRequired, (req, res) => {
  const content = String((req.body || {}).content || '').trim();
  if (!content) {
    return res.status(400).json({ error: '帖子内容不能为空' });
  }
  if (content.length > 5000) {
    return res.status(400).json({ error: '帖子内容不能超过 5000 字' });
  }
  const result = db
    .prepare('INSERT INTO posts (user_id, content) VALUES (?, ?)')
    .run(req.user.id, content);
  const row = db
    .prepare(`${postSelect} FROM posts p JOIN users u ON u.id = p.user_id WHERE p.id = ?`)
    .get(req.user.id, result.lastInsertRowid);
  res.status(201).json({ post: formatPost(row) });
});

router.get('/feed', authRequired, (req, res) => {
  const meId = req.user.id;
  const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
  const offset = Math.max(Number(req.query.offset) || 0, 0);

  const rows = db
    .prepare(
      `${postSelect}
       FROM posts p
       JOIN users u ON u.id = p.user_id
       WHERE p.user_id = ? OR p.user_id IN (
         SELECT followee_id FROM follows WHERE follower_id = ?
       )
       ORDER BY p.created_at DESC, p.id DESC
       LIMIT ? OFFSET ?`,
    )
    .all(meId, meId, meId, limit, offset);

  res.json({ posts: rows.map(formatPost), has_more: rows.length === limit });
});

router.get('/:id', authRequired, (req, res) => {
  const meId = req.user.id;
  const row = db
    .prepare(`${postSelect} FROM posts p JOIN users u ON u.id = p.user_id WHERE p.id = ?`)
    .get(meId, Number(req.params.id));
  if (!row) {
    return res.status(404).json({ error: '帖子不存在' });
  }
  const comments = db
    .prepare(
      `SELECT c.id, c.content, c.created_at,
              c.user_id, u.username, u.display_name
       FROM comments c JOIN users u ON u.id = c.user_id
       WHERE c.post_id = ? ORDER BY c.created_at ASC, c.id ASC`,
    )
    .all(Number(req.params.id));
  res.json({
    post: formatPost(row),
    comments: comments.map((c) => ({
      id: c.id,
      content: c.content,
      created_at: c.created_at,
      author: { id: c.user_id, username: c.username, display_name: c.display_name },
    })),
  });
});

router.delete('/:id', authRequired, (req, res) => {
  const post = db.prepare('SELECT id, user_id FROM posts WHERE id = ?').get(Number(req.params.id));
  if (!post) {
    return res.status(404).json({ error: '帖子不存在' });
  }
  if (post.user_id !== req.user.id) {
    return res.status(403).json({ error: '只能删除自己的帖子' });
  }
  db.prepare('DELETE FROM posts WHERE id = ?').run(post.id);
  res.json({ ok: true });
});

router.post('/:id/like', authRequired, (req, res) => {
  const meId = req.user.id;
  const postId = Number(req.params.id);
  const post = db.prepare('SELECT id FROM posts WHERE id = ?').get(postId);
  if (!post) {
    return res.status(404).json({ error: '帖子不存在' });
  }
  db.prepare('INSERT OR IGNORE INTO likes (user_id, post_id) VALUES (?, ?)').run(meId, postId);
  const count = db.prepare('SELECT COUNT(*) AS n FROM likes WHERE post_id = ?').get(postId).n;
  res.json({ liked: true, like_count: count });
});

router.delete('/:id/like', authRequired, (req, res) => {
  const meId = req.user.id;
  const postId = Number(req.params.id);
  db.prepare('DELETE FROM likes WHERE user_id = ? AND post_id = ?').run(meId, postId);
  const count = db.prepare('SELECT COUNT(*) AS n FROM likes WHERE post_id = ?').get(postId).n;
  res.json({ liked: false, like_count: count });
});

router.post('/:id/comments', authRequired, (req, res) => {
  const content = String((req.body || {}).content || '').trim();
  if (!content) {
    return res.status(400).json({ error: '评论内容不能为空' });
  }
  if (content.length > 1000) {
    return res.status(400).json({ error: '评论不能超过 1000 字' });
  }
  const postId = Number(req.params.id);
  const post = db.prepare('SELECT id FROM posts WHERE id = ?').get(postId);
  if (!post) {
    return res.status(404).json({ error: '帖子不存在' });
  }
  const result = db
    .prepare('INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)')
    .run(postId, req.user.id, content);
  const c = db
    .prepare('SELECT id, content, created_at, user_id FROM comments WHERE id = ?')
    .get(result.lastInsertRowid);
  res.status(201).json({
    comment: {
      id: c.id,
      content: c.content,
      created_at: c.created_at,
      author: { id: req.user.id, username: req.user.username, display_name: req.user.display_name },
    },
  });
});

export default router;
