/**
 * Reports API service.
 * Single Responsibility: Report CRUD, search, and transformation.
 */
import { apiRequest } from './apiClient';

// ── Report Type & Status Maps ───────────────────

const REPORT_TYPE_MAP = {
  PHONE: 'Phone',
  EMAIL: 'Email',
  TELEGRAM: 'Telegram',
};

const STATUS_MAP = {
  SUCCESS: 'verified',
  LIE: 'fraud',
  INSPECTION: 'pending',
  UNKNOWN: 'unknown',
  SUSPICIOUS: 'suspicious',
};

const TRUST_SCORE_MAP = {
  SUCCESS: 90,
  LIE: 5,
  INSPECTION: 50,
  UNKNOWN: 40,
  SUSPICIOUS: 20,
};

// ── API Calls ───────────────────────────────────

/**
 * Get all reports with pagination.
 * POST /reports/getAll
 */
export const getReports = async (page = 0, size = 10) => {
  return apiRequest('/reports/getAll', {
    method: 'POST',
    body: JSON.stringify({ page, size }),
  });
};

/**
 * Get a single report by ID.
 * GET /reports/getById/{id}
 */
export const getReportById = async (id) => {
  return apiRequest(`/reports/getById/${id}`, {
    method: 'GET',
  });
};

/**
 * Create a new fraud report.
 * POST /reports/create
 */
export const createReport = async (reportData) => {
  return apiRequest('/reports/create', {
    method: 'POST',
    body: JSON.stringify(reportData),
  });
};

/**
 * Update an existing report.
 * POST /reports/update/{id}
 */
export const updateReport = async (id, reportData) => {
  return apiRequest(`/reports/update/${id}`, {
    method: 'POST',
    body: JSON.stringify(reportData),
  });
};

// ── Search (client-side filtering) ─────────────

/**
 * Search reports by query (filters from getAll results).
 * @param {string} query - Search query
 * @param {string} type - Type filter (PHONE, EMAIL, TELEGRAM)
 */
export const searchReports = async (query, type = null) => {
  try {
    const response = await getReports(0, 100);
    const data = response.result || response;
    const reports = data.items || [];

    const queryLower = query.toLowerCase();
    let results = reports.filter(
      (report) =>
        report.title?.toLowerCase().includes(queryLower) ||
        report.description?.toLowerCase().includes(queryLower)
    );

    if (type && type !== 'all') {
      results = results.filter((r) => r.reportType === type.toUpperCase());
    }

    return results;
  } catch (error) {
    console.error('Search failed:', error);
    return [];
  }
};

// ── Transform ──────────────────────────────────

/**
 * Transform API response to match frontend expected format.
 * @param {Object} report - Raw API report object
 * @returns {Object} Frontend-friendly report object
 */
export const transformReport = (report) => ({
  id: report.id,
  type: REPORT_TYPE_MAP[report.reportType] || report.reportType || 'Phone',
  identifier: report.title || 'Unknown',
  category: report.reportStatus || 'UNKNOWN',
  status: STATUS_MAP[report.reportStatus] || 'suspicious',
  description: report.description || '',
  reportCount: report.likes || 1,
  trustScore: TRUST_SCORE_MAP[report.reportStatus] || 30,
  timeAgo: formatTimeAgo(report.createdAt),
  fullDescription: report.description || '',
  reporter: report.createdBy?.userName || report.createdBy?.firstName || 'Anonymous',
  reportDate: report.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
  evidenceImages: [],
  tagIds: report.tagIds || [],
  information: {
    category: REPORT_TYPE_MAP[report.reportType] || 'Unknown',
    platform: REPORT_TYPE_MAP[report.reportType] || 'Unknown',
    firstReported: report.createdAt?.split('T')[0] || 'N/A',
    totalLoss: 'N/A',
  },
  weeklyReports: 0,
  createdAt: report.createdAt,
  updatedAt: report.updatedAt,
});

/**
 * Format date to relative time string.
 * @param {string} dateString - ISO date string
 * @returns {string} Relative time (e.g. "5 daqiqa oldin")
 */
const formatTimeAgo = (dateString) => {
  if (!dateString) return 'Recently';

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins} daqiqa oldin`;
  if (diffHours < 24) return `${diffHours} soat oldin`;
  if (diffDays < 7) return `${diffDays} kun oldin`;
  return date.toLocaleDateString('uz-UZ');
};
