import { Link } from 'react-router-dom';
import { reports } from '../../data/mockData';
import ReportCard from './ReportCard';
import './ReportsGrid.css';

const ReportsGrid = () => {
  return (
    <section className="reports-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">So'nggi xabarlar</h2>
          <p className="section-subtitle">
            Jamiyat tomonidan xabar qilingan firibgarliklar
          </p>
        </div>

        <div className="reports-grid">
          {reports.map((report, index) => (
            <ReportCard key={report.id} report={report} index={index} />
          ))}
        </div>

        <div className="reports-cta">
          <Link to="/reports" className="view-all-btn">
            Barcha xabarlarni ko'rish
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
