import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import TypeIcon from '../icons/TypeIcon';
import { StatusBadge } from '../ui/PageStates';
import { getTrustColor } from '../../utils/trustScore';

/**
 * Reusable report list item for list/card views.
 * Used by AllReports (list view) and SearchResults.
 */
const ReportListItem = ({ report }) => {
  const { t, theme } = useApp();

  return (
    <Link
      to={`/report/${report.id}`}
      className={`block rounded-xl p-5 transition-all group ${
        theme === 'dark'
          ? 'bg-[#151d2e] border border-white/6 hover:bg-[#1a2436] hover:border-white/10'
          : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <TypeIcon type={report.type} size="md" variant="muted" />
          <div>
            <h3 className="font-semibold text-theme-primary">{report.identifier}</h3>
            <span className="text-xs text-theme-muted">{report.type} • {report.timeAgo}</span>
          </div>
        </div>
        <StatusBadge status={report.status} category={report.category} />
      </div>

      <p className="text-sm text-theme-secondary mb-4">{report.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex gap-6">
          <div className="text-sm">
            <span className="text-theme-primary font-semibold">{report.reportCount}</span>
            <span className="text-theme-muted ml-1">{t('reports').toLowerCase()}</span>
          </div>
          <div className="text-sm">
            <span className={`font-semibold ${getTrustColor(report.trustScore)}`}>
              {report.trustScore}%
            </span>
            <span className="text-theme-muted ml-1">{t('trust').toLowerCase()}</span>
          </div>
        </div>
        <span className="text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          {t('viewDetails')}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
};

export default ReportListItem;
