import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { getReportById, transformReport } from '../../services/reportsService';
import TypeIcon from '../../components/icons/TypeIcon';
import { PageLoading, BackLink } from '../../components/ui/PageStates';
import { getTrustColor, getTrustBg } from '../../utils/trustScore';

const ReportDetail = () => {
  const { id } = useParams();
  const { t, theme } = useApp();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isDark = theme === 'dark';

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getReportById(id);
      const data = response.data || response;
      setReport(transformReport(data));
    } catch (err) {
      console.error('Error fetching report:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cardClass = isDark
    ? 'bg-[#151d2e] border border-white/6'
    : 'bg-white border border-gray-200 shadow-sm';

  if (loading) return <PageLoading message="Yuklanmoqda..." />;

  // Error or Not Found
  if (error || !report) {
    return (
      <main className="min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
            isDark ? 'bg-red-500/10' : 'bg-red-50'
          }`}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-theme-primary mb-3">{t('notFound')}</h1>
          <p className="text-theme-secondary mb-6">{error || t('notFoundDesc')}</p>
          <Link to="/" className="text-blue-400 hover:text-blue-300">← {t('backToHome')}</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-6">
        <BackLink />

        {/* Header Card */}
        <div className={`${cardClass} rounded-xl p-6 mb-6`}>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-4">
              <TypeIcon type={report.type} size="lg" />
              <div>
                <h1 className="text-xl font-bold text-theme-primary">{report.identifier}</h1>
                <span className="text-sm text-theme-muted">ID: #{report.id}</span>
              </div>
            </div>
            <span className={`px-4 py-1.5 text-sm font-semibold uppercase rounded-lg border ${
              report.status === 'fraud'
                ? 'bg-red-500/10 text-red-400 border-red-500/20'
                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
            }`}>
              {report.status === 'fraud' ? t('fraud').toUpperCase() : t('suspicious').toUpperCase()}
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <span className="text-sm text-theme-muted block mb-1">{t('trustScore')}</span>
              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-bold ${getTrustColor(report.trustScore)}`}>
                  {report.trustScore}%
                </span>
                <span className="text-sm text-theme-muted">{t('safetyRating')}</span>
              </div>
              <div className={`w-full h-1.5 rounded-full mt-2 overflow-hidden ${isDark ? 'bg-white/6' : 'bg-gray-200'}`}>
                <div className={`h-full rounded-full ${getTrustBg(report.trustScore)}`} style={{ width: `${report.trustScore}%` }} />
              </div>
            </div>
            <div>
              <span className="text-sm text-theme-muted block mb-1">{t('totalReports')}</span>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-theme-primary">{report.reportCount}</span>
                {report.weeklyReports > 0 && (
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded">
                    +{report.weeklyReports} {t('thisWeek')}
                  </span>
                )}
              </div>
            </div>
            <div>
              <span className="text-sm text-theme-muted block mb-1">{t('lastReported')}</span>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-theme-muted">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                </svg>
                <span className="text-xl font-bold text-theme-primary">{report.timeAgo}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-theme-primary mb-4">{t('reportDetails')}</h2>
            <div className={`${cardClass} rounded-xl p-6`}>
              <p className="text-theme-secondary leading-relaxed">
                {report.fullDescription || report.description}
              </p>
            </div>

            {report.evidenceImages?.length > 0 && (
              <>
                <h3 className="text-base font-semibold text-theme-primary mt-8 mb-4">Evidence Screenshots</h3>
                <div className="grid grid-cols-2 gap-4">
                  {report.evidenceImages.map((img, index) => (
                    <div key={index} className={`aspect-video border border-dashed rounded-lg flex items-center justify-center ${
                      isDark ? 'bg-[#151d2e] border-white/10 text-slate-500' : 'bg-gray-50 border-gray-300 text-gray-400'
                    }`}>
                      <div className="text-center">
                        <svg width="32" height="32" className="mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                        <span className="text-sm">Evidence {index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-theme-primary mb-4">{t('information')}</h2>
            <div className={`${cardClass} rounded-xl p-5 space-y-4`}>
              <InfoField label={t('category')}>
                <div className="flex items-center gap-2">
                  <TypeIcon type={report.type} size="sm" variant="muted" />
                  <span className="text-theme-primary">{report.type}</span>
                </div>
              </InfoField>
              <InfoField label={t('reporter')}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-white text-xs font-semibold">A</div>
                  <span className="text-theme-primary">{report.reporter || t('anonymousUser')}</span>
                </div>
              </InfoField>
              <InfoField label={t('date')}>
                <span className="text-theme-primary">{report.reportDate || report.information?.firstReported}</span>
              </InfoField>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const InfoField = ({ label, children }) => (
  <div>
    <span className="text-xs text-theme-muted block mb-1">{label}</span>
    {children}
  </div>
);

export default ReportDetail;
