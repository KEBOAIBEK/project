/**
 * API client configuration and core request utilities.
 *
 * Single Responsibility: HTTP transport layer only.
 * All API endpoint functions are in their respective service modules.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://164.68.123.58:8080';

// ── Token Management ────────────────────────────

const TOKEN_KEY = 'token';

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);

export const isAuthenticated = () => !!getAuthToken();

// ── HTTP Helpers ────────────────────────────────

const handleResponse = async (response) => {
  if (response.status === 401 || response.status === 403) {
    console.warn('API returned 401/403 - may need authentication');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

/**
 * Core API request wrapper with auth headers.
 * @param {string} endpoint - API path (e.g. '/reports/getAll')
 * @param {RequestInit} options - Fetch options
 */
export const apiRequest = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    return handleResponse(response);
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};
