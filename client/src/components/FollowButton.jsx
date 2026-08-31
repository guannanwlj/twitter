import { useAuth } from '../context/AuthContext.jsx';

export default function FollowButton({ user, size = 'md', onToggle }) {
  const { user: me } = useAuth();
  if (!user || user.id === me?.id) return null;
  const following = !!user.is_following;
  return (
    <button
      className={`btn btn-follow ${following ? 'following' : ''} btn-${size}`}
      onClick={() => onToggle?.(user, !following)}
    >
      {following ? '已关注' : '关注'}
    </button>
  );
}
