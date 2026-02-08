import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { getReportById, transformReport } from '../../services/api';

const ReportDetail = () => {
  const { id } = useParams();
  const { t, theme } = useApp();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const getTrustColor = (score) => {
    if (score <= 10) return 'text-red-400';
    if (score <= 30) return 'text-orange-400';
    return 'text-yellow-400';
  };

  const getTrustBg = (score) => {
    if (score <= 10) return 'bg-red-500';
    if (score <= 30) return 'bg-orange-500';
    return 'bg-yellow-500';
  };

  const cardClass = theme === 'dark'
    ? 'bg-[#151d2e] border border-white/[0.06]'
    : 'bg-white border border-gray-200 shadow-sm';

  // Loading State
  if (loading) {
    return (
      <main className="min-h-screen py-8">
        <div className="max-w-5xl mx-auto px-6">
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

  // Error or Not Found State
  if (error || !report) {
    return (
      <main className="min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${theme === 'dark' ? 'bg-red-500/10' : 'bg-red-50'}`}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
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
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-theme-secondary hover:text-theme-primary mb-6 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          {t('backHome')}
        </Link>

        {/* Header Card */}
        <div className={`${cardClass} rounded-xl p-6 mb-6`}>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${
                report.type === 'Telegram' ? 'bg-gradient-to-br from-sky-500 to-sky-600' :
                report.type === 'Phone' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                'bg-gradient-to-br from-purple-500 to-purple-600'
              }`}>
                {report.type === 'Telegram' && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                )}
                {report.type === 'Phone' && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                )}
                {report.type === 'Website' && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                )}
              </div>
              <div>
                <h1 className="text-xl font-bold text-theme-primary">{report.identifier}</h1>
                <span className="text-sm text-theme-muted">ID: #{report.id}</span>
              </div>
            </div>
            <span className={`px-4 py-1.5 text-sm font-semibold uppercase rounded-lg border ${
              report.status === 'fraud' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
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
              <div className={`w-full h-1.5 rounded-full mt-2 overflow-hidden ${theme === 'dark' ? 'bg-white/[0.06]' : 'bg-gray-200'}`}>
                <div className={`h-full rounded-full ${getTrustBg(report.trustScore)}`} style={{ width: `${report.trustScore}%` }}></div>
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
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
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

            {report.evidenceImages && report.evidenceImages.length > 0 && (
              <>
                <h3 className="text-base font-semibold text-theme-primary mt-8 mb-4">Evidence Screenshots</h3>
                <div className="grid grid-cols-2 gap-4">
                  {report.evidenceImages.map((img, index) => (
                    <div key={index} className={`aspect-video border border-dashed rounded-lg flex items-center justify-center ${
                      theme === 'dark' ? 'bg-[#151d2e] border-white/[0.1] text-slate-500' : 'bg-gray-50 border-gray-300 text-gray-400'
                    }`}>
                      <div className="text-center">
                        <svg width="32" height="32" className="mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <path d="M21 15l-5-5L5 21"/>
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
              <div>
                <span className="text-xs text-theme-muted block mb-1">{t('category')}</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-blue-500/10 flex items-center justify-center text-blue-400">
                    {report.type === 'Telegram' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-theme-primary">{report.type}</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-theme-muted block mb-1">{t('reporter')}</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-white text-xs font-semibold">A</div>
                  <span className="text-theme-primary">{report.reporter || t('anonymousUser')}</span>
                </div>
              </div>
              <div>
                <span className="text-xs text-theme-muted block mb-1">{t('date')}</span>
                <span className="text-theme-primary">{report.reportDate || report.information?.firstReported}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReportDetail;
