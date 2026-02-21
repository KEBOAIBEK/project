import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useReports } from '../../context/ReportsContext';
import ReportCard from './ReportCard';
import Spinner from '../ui/Spinner';

const ReportsGrid = () => {
  const { t } = useApp();
  const { recentReports, loading } = useReports();

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-theme-primary mb-2">{t('recentReports')}</h2>
          <p className="text-theme-secondary">{t('reportsSubtitle')}</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="md" className="text-blue-500" />
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recentReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/reports"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
              >
                {t('viewAll')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ReportsGrid;
