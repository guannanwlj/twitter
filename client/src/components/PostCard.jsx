import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Avatar from './Avatar.jsx';
import { timeAgo } from '../utils/time.js';

export default function PostCard({ post, onLikeToggle, onDelete }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isMine = user?.id === post.author?.id;

  return (
    <article className="post-card">
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
          <button
            className="btn btn-ghost btn-sm danger"
            onClick={() => onDelete?.(post)}
          >
            删除
          </button>
        )}
      </div>
      <div
        className="post-content"
        onClick={() => navigate(`/posts/${post.id}`)}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && navigate(`/posts/${post.id}`)}
      >
        {post.content}
      </div>
      <div className="post-actions">
        <button
          className={`btn-like${post.liked_by_me ? ' liked' : ''}`}
          onClick={() => onLikeToggle?.(post)}
        >
          {post.liked_by_me ? '♥' : '♡'} {post.like_count || 0}
        </button>
        <button
          className="btn-comment"
          onClick={() => navigate(`/posts/${post.id}`)}
        >
          💬 {post.comment_count || 0}
        </button>
      </div>
    </article>
  );
}
