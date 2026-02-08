import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const ReportCard = ({ report }) => {
  const { t, theme } = useApp();

  const getStatusStyles = (status) => {
    switch (status) {
      case 'fraud':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'suspicious':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Phone':
        return (
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
        );
      case 'Telegram':
        return (
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </div>
        );
      case 'Website':
        return (
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Link 
      to={`/report/${report.id}`}
      className={`block rounded-xl p-5 transition-all hover:-translate-y-0.5 group ${
        theme === 'dark'
          ? 'bg-[#151d2e] border border-white/[0.06] hover:bg-[#1a2436] hover:border-white/[0.1]'
          : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className={`px-2 py-0.5 text-xs font-semibold uppercase tracking-wide rounded border ${getStatusStyles(report.status)}`}>
          {report.category}
        </span>
        <span className="text-xs text-theme-muted">{report.timeAgo}</span>
      </div>

      <div className="flex items-center gap-3 mb-3">
        {getTypeIcon(report.type)}
        <div className="min-w-0">
          <h3 className="font-semibold text-theme-primary truncate">{report.identifier}</h3>
          <span className="text-xs text-theme-muted">{report.type}</span>
        </div>
      </div>

      <p className="text-sm text-theme-secondary line-clamp-2 mb-4">{report.description}</p>

      <div className={`flex items-center justify-between pt-4 border-t ${
        theme === 'dark' ? 'border-white/[0.06]' : 'border-gray-100'
      }`}>
        <div className="flex gap-6">
          <div>
            <span className="text-lg font-bold text-theme-primary">{report.reportCount}</span>
            <span className="text-xs text-theme-muted ml-1">{t('reports')}</span>
          </div>
          <div>
            <span className={`text-lg font-bold ${report.trustScore < 20 ? 'text-red-400' : 'text-yellow-400'}`}>
              {report.trustScore}%
            </span>
            <span className="text-xs text-theme-muted ml-1">{t('trust')}</span>
          </div>
        </div>

        <span className="text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
          {t('viewDetails')}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </span>
      </div>
    </Link>
  );
};

export default ReportCard;
