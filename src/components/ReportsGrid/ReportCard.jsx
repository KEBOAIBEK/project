import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import TypeIcon from '../icons/TypeIcon';
import { StatusBadge } from '../ui/PageStates';
import { getTrustColor } from '../../utils/trustScore';

const ReportCard = ({ report }) => {
  const { t, theme } = useApp();

  return (
    <Link
      to={`/report/${report.id}`}
      className={`block rounded-xl p-5 transition-all hover:-translate-y-0.5 group ${
        theme === 'dark'
          ? 'bg-[#151d2e] border border-white/6 hover:bg-[#1a2436] hover:border-white/10'
          : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <StatusBadge status={report.status} category={report.category} />
        <span className="text-xs text-theme-muted">{report.timeAgo}</span>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <TypeIcon type={report.type} size="md" />
        <div className="min-w-0">
          <h3 className="font-semibold text-theme-primary truncate">{report.identifier}</h3>
          <span className="text-xs text-theme-muted">{report.type}</span>
        </div>
      </div>

      <p className="text-sm text-theme-secondary line-clamp-2 mb-4">{report.description}</p>

      <div className={`flex items-center justify-between pt-4 border-t ${
        theme === 'dark' ? 'border-white/6' : 'border-gray-100'
      }`}>
        <div className="flex gap-6">
          <div>
            <span className="text-lg font-bold text-theme-primary">{report.reportCount}</span>
            <span className="text-xs text-theme-muted ml-1">{t('reports')}</span>
          </div>
          <div>
            <span className={`text-lg font-bold ${getTrustColor(report.trustScore)}`}>
              {report.trustScore}%
            </span>
            <span className="text-xs text-theme-muted ml-1">{t('trust')}</span>
          </div>
        </div>

        <span className="text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
          {t('viewDetails')}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
};

export default ReportCard;
