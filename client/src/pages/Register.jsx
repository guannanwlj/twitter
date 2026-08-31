import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', display_name: '', password: '', bio: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.password2) {
      setError('两次输入的密码不一致');
      return;
    }
    setBusy(true);
    try {
      await register(form);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h1 className="auth-brand">加入微圈</h1>
        <p className="auth-sub">创建你的账号</p>
        {error && <div className="alert alert-error">{error}</div>}
        <label className="field">
          <span>用户名 *</span>
          <input value={form.username} onChange={set('username')} placeholder="3-20 位字母、数字或下划线" autoFocus />
        </label>
        <label className="field">
          <span>昵称</span>
          <input value={form.display_name} onChange={set('display_name')} placeholder="展示给好友的名字" />
        </label>
        <label className="field">
          <span>密码 *</span>
          <input type="password" value={form.password} onChange={set('password')} placeholder="至少 6 位" />
        </label>
        <label className="field">
          <span>确认密码 *</span>
          <input type="password" value={form.password2} onChange={set('password2')} placeholder="再次输入密码" />
        </label>
        <label className="field">
          <span>个性签名</span>
          <input value={form.bio} onChange={set('bio')} placeholder="一句话介绍自己（可选）" />
        </label>
        <button className="btn btn-primary btn-block" disabled={busy}>
          {busy ? '注册中...' : '注册'}
        </button>
        <p className="auth-switch">
          已有账号？<Link to="/login">去登录</Link>
        </p>
      </form>
    </div>
  );
}
