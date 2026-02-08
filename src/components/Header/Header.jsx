import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Logo from '../../assets/images/Logo.png';

const Header = () => {
  const { language, languages, changeLanguage, theme, toggleTheme, t } = useApp();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languages.find(l => l.code === language);

  return (
    <header className="sticky top-0 z-50 bg-theme-primary/90 backdrop-blur-xl border-b border-theme">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src={Logo} 
            alt="Antifroduz Logo" 
            className="w-9 h-9 rounded-lg object-contain"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-theme-primary leading-tight">Antifroduz</span>
            <span className="text-[10px] text-theme-muted uppercase tracking-wider">Anti-Fraud Platform</span>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          {/* Language Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-theme-secondary hover:text-theme-primary rounded-lg hover:bg-[var(--bg-card)] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              <span className="hidden sm:inline">{currentLang?.name}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`}>
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-theme-card border border-theme rounded-lg shadow-xl overflow-hidden z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLanguage(lang.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      language === lang.code 
                        ? 'bg-blue-500/10 text-blue-400' 
                        : 'text-theme-secondary hover:bg-[var(--bg-card-hover)] hover:text-theme-primary'
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.name}</span>
                    {language === lang.code && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center text-theme-secondary hover:text-theme-primary rounded-lg hover:bg-[var(--bg-card)] transition-colors" 
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Report Button */}
          <Link to="/report" className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-all hover:-translate-y-0.5 shadow-lg shadow-red-500/20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span className="hidden sm:inline">{t('reportScam')}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
