/**
 * Barrel re-export file for backward compatibility.
 *
 * All API logic has been split into focused modules:
 * - apiClient.js    → HTTP transport & token management
 * - authService.js  → Login / logout
 * - reportsService.js → Reports CRUD, search, transform
 * - tagsCommentsService.js → Tags & comments
 *
 * Static data moved to:
 * - data/staticContent.js → resources, infoPages
 *
 * Consumers should gradually migrate to direct imports.
 */

// API client
export { setAuthToken, getAuthToken, isAuthenticated } from './apiClient';

// Auth
export { login, logout } from './authService';

// Reports
export {
  getReports,
  getReportById,
  createReport,
  updateReport,
  searchReports,
  transformReport,
} from './reportsService';

// Tags & Comments
export { getTags, getTagById, getComments, createComment } from './tagsCommentsService';

// Static data
export { resources, infoPages } from '../data/staticContent';
