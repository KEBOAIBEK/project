import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { getReports, transformReport } from '../../services/reportsService';
import TypeIcon from '../../components/icons/TypeIcon';
import { StatusBadge } from '../../components/ui/PageStates';
import { PageLoading, PageError, BackLink, EmptyState } from '../../components/ui/PageStates';
import { getTrustColor } from '../../utils/trustScore';
import ReportListItem from '../../components/ReportsGrid/ReportListItem';

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

      const result = response.result || response;
      const items = result.items || result.content || result.data || [];
      const transformedReports = Array.isArray(items) ? items.map(transformReport) : [];

      setReports(transformedReports);
      setTotalPages(result.pageTotal || result.totalPages || 1);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports.filter((report) => {
    if (filterType !== 'all' && report.type !== filterType) return false;
    if (filterStatus !== 'all' && report.status !== filterStatus) return false;
    return true;
  });

  const isDark = theme === 'dark';

  const selectClass = isDark
    ? 'px-4 py-2 bg-[#151d2e] border border-white/[0.08] rounded-lg text-white text-sm outline-none focus:border-blue-500/50'
    : 'px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm outline-none focus:border-blue-500';

  if (loading) return <PageLoading message="Yuklanmoqda..." />;
  if (error) return <PageError message={error} onRetry={fetchReports} />;

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <BackLink />
          <h1 className="text-3xl font-bold text-theme-primary mb-2">{t('allReports')}</h1>
          <p className="text-theme-secondary">{t('allReportsSubtitle')}</p>
        </div>

        {/* Filters & View Toggle */}
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

          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} isDark={isDark} t={t} />
        </div>

        <p className="text-sm text-theme-muted mb-4">{filteredReports.length} {t('resultsFound')}</p>

        {/* Table View */}
        {viewMode === 'table' && (
          <ReportsTable reports={filteredReports} isDark={isDark} t={t} />
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-3">
            {filteredReports.map((report) => (
              <ReportListItem key={report.id} report={report} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} setPage={setPage} isDark={isDark} />
        )}

        {/* Empty State */}
        {filteredReports.length === 0 && !loading && (
          <EmptyState
            icon="document"
            title="Hisobotlar topilmadi"
            description="Filtrlarni o'zgartiring yoki keyinroq qayta urinib ko'ring"
          />
        )}
      </div>
    </main>
  );
};

// ── Sub-components ──────────────────────────────

const ViewToggle = ({ viewMode, setViewMode, isDark, t }) => (
  <div className={`flex items-center gap-1 rounded-lg p-1 ${
    isDark ? 'bg-[#151d2e] border border-white/[0.08]' : 'bg-gray-100 border border-gray-200'
  }`}>
    <button
      onClick={() => setViewMode('table')}
      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
        viewMode === 'table' ? 'bg-blue-500 text-white' : 'text-theme-secondary hover:text-theme-primary'
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="9" y1="3" x2="9" y2="21" />
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
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
      {t('list')}
    </button>
  </div>
);

const ReportsTable = ({ reports, isDark, t }) => (
  <div className={`rounded-xl overflow-hidden ${
    isDark ? 'bg-[#151d2e] border border-white/6' : 'bg-white border border-gray-200 shadow-sm'
  }`}>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className={`border-b ${isDark ? 'border-white/6' : 'border-gray-100'}`}>
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
          {reports.map((report) => (
            <tr key={report.id} className={`border-b transition-colors ${
              isDark ? 'border-white/[0.04] hover:bg-white/[0.02]' : 'border-gray-50 hover:bg-gray-50'
            }`}>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <TypeIcon type={report.type} size="sm" variant="muted" />
                  <span className="font-medium text-theme-primary">{report.identifier}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-theme-secondary">{report.type}</span>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={report.status} category={report.category} />
              </td>
              <td className="px-6 py-4">
                <span className="text-theme-primary font-medium">{report.reportCount}</span>
              </td>
              <td className="px-6 py-4">
                <span className={`font-medium ${getTrustColor(report.trustScore)}`}>
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
);

const Pagination = ({ page, totalPages, setPage, isDark }) => (
  <div className="flex justify-center gap-2 mt-8">
    <button
      onClick={() => setPage((p) => Math.max(0, p - 1))}
      disabled={page === 0}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        page === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500/10'
      } ${isDark ? 'bg-white/[0.06] text-white' : 'bg-gray-100 text-gray-700'}`}
    >
      ← Oldingi
    </button>
    <span className="px-4 py-2 text-theme-secondary">
      {page + 1} / {totalPages}
    </span>
    <button
      onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
      disabled={page >= totalPages - 1}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        page >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500/10'
      } ${isDark ? 'bg-white/[0.06] text-white' : 'bg-gray-100 text-gray-700'}`}
    >
      Keyingi →
    </button>
  </div>
);

export default AllReports;
