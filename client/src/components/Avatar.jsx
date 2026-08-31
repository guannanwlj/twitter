const COLORS = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444', '#10b981'];

export function initialsOf(user) {
  const name = (user?.display_name || user?.username || '?').trim();
  return name.slice(0, 1).toUpperCase();
}

export default function Avatar({ user, size = 40 }) {
  if (!user) return null;
  const seed = (user.id || user.username || '').toString();
  let hash = 0;
  for (const ch of seed) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  const color = COLORS[hash % COLORS.length];
  return (
    <span
      className="avatar"
      style={{ width: size, height: size, fontSize: size * 0.45, backgroundColor: color }}
    >
      {initialsOf(user)}
    </span>
  );
}
