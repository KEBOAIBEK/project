import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { infoPages } from '../../data/staticContent';
import { BackLink } from '../../components/ui/PageStates';

const ICON_COLORS = {
  shield: 'bg-green-500/10 text-green-400',
  alert: 'bg-red-500/10 text-red-400',
  info: 'bg-blue-500/10 text-blue-400',
};

const ICONS = {
  shield: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  alert: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  info: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

const InfoPage = () => {
  const { type } = useParams();
  const { t, theme } = useApp();
  const pageData = infoPages[type];

  const isDark = theme === 'dark';

  if (!pageData) {
    return (
      <main className="min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold text-theme-primary mb-3">Sahifa topilmadi</h1>
          <p className="text-theme-secondary mb-6">Bu sahifa mavjud emas.</p>
          <Link to="/" className="text-blue-400 hover:text-blue-300">← {t('backToHome')}</Link>
        </div>
      </main>
    );
  }

  const cardClass = isDark
    ? 'bg-[#151d2e] border border-white/6'
    : 'bg-white border border-gray-200 shadow-sm';

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-6">
        <BackLink />

        {/* Hero */}
        <div className={`${cardClass} rounded-xl p-8 mb-8 flex items-center gap-6`}>
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${ICON_COLORS[pageData.icon]}`}>
            {ICONS[pageData.icon]}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-theme-primary mb-1">{pageData.title}</h1>
            <p className="text-theme-secondary">{pageData.subtitle}</p>
          </div>
        </div>

        {/* Rules */}
        {pageData.rules && (
          <div className="space-y-4">
            {pageData.rules.map((rule, index) => (
              <article key={index} className={`${cardClass} rounded-xl p-6 hover:bg-[var(--bg-card-hover)] transition-colors`}>
                <h3 className="flex items-center gap-3 text-lg font-semibold text-theme-primary mb-3">
                  <span className="w-1 h-6 bg-blue-500 rounded-full" />
                  {rule.title}
                </h3>
                <p className="text-theme-secondary leading-relaxed pl-4">{rule.content}</p>
              </article>
            ))}
          </div>
        )}

        {/* Sources */}
        {pageData.sources && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pageData.sources.map((source, index) => (
              <div key={index} className={`${cardClass} rounded-xl p-6 hover:bg-[var(--bg-card-hover)] transition-colors`}>
                <h3 className="text-lg font-semibold text-theme-primary mb-2">{source.name}</h3>
                <p className="text-sm text-theme-secondary mb-3">{source.description}</p>
                <span className="text-blue-400 font-medium">{source.contact}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default InfoPage;
