import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import Avatar from '../components/Avatar.jsx';
import FollowButton from '../components/FollowButton.jsx';
import Loading from '../components/Loading.jsx';

export default function Explore() {
  const [users, setUsers] = useState(null);
  const [q, setQ] = useState('');
  const [error, setError] = useState('');

  const load = async (keyword = '') => {
    setError('');
    try {
      const d = await api.listUsers(keyword);
      setUsers(d.users);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const search = (e) => {
    e.preventDefault();
    load(q.trim());
  };

  const toggleFollow = async (u, follow) => {
    try {
      if (follow) await api.follow(u.id);
      else await api.unfollow(u.id);
      setUsers((prev) =>
        prev.map((x) => (x.id === u.id ? { ...x, is_following: follow, follower_count: x.follower_count + (follow ? 1 : -1) } : x)),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">发现用户</h1>
      <form onSubmit={search} className="search-bar">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜索用户名或昵称"
        />
        <button className="btn btn-primary">搜索</button>
      </form>
      {error && <div className="alert alert-error">{error}</div>}
      {!users ? (
        <Loading />
      ) : users.length === 0 ? (
        <div className="empty">
          <p>{q ? `没有找到与 "${q}" 相关的用户` : '暂时没有其他用户'}</p>
        </div>
      ) : (
        <div className="user-list">
          {users.map((u) => (
            <div key={u.id} className="user-row">
              <Link to={`/u/${u.id}`}>
                <Avatar user={u} size={48} />
              </Link>
              <div className="user-row-info">
                <Link to={`/u/${u.id}`} className="user-row-name">
                  {u.display_name || u.username}
                </Link>
                <span className="user-row-sub">
                  @{u.username} · {u.follower_count} 粉丝 · {u.following_count} 关注
                  {u.follows_me && ' · 已关注你'}
                </span>
                {u.bio && <p className="user-row-bio">{u.bio}</p>}
              </div>
              <FollowButton user={u} onToggle={toggleFollow} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
