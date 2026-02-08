import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { getReports, transformReport } from '../../services/api';

const AllReports = () => {
  const [viewMode, setViewMode] = useState('table');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { t, theme } = useApp();

  useEffect(() => {
    fetchReports();
  }, [page]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getReports(page, 20);
      
      // Handle different response formats
      const data = response.content || response.data || response || [];
      const transformedReports = Array.isArray(data) ? data.map(transformReport) : [];
      
      setReports(transformedReports);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports.filter(report => {
    if (filterType !== 'all' && report.type !== filterType) return false;
    if (filterStatus !== 'all' && report.status !== filterStatus) return false;
    return true;
  });

  const getStatusBadge = (status) => {
    const styles = {
      fraud: 'bg-red-500/10 text-red-400 border-red-500/20',
      suspicious: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    };
    return styles[status] || 'bg-slate-500/10 text-slate-400';
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Phone':
        return (
          <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
        );
      case 'Telegram':
        return (
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </div>
        );
      case 'Website':
        return (
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const selectClass = theme === 'dark'
    ? 'px-4 py-2 bg-[#151d2e] border border-white/[0.08] rounded-lg text-white text-sm outline-none focus:border-blue-500/50'
    : 'px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm outline-none focus:border-blue-500';

  // Loading State
  if (loading) {
    return (
      <main className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <svg className="animate-spin h-10 w-10 mx-auto mb-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-theme-secondary">Yuklanmoqda...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error State
  if (error) {
    return (
      <main className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center py-20">
            <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${theme === 'dark' ? 'bg-red-500/10' : 'bg-red-50'}`}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-theme-primary mb-2">Xatolik yuz berdi</h3>
            <p className="text-theme-secondary mb-6">{error}</p>
            <button 
              onClick={fetchReports}
              className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
            >
              Qayta urinish
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-theme-secondary hover:text-theme-primary mb-6 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            {t('backHome')}
          </Link>
          <h1 className="text-3xl font-bold text-theme-primary mb-2">{t('allReports')}</h1>
          <p className="text-theme-secondary">{t('allReportsSubtitle')}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className={selectClass}>
              <option value="all">{t('allTypes')}</option>
              <option value="Phone">Telefon</option>
              <option value="Telegram">Telegram</option>
              <option value="Website">Website</option>
            </select>

            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={selectClass}>
              <option value="all">{t('allStatuses')}</option>
              <option value="fraud">{t('fraud')}</option>
              <option value="suspicious">{t('suspicious')}</option>
            </select>
          </div>

          <div className={`flex items-center gap-1 rounded-lg p-1 ${
            theme === 'dark' ? 'bg-[#151d2e] border border-white/[0.08]' : 'bg-gray-100 border border-gray-200'
          }`}>
            <button 
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'table' ? 'bg-blue-500 text-white' : 'text-theme-secondary hover:text-theme-primary'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="3" y1="15" x2="21" y2="15"/>
                <line x1="9" y1="3" x2="9" y2="21"/>
              </svg>
              {t('table')}
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-theme-secondary hover:text-theme-primary'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-1.5">
                <line x1="8" y1="6" x2="21" y2="6"/>
                <line x1="8" y1="12" x2="21" y2="12"/>
                <line x1="8" y1="18" x2="21" y2="18"/>
                <line x1="3" y1="6" x2="3.01" y2="6"/>
                <line x1="3" y1="12" x2="3.01" y2="12"/>
                <line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
              {t('list')}
            </button>
          </div>
        </div>

        <p className="text-sm text-theme-muted mb-4">{filteredReports.length} {t('resultsFound')}</p>

        {/* Table View */}
        {viewMode === 'table' && (
          <div className={`rounded-xl overflow-hidden ${
            theme === 'dark' ? 'bg-[#151d2e] border border-white/[0.06]' : 'bg-white border border-gray-200 shadow-sm'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${theme === 'dark' ? 'border-white/[0.06]' : 'border-gray-100'}`}>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-theme-muted uppercase tracking-wider">{t('identifier')}</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-theme-muted uppercase tracking-wider">{t('type')}</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-theme-muted uppercase tracking-wider">{t('status')}</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-theme-muted uppercase tracking-wider">{t('reports')}</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-theme-muted uppercase tracking-wider">{t('trust')}</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-theme-muted uppercase tracking-wider">{t('time')}</th>
                    <th className="text-right px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report) => (
                    <tr key={report.id} className={`border-b transition-colors ${
                      theme === 'dark' ? 'border-white/[0.04] hover:bg-white/[0.02]' : 'border-gray-50 hover:bg-gray-50'
                    }`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(report.type)}
                          <span className="font-medium text-theme-primary">{report.identifier}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-theme-secondary">{report.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2 py-0.5 text-xs font-semibold uppercase rounded border ${getStatusBadge(report.status)}`}>
                          {report.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-theme-primary font-medium">{report.reportCount}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-medium ${report.trustScore < 20 ? 'text-red-400' : 'text-yellow-400'}`}>
                          {report.trustScore}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-theme-muted">{report.timeAgo}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link to={`/report/${report.id}`} className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                          {t('viewDetails')} →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-3">
            {filteredReports.map((report) => (
              <Link 
                key={report.id}
                to={`/report/${report.id}`}
                className={`block rounded-xl p-5 transition-all group ${
                  theme === 'dark'
                    ? 'bg-[#151d2e] border border-white/[0.06] hover:bg-[#1a2436] hover:border-white/[0.1]'
                    : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
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
                    {t('learnMore')}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                page === 0 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-blue-500/10'
              } ${theme === 'dark' ? 'bg-white/[0.06] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              ← Oldingi
            </button>
            <span className="px-4 py-2 text-theme-secondary">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                page >= totalPages - 1 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-blue-500/10'
              } ${theme === 'dark' ? 'bg-white/[0.06] text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              Keyingi →
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredReports.length === 0 && !loading && (
          <div className={`text-center py-16 rounded-xl ${
            theme === 'dark' ? 'bg-[#151d2e] border border-white/[0.06]' : 'bg-white border border-gray-200'
          }`}>
            <svg width="48" height="48" className="mx-auto mb-4 text-theme-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <h3 className="text-lg font-semibold text-theme-primary mb-2">Hisobotlar topilmadi</h3>
            <p className="text-theme-secondary">Filtrlarni o'zgartiring yoki keyinroq qayta urinib ko'ring</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default AllReports;
