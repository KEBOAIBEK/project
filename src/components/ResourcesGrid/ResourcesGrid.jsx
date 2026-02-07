import { Link } from 'react-router-dom';
import { resources } from '../../data/mockData';
import './ResourcesGrid.css';

const ResourcesGrid = () => {
  const getIcon = (iconName, color) => {
    const iconColors = {
      green: { bg: 'var(--color-accent-green-soft)', color: 'var(--color-accent-green)' },
      red: { bg: 'var(--color-accent-red-soft)', color: 'var(--color-accent-red)' },
      blue: { bg: 'var(--color-accent-blue-soft)', color: 'var(--color-accent-blue)' }
    };

    const colorStyle = iconColors[color] || iconColors.blue;

    const icons = {
      shield: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>
      ),
      alert: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
      info: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      )
    };

    return (
      <div 
        className="resource-icon" 
        style={{ background: colorStyle.bg, color: colorStyle.color }}
      >
        {icons[iconName]}
      </div>
    );
  };

  return (
    <section className="resources-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Foydali ma'lumotlar</h2>
          <p className="section-subtitle">
            Firibgarlardan himoyalanish bo'yicha muhim resurslar
          </p>
        </div>

        <div className="resources-grid">
          {resources.map((resource, index) => (
            <Link 
              to={resource.link} 
              key={resource.id}
              className="resource-card animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {getIcon(resource.icon, resource.iconColor)}
              <h3 className="resource-title">{resource.title}</h3>
              <p className="resource-description">{resource.description}</p>
              <span className="resource-link-text">
                Batafsil
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesGrid;
