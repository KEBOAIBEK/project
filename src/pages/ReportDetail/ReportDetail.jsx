import { useParams, Link } from 'react-router-dom';
import { reports, reportDetails } from '../../data/mockData';
import './ReportDetail.css';

const ReportDetail = () => {
  const { id } = useParams();
  const reportId = parseInt(id);
  
  // Get basic report info from reports array
  const basicInfo = reports.find(r => r.id === reportId);
  // Get detailed info if available
  const details = reportDetails[reportId];

  if (!basicInfo) {
    return (
      <main className="report-detail-page">
        <div className="container">
          <div className="not-found">
            <h1>Xabar topilmadi</h1>
            <p>Bu xabar mavjud emas yoki o'chirilgan.</p>
            <Link to="/" className="back-link">← Bosh sahifaga qaytish</Link>
          </div>
        </div>
      </main>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'fraud':
        return <span className="status-badge fraud">FRAUD</span>;
      case 'suspicious':
        return <span className="status-badge suspicious">SHUBHALI</span>;
      default:
        return <span className="status-badge unknown">NOMA'LUM</span>;
    }
  };

  const getTrustScoreColor = (score) => {
    if (score <= 10) return 'score-critical';
    if (score <= 30) return 'score-low';
    if (score <= 60) return 'score-medium';
    return 'score-high';
  };

  return (
    <main className="report-detail-page">
      <div className="container">
        <Link to="/" className="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </Link>

        <div className="report-detail-card">
          <div className="report-header">
            <div className="report-identity">
              <div className={`report-type-icon ${basicInfo.type.toLowerCase()}`}>
                {basicInfo.type === 'Telegram' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                )}
                {basicInfo.type === 'Phone' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                )}
                {basicInfo.type === 'Website' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                )}
              </div>
              <div className="identity-info">
                <h1 className="identifier">{basicInfo.identifier}</h1>
                <span className="identifier-type">ID: #{basicInfo.id}</span>
              </div>
            </div>
            {getStatusBadge(basicInfo.status)}
          </div>

          <div className="report-stats-grid">
            <div className="stat-card">
              <span className="stat-label">Trust Score</span>
              <div className="stat-value-wrapper">
                <span className={`stat-value ${getTrustScoreColor(basicInfo.trustScore)}`}>
                  {basicInfo.trustScore}%
                </span>
                <span className="stat-sublabel">Safety Rating</span>
              </div>
              <div className="trust-bar">
                <div 
                  className={`trust-fill ${getTrustScoreColor(basicInfo.trustScore)}`}
                  style={{ width: `${basicInfo.trustScore}%` }}
                ></div>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-label">Total Reports</span>
              <div className="stat-value-wrapper">
                <span className="stat-value">{basicInfo.reportCount}</span>
                {details && (
                  <span className="stat-badge">+{details.weeklyReports} THIS WEEK</span>
                )}
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-label">Last Reported</span>
              <div className="stat-value-wrapper">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span className="stat-value">{basicInfo.timeAgo}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="report-content-grid">
          <div className="report-details-section">
            <h2 className="section-title">Report Details</h2>
            <div className="details-card">
              <p className="report-description">
                {details?.fullDescription || basicInfo.description}
              </p>
            </div>

            {details?.evidenceImages && (
              <>
                <h3 className="subsection-title">Evidence Screenshots</h3>
                <div className="evidence-grid">
                  {details.evidenceImages.map((img, index) => (
                    <div key={index} className="evidence-placeholder">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <path d="M21 15l-5-5L5 21"/>
                      </svg>
                      <span>Evidence {index + 1}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="report-info-section">
            <h2 className="section-title">Information</h2>
            <div className="info-card">
              <div className="info-row">
                <span className="info-label">Category</span>
                <div className="info-value">
                  <div className={`info-icon ${basicInfo.type.toLowerCase()}`}>
                    {basicInfo.type === 'Telegram' && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    )}
                    {basicInfo.type === 'Phone' && '📞'}
                    {basicInfo.type === 'Website' && '🌐'}
                  </div>
                  <span>{basicInfo.type}</span>
                </div>
              </div>

              <div className="info-row">
                <span className="info-label">Reporter</span>
                <div className="info-value">
                  <div className="reporter-avatar">A</div>
                  <span>Anonymous User</span>
                </div>
              </div>

              <div className="info-row">
                <span className="info-label">Date</span>
                <span className="info-value-text">
                  {details?.information?.firstReported || new Date().toISOString().split('T')[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReportDetail;
