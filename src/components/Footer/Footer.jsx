import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const Footer = () => {
  const { t, theme } = useApp();

  return (
    <footer className={`border-t py-12 ${
      theme === 'dark' ? 'bg-[#0d1320] border-white/[0.06]' : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 pb-10 border-b border-theme">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2.5" fill="none"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-theme-primary">Antifroduz</span>
            </Link>
            <p className="text-sm text-theme-secondary leading-relaxed mb-5">
              Community-powered anti-fraud platform protecting users from scams.
            </p>
            <div className="flex gap-2">
              <a href="https://t.me/antifroduzbot" target="_blank" rel="noopener noreferrer" className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                theme === 'dark'
                  ? 'bg-white/[0.04] text-slate-400 hover:bg-blue-500/10 hover:text-blue-400'
                  : 'bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-500'
              }`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href="https://github.com/antifroduz" target="_blank" rel="noopener noreferrer" className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                theme === 'dark'
                  ? 'bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
              }`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-theme-primary uppercase tracking-wider mb-4">{t('platform')}</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-theme-secondary hover:text-theme-primary transition-colors">{t('home')}</Link></li>
              <li><Link to="/reports" className="text-sm text-theme-secondary hover:text-theme-primary transition-colors">{t('recentReports')}</Link></li>
              <li><a href="https://t.me/AntifraudUzBot" target="_blank" rel="noopener noreferrer" className="text-sm text-theme-secondary hover:text-theme-primary transition-colors">{t('reportScam')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-theme-primary uppercase tracking-wider mb-4">{t('information')}</h4>
            <ul className="space-y-3">
              <li><Link to="/info/protect-yourself" className="text-sm text-theme-secondary hover:text-theme-primary transition-colors">O'zingizni himoya qilish</Link></li>
              <li><Link to="/info/what-to-do" className="text-sm text-theme-secondary hover:text-theme-primary transition-colors">Aldanganda nima qilish</Link></li>
              <li><Link to="/info/official-sources" className="text-sm text-theme-secondary hover:text-theme-primary transition-colors">Rasmiy manbalar</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-theme-primary uppercase tracking-wider mb-4">{t('support')}</h4>
            <ul className="space-y-3">
              <li><a href="mailto:info@antifroduz.uz" className="text-sm text-theme-secondary hover:text-theme-primary transition-colors">{t('contact')}</a></li>
              <li><Link to="/faq" className="text-sm text-theme-secondary hover:text-theme-primary transition-colors">{t('faq')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-sm text-theme-muted">{t('copyright')}</p>
          <p className="text-sm text-theme-muted">{t('madeWith')} <span className="text-red-400">❤</span> {t('inUzbekistan')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
