/**
 * Centralized trust score and report status utilities.
 *
 * Eliminates duplicate getTrustColor/getTrustBg/getStatusText functions
 * found in Hero.jsx, ReportDetail.jsx, ReportCard.jsx, and AllReports.jsx.
 */

// ── Trust Score Thresholds ──────────────────────
// Named constants instead of magic numbers

const TRUST_THRESHOLD_CRITICAL = 10;
const TRUST_THRESHOLD_LOW = 30;
const TRUST_THRESHOLD_MEDIUM = 50;

/**
 * Returns Tailwind text color class based on trust score.
 * @param {number} score - Trust score (0-100)
 * @returns {string} Tailwind text color class
 */
export const getTrustColor = (score) => {
  if (score <= TRUST_THRESHOLD_CRITICAL) return 'text-red-500';
  if (score <= TRUST_THRESHOLD_LOW) return 'text-orange-500';
  if (score <= TRUST_THRESHOLD_MEDIUM) return 'text-yellow-500';
  return 'text-green-500';
};

/**
 * Returns Tailwind background color class based on trust score.
 * @param {number} score - Trust score (0-100)
 * @returns {string} Tailwind background class
 */
export const getTrustBg = (score) => {
  if (score <= TRUST_THRESHOLD_CRITICAL) return 'bg-red-500';
  if (score <= TRUST_THRESHOLD_LOW) return 'bg-orange-500';
  if (score <= TRUST_THRESHOLD_MEDIUM) return 'bg-yellow-500';
  return 'bg-green-500';
};

/**
 * Returns full status display object based on trust score.
 * @param {number} score - Trust score (0-100)
 * @returns {{ text: string, color: string, bg: string, border: string }}
 */
export const getStatusText = (score) => {
  if (score <= TRUST_THRESHOLD_CRITICAL) {
    return { text: 'XAVFLI', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30' };
  }
  if (score <= TRUST_THRESHOLD_LOW) {
    return { text: 'SHUBHALI', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
  }
  if (score <= TRUST_THRESHOLD_MEDIUM) {
    return { text: 'EHTIYOTKOR', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
  }
  return { text: 'XAVFSIZ', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/30' };
};

/**
 * Returns status badge class string based on status key.
 * @param {'fraud' | 'suspicious' | 'verified' | 'pending'} status
 * @returns {string} Tailwind classes for badge styling
 */
export const getStatusBadgeClass = (status) => {
  const STYLES = {
    fraud: 'bg-red-500/10 text-red-400 border-red-500/20',
    suspicious: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    verified: 'bg-green-500/10 text-green-400 border-green-500/20',
    pending: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };
  return STYLES[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';
};
