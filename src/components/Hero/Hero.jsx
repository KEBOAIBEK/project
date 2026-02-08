import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useReports } from '../../context/ReportsContext';
import { searchReports, transformReport } from '../../services/api';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { t, theme } = useApp();
  const { stats } = useReports(); // Use shared context instead of fetching

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    try {
      const results = await searchReports(searchQuery);
      
      if (results.length > 0) {
        const found = transformReport(results[0]);
        setSearchResult({
          found: true,
          ...found
        });
      } else {
        setSearchResult({
          found: false,
          query: searchQuery
        });
      }
    } catch (err) {
      console.error('Search error:', err);
      setSearchResult({
        found: false,
        query: searchQuery,
        error: true
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSearchResult(null);
    setHasSearched(false);
  };

  const suggestedSearches = ['+998 90 123 45 67', '@crypto_invest_uz', 'loans-express-uz.com'];

  const getTrustColor = (score) => {
    if (score <= 10) return 'text-red-500';
    if (score <= 30) return 'text-orange-500';
    if (score <= 50) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getTrustBg = (score) => {
    if (score <= 10) return 'bg-red-500';
    if (score <= 30) return 'bg-orange-500';
    if (score <= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusText = (score) => {
    if (score <= 10) return { text: 'XAVFLI', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30' };
    if (score <= 30) return { text: 'SHUBHALI', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30' };
    if (score <= 50) return { text: 'EHTIYOTKOR', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
    return { text: 'XAVFSIZ', color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/30' };
  };

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-3xl ${
          theme === 'dark' ? 'bg-gradient-radial from-blue-500/10 to-transparent' : 'bg-gradient-radial from-blue-500/5 to-transparent'
        }`} />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-6 ${
          theme === 'dark' 
            ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400' 
            : 'bg-blue-500/10 border border-blue-500/20 text-blue-600'
        }`}>
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>{stats.weeklyReports}+ {t('fraudReportsWeek')}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-theme-primary leading-tight mb-5 tracking-tight whitespace-pre-line">
          {t('heroTitle')}
        </h1>

        <p className="text-lg text-theme-secondary max-w-xl mx-auto mb-8 leading-relaxed">
          {t('heroSubtitle')}
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-4">
          <div className={`flex items-center rounded-xl p-1.5 transition-all ${
            theme === 'dark'
              ? 'bg-[#111826] border border-white/[0.08] focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/20'
              : 'bg-white border border-gray-200 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20'
          }`}>
            <svg className={`ml-4 flex-shrink-0 ${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              className={`flex-1 px-4 py-3 bg-transparent outline-none text-base ${
                theme === 'dark' ? 'text-white placeholder-slate-500' : 'text-gray-900 placeholder-gray-400'
              }`}
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (hasSearched) {
                  setSearchResult(null);
                  setHasSearched(false);
                }
              }}
            />
            <button 
              type="submit" 
              disabled={isSearching}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/70 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              {isSearching ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="hidden sm:inline">Tekshirilmoqda...</span>
                </>
              ) : (
                t('searchButton')
              )}
            </button>
          </div>
        </form>

        {/* Suggestions */}
        {!hasSearched && (
          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            <span className="text-theme-muted text-sm">{t('tryLabel')}</span>
            {suggestedSearches.map((suggestion, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  theme === 'dark'
                    ? 'bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:bg-white/[0.08] hover:text-white'
                    : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Search Result - Inline Display */}
        {hasSearched && searchResult && (
          <div className={`mt-6 rounded-2xl p-6 text-left transition-all animate-fade-in ${
            theme === 'dark'
              ? 'bg-[#111826] border border-white/[0.08]'
              : 'bg-white border border-gray-200 shadow-lg'
          }`}>
            {searchResult.found ? (
              <>
                {/* Result Header */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg ${
                      searchResult.type === 'Telegram' ? 'bg-gradient-to-br from-sky-500 to-sky-600' :
                      searchResult.type === 'Phone' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                      'bg-gradient-to-br from-purple-500 to-purple-600'
                    }`}>
                      {searchResult.type === 'Telegram' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                        </svg>
                      )}
                      {searchResult.type === 'Phone' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                      )}
                      {searchResult.type === 'Website' && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-theme-primary">{searchResult.identifier}</h3>
                      <span className="text-sm text-theme-muted">{searchResult.type} • #{searchResult.id}</span>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className={`px-4 py-2 rounded-lg border font-bold text-sm ${getStatusText(searchResult.trustScore).bg} ${getStatusText(searchResult.trustScore).color} ${getStatusText(searchResult.trustScore).border}`}>
                    {getStatusText(searchResult.trustScore).text}
                  </div>
                </div>

                {/* Trust Score Bar */}
                <div className={`rounded-xl p-5 mb-5 ${
                  theme === 'dark' ? 'bg-[#0d1320]' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-theme-muted">Ishonch reytingi</span>
                    <span className={`text-3xl font-bold ${getTrustColor(searchResult.trustScore)}`}>
                      {searchResult.trustScore}%
                    </span>
                  </div>
                  <div className={`w-full h-3 rounded-full overflow-hidden ${
                    theme === 'dark' ? 'bg-white/[0.06]' : 'bg-gray-200'
                  }`}>
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${getTrustBg(searchResult.trustScore)}`} 
                      style={{ width: `${searchResult.trustScore}%` }}
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-5">
                  <div className={`rounded-lg p-4 text-center ${
                    theme === 'dark' ? 'bg-[#0d1320]' : 'bg-gray-50'
                  }`}>
                    <div className="text-2xl font-bold text-theme-primary">{searchResult.reportCount}</div>
                    <div className="text-xs text-theme-muted mt-1">Xabarlar soni</div>
                  </div>
                  <div className={`rounded-lg p-4 text-center ${
                    theme === 'dark' ? 'bg-[#0d1320]' : 'bg-gray-50'
                  }`}>
                    <div className="text-2xl font-bold text-theme-primary">{searchResult.timeAgo}</div>
                    <div className="text-xs text-theme-muted mt-1">Oxirgi xabar</div>
                  </div>
                  <div className={`rounded-lg p-4 text-center ${
                    theme === 'dark' ? 'bg-[#0d1320]' : 'bg-gray-50'
                  }`}>
                    <div className={`text-2xl font-bold ${
                      searchResult.status === 'fraud' ? 'text-red-500' : 'text-yellow-500'
                    }`}>
                      {searchResult.status === 'fraud' ? 'FRAUD' : 'SHUBHALI'}
                    </div>
                    <div className="text-xs text-theme-muted mt-1">Holati</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-theme-secondary text-sm mb-5 leading-relaxed">
                  {searchResult.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link 
                    to={`/report/${searchResult.id}`}
                    className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors text-center"
                  >
                    Batafsil ko'rish
                  </Link>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResult(null);
                      setHasSearched(false);
                    }}
                    className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                      theme === 'dark'
                        ? 'bg-white/[0.06] text-white hover:bg-white/[0.1]'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Yangi qidiruv
                  </button>
                </div>
              </>
            ) : (
              // Not Found State
              <div className="text-center py-6">
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  theme === 'dark' ? 'bg-green-500/10' : 'bg-green-50'
                }`}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-theme-primary mb-2">Topilmadi!</h3>
                <p className="text-theme-secondary mb-1">
                  <span className="font-semibold">"{searchResult.query}"</span> bizning bazamizda mavjud emas.
                </p>
                <p className="text-sm text-theme-muted mb-6">
                  Bu shubhali deb xabar qilinmagan yoki hali tekshirilmagan.
                </p>
                <div className="flex gap-3 justify-center">
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setSearchResult(null);
                      setHasSearched(false);
                    }}
                    className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                  >
                    Yangi qidiruv
                  </button>
                  <Link 
                    to="/report"
                    className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                      theme === 'dark'
                        ? 'bg-white/[0.06] text-white hover:bg-white/[0.1]'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Xabar qilish
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
