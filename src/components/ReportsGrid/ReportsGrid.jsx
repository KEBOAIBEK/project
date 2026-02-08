import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useReports } from '../../context/ReportsContext';
import ReportCard from './ReportCard';

const ReportsGrid = () => {
  const { t } = useApp();
  const { recentReports, loading } = useReports(); // Use shared context

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-theme-primary mb-2">{t('recentReports')}</h2>
            <p className="text-theme-secondary">{t('reportsSubtitle')}</p>
          </div>
          <div className="flex justify-center py-12">
            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-theme-primary mb-2">{t('recentReports')}</h2>
          <p className="text-theme-secondary">{t('reportsSubtitle')}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recentReports.map((report, index) => (
            <ReportCard key={report.id} report={report} index={index} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link 
            to="/reports" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
          >
            {t('viewAll')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReportsGrid;
