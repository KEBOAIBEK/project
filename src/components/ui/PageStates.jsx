import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Spinner from './Spinner';

/**
 * Full-page loading state with centered spinner.
 * Replaces the identical loading UI duplicated in AllReports, ReportDetail, SearchResults.
 */
export const PageLoading = ({ message }) => {
  const { t } = useApp();
  return (
    <main className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Spinner size="lg" className="mx-auto mb-4 text-blue-500" />
            <p className="text-theme-secondary">{message || t('searching')}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

/**
 * Full-page error state with retry button.
 * Replaces the identical error UI duplicated in AllReports, ReportDetail.
 */
export const PageError = ({ title, message, onRetry, retryLabel = 'Qayta urinish' }) => {
  const { theme } = useApp();
  return (
    <main className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center py-20">
          <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
            theme === 'dark' ? 'bg-red-500/10' : 'bg-red-50'
          }`}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-theme-primary mb-2">{title || 'Xatolik yuz berdi'}</h3>
          <p className="text-theme-secondary mb-6">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
            >
              {retryLabel}
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

/**
 * Reusable "back to home" navigation link.
 * Replaces the identical back link duplicated in AllReports, ReportDetail, SearchResults.
 */
export const BackLink = ({ to = '/', label }) => {
  const { t } = useApp();
  return (
    <Link to={to} className="inline-flex items-center gap-2 text-sm text-theme-secondary hover:text-theme-primary mb-6 transition-colors">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      {label || t('backHome')}
    </Link>
  );
};

/**
 * Empty state placeholder.
 * Replaces the identical empty state UI in AllReports and SearchResults.
 */
export const EmptyState = ({ icon = 'search', title, description }) => {
  const { theme } = useApp();

  const icons = {
    search: (
      <svg width="48" height="48" className="mx-auto mb-4 text-theme-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    document: (
      <svg width="48" height="48" className="mx-auto mb-4 text-theme-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  };

  return (
    <div className={`text-center py-16 rounded-xl ${
      theme === 'dark' ? 'bg-[#151d2e] border border-white/6' : 'bg-white border border-gray-200'
    }`}>
      {icons[icon] || icons.search}
      <h3 className="text-lg font-semibold text-theme-primary mb-2">{title}</h3>
      <p className="text-theme-secondary">{description}</p>
    </div>
  );
};

/**
 * Status badge component.
 * Replaces the duplicated getStatusBadge/getStatusStyles functions.
 */
export const StatusBadge = ({ status, category }) => {
  const STYLES = {
    fraud: 'bg-red-500/10 text-red-400 border-red-500/20',
    suspicious: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    verified: 'bg-green-500/10 text-green-400 border-green-500/20',
    pending: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  };

  return (
    <span className={`px-2 py-0.5 text-xs font-semibold uppercase tracking-wide rounded border ${
      STYLES[status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'
    }`}>
      {category || status}
    </span>
  );
};
