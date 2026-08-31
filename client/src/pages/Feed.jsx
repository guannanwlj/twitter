import { useCallback, useEffect, useState } from 'react';
import { api } from '../api.js';
import PostCard from '../components/PostCard.jsx';
import Loading from '../components/Loading.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import Avatar from '../components/Avatar.jsx';

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState(null);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [posting, setPosting] = useState(false);

  const load = useCallback(async () => {
    try {
      const d = await api.feed();
      setPosts(d.posts);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const publish = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    setPosting(true);
    setError('');
    try {
      const d = await api.createPost(content);
      setPosts((prev) => [d.post, ...(prev || [])]);
      setContent('');
    } catch (err) {
      setError(err.message);
    } finally {
      setPosting(false);
    }
  };

  const toggleLike = async (post) => {
    try {
      const d = post.liked_by_me
        ? await api.unlikePost(post.id)
        : await api.likePost(post.id);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id ? { ...p, liked_by_me: d.liked, like_count: d.like_count } : p,
        ),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const deletePost = async (post) => {
    if (!window.confirm('确定要删除这条帖子吗？')) return;
    try {
      await api.deletePost(post.id);
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="feed-page">
      <div className="composer">
        <Avatar user={user} />
        <form onSubmit={publish} className="composer-form">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="分享新鲜事..."
            rows={3}
            maxLength={5000}
          />
          <div className="composer-actions">
            <span className="counter">{content.length}/5000</span>
            <button className="btn btn-primary" disabled={posting || !content.trim()}>
              {posting ? '发布中...' : '发布'}
            </button>
          </div>
        </form>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      {!posts ? (
        <Loading />
      ) : posts.length === 0 ? (
        <div className="empty">
          <p>还没有新鲜事</p>
          <p className="empty-sub">
            发第一条帖子，或去 <a href="/explore">发现用户</a> 关注好友
          </p>
        </div>
      ) : (
        <div className="post-list">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} onLikeToggle={toggleLike} onDelete={deletePost} />
          ))}
        </div>
      )}
    </div>
  );
}
