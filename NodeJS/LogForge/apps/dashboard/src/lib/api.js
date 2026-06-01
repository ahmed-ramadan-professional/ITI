const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};

  if (!response.ok) {
    const error = new Error(payload.message || 'Request failed');
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

export const api = {
  register: (body) => request('/api/users/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/api/users/login', { method: 'POST', body: JSON.stringify(body) }),
  logout: () => request('/api/users/logout', { method: 'POST' }),
  me: () => request('/api/users/me'),
  getApplications: () => request('/api/applications'),
  createApplication: (body) =>
    request('/api/applications', { method: 'POST', body: JSON.stringify(body) }),
  deleteApplication: (name) => request(`/api/applications/${encodeURIComponent(name)}`, { method: 'DELETE' }),
  getApplication: (name) => request(`/api/applications/${encodeURIComponent(name)}`),
  getLogs: (name, queryString) =>
    request(`/api/applications/${encodeURIComponent(name)}/logs${queryString ? `?${queryString}` : ''}`),
  getLogAnalytics: (name, queryString) =>
    request(
      `/api/applications/${encodeURIComponent(name)}/logs/analytics${
        queryString ? `?${queryString}` : ''
      }`
    )
};