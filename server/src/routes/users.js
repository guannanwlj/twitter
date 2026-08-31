import { Router } from 'express';
import { db } from '../db.js';
import { authRequired, publicUser } from '../middleware/auth.js';

const router = Router();

router.get('/', authRequired, (req, res) => {
  const keyword = String(req.query.q || '').trim();
  const meId = req.user.id;

  const base = `
    SELECT u.id, u.username, u.display_name, u.bio, u.created_at,
           (SELECT COUNT(*) FROM follows f WHERE f.followee_id = u.id) AS follower_count,
           (SELECT COUNT(*) FROM follows f WHERE f.follower_id = u.id) AS following_count,
           EXISTS(SELECT 1 FROM follows f WHERE f.follower_id = ? AND f.followee_id = u.id) AS is_following,
           EXISTS(SELECT 1 FROM follows f WHERE f.followee_id = ? AND f.follower_id = u.id) AS follows_me
    FROM users u
    WHERE u.id != ?
  `;
  const rows = keyword
    ? db
        .prepare(`${base} AND (u.username LIKE ? OR u.display_name LIKE ?) ORDER BY u.created_at DESC`)
        .all(meId, meId, meId, `%${keyword}%`, `%${keyword}%`)
    : db.prepare(`${base} ORDER BY u.created_at DESC`).all(meId, meId, meId);

  res.json({ users: rows.map(format) });
});

function format(u) {
  const user = publicUser(u);
  return {
    ...user,
    follower_count: u.follower_count,
    following_count: u.following_count,
    is_following: !!u.is_following,
    follows_me: !!u.follows_me,
  };
}

router.get('/:id', authRequired, (req, res) => {
  const id = Number(req.params.id);
  const meId = req.user.id;

  const user = db
    .prepare(
      `SELECT u.id, u.username, u.display_name, u.bio, u.created_at,
              (SELECT COUNT(*) FROM follows f WHERE f.followee_id = u.id) AS follower_count,
              (SELECT COUNT(*) FROM follows f WHERE f.follower_id = u.id) AS following_count,
              EXISTS(SELECT 1 FROM follows f WHERE f.follower_id = ? AND f.followee_id = u.id) AS is_following,
              EXISTS(SELECT 1 FROM follows f WHERE f.followee_id = ? AND f.follower_id = u.id) AS follows_me
       FROM users u WHERE u.id = ?`,
    )
    .get(meId, meId, id);

  if (!user) {
    return res.status(404).json({ error: '用户不存在' });
  }

  const posts = db
    .prepare(
      `SELECT p.id, p.content, p.created_at,
              (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS like_count,
              (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comment_count,
              EXISTS(SELECT 1 FROM likes l WHERE l.post_id = p.id AND l.user_id = ?) AS liked_by_me
       FROM posts p WHERE p.user_id = ? ORDER BY p.created_at DESC, p.id DESC`,
    )
    .all(meId, id);

  res.json({ user: format(user), posts });
});

router.post('/:id/follow', authRequired, (req, res) => {
  const meId = req.user.id;
  const targetId = Number(req.params.id);
  if (meId === targetId) {
    return res.status(400).json({ error: '不能关注自己' });
  }
  const target = db.prepare('SELECT id FROM users WHERE id = ?').get(targetId);
  if (!target) {
    return res.status(404).json({ error: '用户不存在' });
  }
  db.prepare('INSERT OR IGNORE INTO follows (follower_id, followee_id) VALUES (?, ?)').run(meId, targetId);
  res.status(201).json({ following: true });
});

router.delete('/:id/follow', authRequired, (req, res) => {
  const meId = req.user.id;
  const targetId = Number(req.params.id);
  db.prepare('DELETE FROM follows WHERE follower_id = ? AND followee_id = ?').run(meId, targetId);
  res.json({ following: false });
});

router.get('/:id/followers', authRequired, (req, res) => {
  const targetId = Number(req.params.id);
  const meId = req.user.id;
  const rows = db
    .prepare(
      `SELECT u.id, u.username, u.display_name, u.bio, u.created_at,
              EXISTS(SELECT 1 FROM follows f WHERE f.follower_id = ? AND f.followee_id = u.id) AS is_following
       FROM follows f JOIN users u ON u.id = f.follower_id
       WHERE f.followee_id = ? ORDER BY f.created_at DESC`,
    )
    .all(meId, targetId);
  res.json({
    users: rows.map((u) => ({ ...publicUser(u), is_following: !!u.is_following })),
  });
});

router.get('/:id/following', authRequired, (req, res) => {
  const targetId = Number(req.params.id);
  const meId = req.user.id;
  const rows = db
    .prepare(
      `SELECT u.id, u.username, u.display_name, u.bio, u.created_at,
              EXISTS(SELECT 1 FROM follows f WHERE f.follower_id = ? AND f.followee_id = u.id) AS is_following
       FROM follows f JOIN users u ON u.id = f.followee_id
       WHERE f.follower_id = ? ORDER BY f.created_at DESC`,
    )
    .all(meId, targetId);
  res.json({
    users: rows.map((u) => ({ ...publicUser(u), is_following: !!u.is_following })),
  });
});

export default router;
