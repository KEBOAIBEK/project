/**
 * Auth API service.
 * Single Responsibility: Authentication operations only.
 */
import { apiRequest, setAuthToken } from './apiClient';

/**
 * Login to get JWT token.
 * POST /auth/login
 * @param {string} username
 * @param {string} password
 */
export const login = async (username, password) => {
  const response = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  if (response.token) {
    setAuthToken(response.token);
  }

  return response;
};

export const logout = () => {
  setAuthToken(null);
};
