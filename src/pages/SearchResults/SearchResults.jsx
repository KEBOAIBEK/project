import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { reports } from '../../data/mockData';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { t, theme } = useApp();

  // Search logic - match reports by identifier or description
  const searchResults = reports.filter(report => {
    const searchLower = query.toLowerCase();
    return (
      report.identifier.toLowerCase().includes(searchLower) ||
      report.description.toLowerCase().includes(searchLower) ||
      report.type.toLowerCase().includes(searchLower)
    );
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Phone':
        return (
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
        );
      case 'Telegram':
        return (
          <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </div>
        );
      case 'Website':
        return (
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
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

  const getStatusBadge = (status) => {
    const styles = {
      fraud: 'bg-red-500/10 text-red-400 border-red-500/20',
      suspicious: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    };
    return styles[status] || 'bg-slate-500/10 text-slate-400';
  };

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-theme-secondary hover:text-theme-primary mb-6 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          {t('backHome')}
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-theme-primary mb-2">{t('searchResults')}</h1>
          <p className="text-theme-secondary">
            "{query}" - <span className="text-theme-muted">{searchResults.length} {t('resultsFound')}</span>
          </p>
        </div>

        {searchResults.length === 0 ? (
          <div className={`text-center py-16 rounded-xl ${
            theme === 'dark' ? 'bg-[#151d2e] border border-white/[0.06]' : 'bg-white border border-gray-200'
          }`}>
            <svg width="48" height="48" className="mx-auto mb-4 text-theme-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <h3 className="text-lg font-semibold text-theme-primary mb-2">{t('noResults')}</h3>
            <p className="text-theme-secondary">"{query}" bo'yicha hech narsa topilmadi</p>
          </div>
        ) : (
          <div className="space-y-3">
            {searchResults.map((report) => (
              <Link 
                key={report.id}
                to={`/report/${report.id}`}
                className={`block rounded-xl p-5 transition-all group ${
                  theme === 'dark' 
                    ? 'bg-[#151d2e] border border-white/[0.06] hover:bg-[#1a2436] hover:border-white/[0.1]' 
                    : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(report.type)}
                    <div>
                      <h3 className="font-semibold text-theme-primary">{report.identifier}</h3>
                      <span className="text-xs text-theme-muted">{report.type} • {report.timeAgo}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 text-xs font-semibold uppercase rounded border ${getStatusBadge(report.status)}`}>
                    {report.category}
                  </span>
                </div>
                
                <p className="text-sm text-theme-secondary mb-4">{report.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-6">
                    <div className="text-sm">
                      <span className="text-theme-primary font-semibold">{report.reportCount}</span>
                      <span className="text-theme-muted ml-1">{t('reports').toLowerCase()}</span>
                    </div>
                    <div className="text-sm">
                      <span className={`font-semibold ${report.trustScore < 20 ? 'text-red-400' : 'text-yellow-400'}`}>
                        {report.trustScore}%
                      </span>
                      <span className="text-theme-muted ml-1">{t('trust').toLowerCase()}</span>
                    </div>
                  </div>
                  <span className="text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    {t('viewDetails')}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default SearchResults;
