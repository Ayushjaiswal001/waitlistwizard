/**
 * API client — handles auth tokens, error responses, network failures, and auto-logout.
 */
const BASE = '/api';

function getHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  const token = localStorage.getItem('token');
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

async function handleResponse(res) {
  if (res.status === 401) {
    // Token expired or invalid — auto-logout
    localStorage.removeItem('token');
    window.location.hash = '#/login';
    throw new Error('Session expired. Please sign in again.');
  }
  if (!res.ok) {
    let msg = 'Request failed';
    try {
      const data = await res.json();
      msg = data.error || msg;
    } catch { /* ignore parse errors */ }
    throw new Error(msg);
  }
  return res.json();
}

const api = {
  async get(path) {
    try {
      const res = await fetch(BASE + path, { headers: getHeaders() });
      return handleResponse(res);
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        throw new Error('Network error. Check your connection.');
      }
      throw err;
    }
  },

  async post(path, data) {
    try {
      const res = await fetch(BASE + path, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        throw new Error('Network error. Check your connection.');
      }
      throw err;
    }
  },

  async put(path, data) {
    try {
      const res = await fetch(BASE + path, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        throw new Error('Network error. Check your connection.');
      }
      throw err;
    }
  },

  async del(path) {
    try {
      const res = await fetch(BASE + path, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      return handleResponse(res);
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        throw new Error('Network error. Check your connection.');
      }
      throw err;
    }
  },
};

export { api };
