import { Link } from 'react-router-dom';
import './ReportCard.css';

const ReportCard = ({ report, index }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'fraud':
        return 'status-fraud';
      case 'suspicious':
        return 'status-suspicious';
      default:
        return 'status-unknown';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Phone':
        return (
          <div className="type-icon type-icon-phone">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
        );
      case 'Telegram':
        return (
          <div className="type-icon type-icon-telegram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </div>
        );
      case 'Website':
        return (
          <div className="type-icon type-icon-website">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
    <article 
      className="report-card animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="report-card-header">
        <span className={`report-category ${getStatusColor(report.status)}`}>
          {report.category}
        </span>
        <span className="report-time">{report.timeAgo}</span>
      </div>

      <div className="report-card-body">
        <div className="report-identity">
          {getTypeIcon(report.type)}
          <div className="report-info">
            <h3 className="report-identifier">{report.identifier}</h3>
            <span className="report-type">{report.type}</span>
          </div>
        </div>

        <p className="report-description">{report.description}</p>
      </div>

      <div className="report-card-footer">
        <div className="report-stats">
          <div className="stat">
            <span className="stat-value">{report.reportCount}</span>
            <span className="stat-label">Reports</span>
          </div>
          <div className="stat">
            <span className={`stat-value ${report.trustScore < 20 ? 'trust-low' : 'trust-medium'}`}>
              {report.trustScore}%
            </span>
            <span className="stat-label">Trust</span>
          </div>
        </div>

        <Link to={`/report/${report.id}`} className="report-link">
          Batafsil ko'rish
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default ReportCard;
