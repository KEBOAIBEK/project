import { useParams, Link } from 'react-router-dom';
import { infoPages } from '../../data/mockData';
import './InfoPage.css';

const InfoPage = () => {
  const { type } = useParams();
  const pageData = infoPages[type];

  if (!pageData) {
    return (
      <main className="info-page">
        <div className="container">
          <div className="not-found">
            <h1>Sahifa topilmadi</h1>
            <p>Bu sahifa mavjud emas.</p>
            <Link to="/" className="back-link">← Bosh sahifaga qaytish</Link>
          </div>
        </div>
      </main>
    );
  }

  const getIcon = (iconName) => {
    const icons = {
      shield: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>
      ),
      alert: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
      info: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      )
    };
    return icons[iconName] || icons.info;
  };

  return (
    <main className="info-page">
      <div className="container">
        <Link to="/" className="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </Link>

        <div className="info-hero">
          <div className={`info-icon ${pageData.icon}`}>
            {getIcon(pageData.icon)}
          </div>
          <div className="info-header">
            <h1 className="info-title">{pageData.title}</h1>
            <p className="info-subtitle">{pageData.subtitle}</p>
          </div>
        </div>

        <div className="info-content">
          {pageData.rules && (
            <div className="rules-list">
              {pageData.rules.map((rule, index) => (
                <article key={index} className="rule-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <h3 className="rule-title">
                    <span className="rule-indicator"></span>
                    {rule.title}
                  </h3>
                  <p className="rule-content">{rule.content}</p>
                </article>
              ))}
            </div>
          )}

          {pageData.sources && (
            <div className="sources-grid">
              {pageData.sources.map((source, index) => (
                <div key={index} className="source-card animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <h3 className="source-name">{source.name}</h3>
                  <p className="source-description">{source.description}</p>
                  <span className="source-contact">{source.contact}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default InfoPage;
