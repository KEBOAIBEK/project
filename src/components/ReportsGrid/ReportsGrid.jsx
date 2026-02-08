import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { reports } from '../../data/mockData';
import ReportCard from './ReportCard';

const ReportsGrid = () => {
  const { t } = useApp();

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-theme-primary mb-2">{t('recentReports')}</h2>
          <p className="text-theme-secondary">{t('reportsSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.slice(0, 6).map((report, index) => (
            <ReportCard key={report.id} report={report} index={index} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link 
            to="/reports" 
            className="inline-flex items-center gap-2 px-6 py-3 border border-theme text-theme-secondary hover:text-theme-primary hover:border-blue-500/50 hover:bg-blue-500/5 rounded-lg transition-all text-sm font-medium"
          >
            {t('viewAll')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReportsGrid;
