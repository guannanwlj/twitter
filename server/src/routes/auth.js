import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db.js';
import { authRequired, signToken, publicUser } from '../middleware/auth.js';

const router = Router();

router.post('/register', (req, res) => {
  const { username, password, display_name, bio } = req.body || {};
  const name = String(username || '').trim();
  const pwd = String(password || '');

  if (name.length < 3 || name.length > 20) {
    return res.status(400).json({ error: '用户名长度需为 3-20 个字符' });
  }
  if (!/^[a-zA-Z0-9_]+$/.test(name)) {
    return res.status(400).json({ error: '用户名只能包含字母、数字和下划线' });
  }
  if (pwd.length < 6) {
    return res.status(400).json({ error: '密码至少需要 6 位' });
  }
  if (name.toLowerCase() === 'me' || name.toLowerCase() === 'feed' || name.toLowerCase() === 'users') {
    return res.status(400).json({ error: '该用户名不可用' });
  }

  const exists = db.prepare('SELECT id FROM users WHERE username = ?').get(name);
  if (exists) {
    return res.status(409).json({ error: '用户名已被注册' });
  }

  const hash = bcrypt.hashSync(pwd, 10);
  const result = db
    .prepare('INSERT INTO users (username, display_name, bio, password_hash) VALUES (?, ?, ?, ?)')
    .run(name, (display_name || '').trim() || null, (bio || '').trim(), hash);
  const userId = result.lastInsertRowid;

  const user = db
    .prepare('SELECT id, username, display_name, bio, created_at FROM users WHERE id = ?')
    .get(userId);
  res.status(201).json({ token: signToken(userId), user: publicUser(user) });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  const name = String(username || '').trim();

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(name);
  if (!user || !bcrypt.compareSync(String(password || ''), user.password_hash)) {
    return res.status(401).json({ error: '用户名或密码错误' });
  }
  res.json({ token: signToken(user.id), user: publicUser(user) });
});

router.get('/me', authRequired, (req, res) => {
  res.json({ user: req.user });
});

export default router;
