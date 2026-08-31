import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api.js';
import Avatar from '../components/Avatar.jsx';
import Loading from '../components/Loading.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { timeAgo } from '../utils/time.js';

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [comment, setComment] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const d = await api.getPost(id);
      setData(d);
    } catch (err) {
      setError(err.message);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  if (error) return <div className="page"><div className="alert alert-error">{error}</div></div>;
  if (!data) return <Loading />;

  const { post, comments } = data;
  const isMine = user?.id === post.author?.id;

  const toggleLike = async () => {
    try {
      const d = post.liked_by_me
        ? await api.unlikePost(post.id)
        : await api.likePost(post.id);
      setData((prev) => ({
        ...prev,
        post: { ...prev.post, liked_by_me: d.liked, like_count: d.like_count },
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSending(true);
    setError('');
    try {
      const d = await api.addComment(post.id, comment);
      setData((prev) => ({
        ...prev,
        comments: [...prev.comments, d.comment],
        post: { ...prev.post, comment_count: prev.post.comment_count + 1 },
      }));
      setComment('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  const deletePost = async () => {
    if (!window.confirm('确定要删除这条帖子吗？')) return;
    try {
      await api.deletePost(post.id);
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)}>← 返回</button>

      <article className="post-card detail-card">
        <div className="post-head">
          <Link to={`/u/${post.author.id}`}>
            <Avatar user={post.author} />
          </Link>
          <div className="post-meta">
            <Link to={`/u/${post.author.id}`} className="post-author">
              {post.author.display_name || post.author.username}
            </Link>
            <span className="post-username">@{post.author.username}</span>
            <span className="post-time">{timeAgo(post.created_at)}</span>
          </div>
          {isMine && (
            <button className="btn btn-ghost btn-sm danger" onClick={deletePost}>删除</button>
          )}
        </div>
        <div className="post-content">{post.content}</div>
        <div className="post-actions">
          <button className={`btn-like${post.liked_by_me ? ' liked' : ''}`} onClick={toggleLike}>
            {post.liked_by_me ? '♥' : '♡'} {post.like_count || 0}
          </button>
          <span className="btn-comment">💬 {post.comment_count || 0}</span>
        </div>
      </article>

      <h2 className="section-title">评论 ({comments.length})</h2>
      <form onSubmit={submitComment} className="comment-form">
        <Avatar user={user} size={36} />
        <div className="comment-form-main">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="写下你的评论..."
            rows={2}
            maxLength={1000}
          />
          <div className="composer-actions">
            <button className="btn btn-primary btn-sm" disabled={sending || !comment.trim()}>
              {sending ? '发送中...' : '发表评论'}
            </button>
          </div>
        </div>
      </form>

      <div className="comment-list">
        {comments.length === 0 ? (
          <div className="empty"><p>还没有评论，快来抢沙发</p></div>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="comment-item">
              <Link to={`/u/${c.author.id}`}>
                <Avatar user={c.author} size={36} />
              </Link>
              <div className="comment-body">
                <div className="comment-meta">
                  <Link to={`/u/${c.author.id}`} className="post-author">
                    {c.author.display_name || c.author.username}
                  </Link>
                  <span className="post-username">@{c.author.username}</span>
                  <span className="post-time">{timeAgo(c.created_at)}</span>
                </div>
                <p className="comment-text">{c.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
