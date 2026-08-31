const TOKEN_KEY = 'social_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem('social_user');
}

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('social_user'));
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  if (user) localStorage.setItem('social_user', JSON.stringify(user));
  else localStorage.removeItem('social_user');
}

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`/api${path}`, { ...options, headers });
  } catch {
    throw new ApiError(0, '网络错误，请确认后端服务已启动');
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message = data?.error || `请求失败 (${res.status})`;
    const err = new ApiError(res.status, message);
    if (res.status === 401) clearAuth();
    throw err;
  }
  return data;
}

export const api = {
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  me: () => request('/auth/me'),

  listUsers: (q = '') => request(`/users${q ? `?q=${encodeURIComponent(q)}` : ''}`),
  getUser: (id) => request(`/users/${id}`),
  follow: (id) => request(`/users/${id}/follow`, { method: 'POST' }),
  unfollow: (id) => request(`/users/${id}/follow`, { method: 'DELETE' }),
  getUserFollowers: (id) => request(`/users/${id}/followers`),
  getUserFollowing: (id) => request(`/users/${id}/following`),

  feed: () => request('/posts/feed'),
  createPost: (content) => request('/posts', { method: 'POST', body: JSON.stringify({ content }) }),
  getPost: (id) => request(`/posts/${id}`),
  deletePost: (id) => request(`/posts/${id}`, { method: 'DELETE' }),
  likePost: (id) => request(`/posts/${id}/like`, { method: 'POST' }),
  unlikePost: (id) => request(`/posts/${id}/like`, { method: 'DELETE' }),
  addComment: (id, content) =>
    request(`/posts/${id}/comments`, { method: 'POST', body: JSON.stringify({ content }) }),
};
