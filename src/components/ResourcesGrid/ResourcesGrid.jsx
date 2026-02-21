import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { resources } from '../../data/staticContent';

const ResourcesGrid = () => {
  const { t, theme } = useApp();

  const getIcon = (iconName, color) => {
    const colorClasses = {
      green: 'bg-green-500/10 text-green-400',
      red: 'bg-red-500/10 text-red-400',
      blue: 'bg-blue-500/10 text-blue-400'
    };

    const icons = {
      shield: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>
      ),
      alert: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
      info: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      )
    };

    return (
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
        {icons[iconName]}
      </div>
    );
  };

  return (
    <section className={`py-16 ${theme === 'dark' ? 'bg-[#0d1320]' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-theme-primary mb-2">{t('usefulInfo')}</h2>
          <p className="text-theme-secondary">{t('resourcesSubtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <Link 
              to={resource.link} 
              key={resource.id}
              className={`rounded-xl p-6 transition-all hover:-translate-y-1 group ${
                theme === 'dark'
                  ? 'bg-[#151d2e] border border-white/[0.06] hover:bg-[#1a2436] hover:border-white/[0.1]'
                  : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
              }`}
            >
              {getIcon(resource.icon, resource.iconColor)}
              <h3 className="text-lg font-semibold text-theme-primary mt-4 mb-2">{resource.title}</h3>
              <p className="text-sm text-theme-secondary leading-relaxed mb-4">{resource.description}</p>
              <span className="text-blue-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                {t('learnMore')}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
