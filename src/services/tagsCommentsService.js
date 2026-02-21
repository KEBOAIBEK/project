/**
 * Tags & Comments API service.
 */
import { apiRequest } from './apiClient';

// ── Tags ────────────────────────────────────────

/**
 * Get all tags with pagination.
 * POST /tag/getAll
 */
export const getTags = async (page = 0, size = 50) => {
  return apiRequest('/tag/getAll', {
    method: 'POST',
    body: JSON.stringify({ page, size }),
  });
};

/**
 * Get tag by ID.
 * GET /tag/getById/{id}
 */
export const getTagById = async (id) => {
  return apiRequest(`/tag/getById/${id}`, {
    method: 'GET',
  });
};

// ── Comments ────────────────────────────────────

/**
 * Get all comments with pagination.
 * POST /comment/getAll
 */
export const getComments = async (page = 0, size = 20) => {
  return apiRequest('/comment/getAll', {
    method: 'POST',
    body: JSON.stringify({ page, size }),
  });
};

/**
 * Create a comment.
 * POST /comment/create
 * @param {Object} commentData - { comment, reportId }
 */
export const createComment = async (commentData) => {
  return apiRequest('/comment/create', {
    method: 'POST',
    body: JSON.stringify(commentData),
  });
};
