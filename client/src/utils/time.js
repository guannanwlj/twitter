export function timeAgo(dateStr) {
  const d = new Date(dateStr.replace(' ', 'T') + 'Z');
  const diff = (Date.now() - d.getTime()) / 1000;
  if (isNaN(diff) || diff < 0) return dateStr;
  if (diff < 60) return '刚刚';
  if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} 小时前`;
  if (diff < 86400 * 30) return `${Math.floor(diff / 86400)} 天前`;
  return dateStr;
}

export function formatDateTime(dateStr) {
  return (dateStr || '').replace('T', ' ').slice(0, 16);
}
