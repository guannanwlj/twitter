import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api.js';
import Avatar from '../components/Avatar.jsx';
import FollowButton from '../components/FollowButton.jsx';
import PostCard from '../components/PostCard.jsx';
import Loading from '../components/Loading.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { formatDateTime } from '../utils/time.js';

export default function Profile() {
  const { id } = useParams();
  const { user: me, refresh } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [showFollowers, setShowFollowers] = useState(false);

  const load = useCallback(async () => {
    try {
      const d = await api.getUser(id);
      setData(d);
    } catch (err) {
      setError(err.message);
    }
  }, [id]);

  useEffect(() => {
    setData(null);
    load();
  }, [load]);

  const toggleFollow = async (u, follow) => {
    try {
      if (follow) await api.follow(u.id);
      else await api.unfollow(u.id);
      await load();
      await refresh();
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleLike = async (post) => {
    try {
      const d = post.liked_by_me
        ? await api.unlikePost(post.id)
        : await api.likePost(post.id);
      setData((prev) => ({
        ...prev,
        posts: prev.posts.map((p) =>
          p.id === post.id ? { ...p, liked_by_me: d.liked, like_count: d.like_count } : p,
        ),
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const deletePost = async (post) => {
    if (!window.confirm('确定要删除这条帖子吗？')) return;
    try {
      await api.deletePost(post.id);
      setData((prev) => ({ ...prev, posts: prev.posts.filter((p) => p.id !== post.id) }));
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <div className="page"><div className="alert alert-error">{error}</div></div>;
  if (!data) return <Loading />;

  const u = data.user;
  const isMe = me?.id === u.id;

  return (
    <div className="page">
      <div className="profile-card">
        <div className="profile-head">
          <Avatar user={u} size={72} />
          <div className="profile-info">
            <h1>{u.display_name || u.username}</h1>
            <p className="profile-username">@{u.username}</p>
            {u.bio && <p className="profile-bio">{u.bio}</p>}
          </div>
          {!isMe && <FollowButton user={u} size="lg" onToggle={toggleFollow} />}
        </div>
        <div className="profile-stats">
          <button className="stat" onClick={() => setShowFollowers(true)}>
            <b>{u.following_count}</b>
            <span>关注</span>
          </button>
          <button className="stat" onClick={() => setShowFollowers(false)}>
            <b>{u.follower_count}</b>
            <span>粉丝</span>
          </button>
          <div className="stat">
            <b>{data.posts.length}</b>
            <span>帖子</span>
          </div>
          <span className="profile-joined">加入于 {formatDateTime(u.created_at)}</span>
        </div>
      </div>

      <h2 className="section-title">{isMe ? '我的帖子' : `${u.display_name || u.username} 的帖子`}</h2>
      {data.posts.length === 0 ? (
        <div className="empty"><p>还没有发布任何帖子</p></div>
      ) : (
        <div className="post-list">
          {data.posts.map((p) => (
            <PostCard key={p.id} post={p} onLikeToggle={toggleLike} onDelete={deletePost} />
          ))}
        </div>
      )}

      {showFollowers && <UserListModal title="粉丝" fetchFn={() => api.getUserFollowers(u.id)} onClose={() => setShowFollowers(false)} />}
    </div>
  );
}

function UserListModal({ title, fetchFn, onClose }) {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFn()
      .then((d) => setUsers(d.users))
      .catch((err) => setError(err.message));
  }, [fetchFn]);

  const toggleFollow = async (u, follow) => {
    try {
      if (follow) await api.follow(u.id);
      else await api.unfollow(u.id);
      setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, is_following: follow } : x)));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="btn btn-ghost" onClick={onClose}>×</button>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        {!users ? (
          <Loading />
        ) : users.length === 0 ? (
          <div className="empty"><p>暂无用户</p></div>
        ) : (
          <div className="user-list">
            {users.map((u) => (
              <div key={u.id} className="user-row">
                <a href={`/u/${u.id}`} onClick={onClose}>
                  <Avatar user={u} size={40} />
                </a>
                <div className="user-row-info">
                  <a href={`/u/${u.id}`} className="user-row-name" onClick={onClose}>
                    {u.display_name || u.username}
                  </a>
                  <span className="user-row-sub">@{u.username}</span>
                </div>
                <FollowButton user={u} onToggle={toggleFollow} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
