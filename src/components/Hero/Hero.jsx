import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useReports } from '../../context/ReportsContext';
import { searchReports, transformReport } from '../../services/reportsService';
import TypeIcon from '../icons/TypeIcon';
import Spinner from '../ui/Spinner';
import { getTrustColor, getTrustBg, getStatusText } from '../../utils/trustScore';

const SUGGESTED_SEARCHES = ['+998 90 123 45 67', '@crypto_invest_uz', 'loans-express-uz.com'];

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { t, theme } = useApp();
  const { stats } = useReports();

  const isDark = theme === 'dark';

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    try {
      const results = await searchReports(searchQuery);

      if (results.length > 0) {
        setSearchResult({ found: true, ...transformReport(results[0]) });
      } else {
        setSearchResult({ found: false, query: searchQuery });
      }
    } catch (err) {
      console.error('Search error:', err);
      setSearchResult({ found: false, query: searchQuery, error: true });
    } finally {
      setIsSearching(false);
    }
  };

  const resetSearch = () => {
    setSearchQuery('');
    setSearchResult(null);
    setHasSearched(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSearchResult(null);
    setHasSearched(false);
  };

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-3xl ${
          isDark ? 'bg-gradient-radial from-blue-500/10 to-transparent' : 'bg-gradient-radial from-blue-500/5 to-transparent'
        }`} />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        {/* Stats badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm mb-6 ${
          isDark
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
        <SearchForm
          isDark={isDark}
          searchQuery={searchQuery}
          isSearching={isSearching}
          hasSearched={hasSearched}
          t={t}
          onQueryChange={(value) => {
            setSearchQuery(value);
            if (hasSearched) resetSearch();
          }}
          onSubmit={handleSearch}
        />

        {/* Suggestions */}
        {!hasSearched && (
          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            <span className="text-theme-muted text-sm">{t('tryLabel')}</span>
            {SUGGESTED_SEARCHES.map((suggestion, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  isDark
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

        {/* Search Result */}
        {hasSearched && searchResult && (
          <div className={`mt-6 rounded-2xl p-6 text-left transition-all animate-fade-in ${
            isDark
              ? 'bg-[#111826] border border-white/[0.08]'
              : 'bg-white border border-gray-200 shadow-lg'
          }`}>
            {searchResult.found ? (
              <FoundResult result={searchResult} isDark={isDark} onReset={resetSearch} />
            ) : (
              <NotFoundResult query={searchResult.query} isDark={isDark} onReset={resetSearch} />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

// ── Sub-components (extracted for readability) ──────────

const SearchForm = ({ isDark, searchQuery, isSearching, hasSearched, t, onQueryChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="mb-4">
    <div className={`flex items-center rounded-xl p-1.5 transition-all ${
      isDark
        ? 'bg-[#111826] border border-white/[0.08] focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/20'
        : 'bg-white border border-gray-200 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20'
    }`}>
      <svg className={`ml-4 flex-shrink-0 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        type="text"
        className={`flex-1 px-4 py-3 bg-transparent outline-none text-base ${
          isDark ? 'text-white placeholder-slate-500' : 'text-gray-900 placeholder-gray-400'
        }`}
        placeholder={t('searchPlaceholder')}
        value={searchQuery}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <button
        type="submit"
        disabled={isSearching}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/70 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
      >
        {isSearching ? (
          <>
            <Spinner size="sm" />
            <span className="hidden sm:inline">Tekshirilmoqda...</span>
          </>
        ) : (
          t('searchButton')
        )}
      </button>
    </div>
  </form>
);

const FoundResult = ({ result, isDark, onReset }) => {
  const statusInfo = getStatusText(result.trustScore);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <TypeIcon type={result.type} size="xl" />
          <div>
            <h3 className="text-xl font-bold text-theme-primary">{result.identifier}</h3>
            <span className="text-sm text-theme-muted">{result.type} • #{result.id}</span>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-lg border font-bold text-sm ${statusInfo.bg} ${statusInfo.color} ${statusInfo.border}`}>
          {statusInfo.text}
        </div>
      </div>

      {/* Trust Score Bar */}
      <div className={`rounded-xl p-5 mb-5 ${isDark ? 'bg-[#0d1320]' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-theme-muted">Ishonch reytingi</span>
          <span className={`text-3xl font-bold ${getTrustColor(result.trustScore)}`}>
            {result.trustScore}%
          </span>
        </div>
        <div className={`w-full h-3 rounded-full overflow-hidden ${isDark ? 'bg-white/[0.06]' : 'bg-gray-200'}`}>
          <div
            className={`h-full rounded-full transition-all duration-500 ${getTrustBg(result.trustScore)}`}
            style={{ width: `${result.trustScore}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <StatBox isDark={isDark} value={result.reportCount} label="Xabarlar soni" />
        <StatBox isDark={isDark} value={result.timeAgo} label="Oxirgi xabar" />
        <StatBox
          isDark={isDark}
          value={result.status === 'fraud' ? 'FRAUD' : 'SHUBHALI'}
          label="Holati"
          valueClass={result.status === 'fraud' ? 'text-red-500' : 'text-yellow-500'}
        />
      </div>

      {/* Description */}
      <p className="text-theme-secondary text-sm mb-5 leading-relaxed">{result.description}</p>

      {/* Actions */}
      <div className="flex gap-3">
        <Link
          to={`/report/${result.id}`}
          className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors text-center"
        >
          Batafsil ko'rish
        </Link>
        <button
          onClick={onReset}
          className={`px-4 py-3 rounded-lg font-medium transition-colors ${
            isDark
              ? 'bg-white/[0.06] text-white hover:bg-white/[0.1]'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Yangi qidiruv
        </button>
      </div>
    </>
  );
};

const NotFoundResult = ({ query, isDark, onReset }) => (
  <div className="text-center py-6">
    <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
      isDark ? 'bg-green-500/10' : 'bg-green-50'
    }`}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-theme-primary mb-2">Topilmadi!</h3>
    <p className="text-theme-secondary mb-1">
      <span className="font-semibold">"{query}"</span> bizning bazamizda mavjud emas.
    </p>
    <p className="text-sm text-theme-muted mb-6">
      Bu shubhali deb xabar qilinmagan yoki hali tekshirilmagan.
    </p>
    <div className="flex gap-3 justify-center">
      <button
        onClick={onReset}
        className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
      >
        Yangi qidiruv
      </button>
      <a
        href="https://t.me/AntifraudUzBot"
        target="_blank"
        rel="noopener noreferrer"
        className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
          isDark
            ? 'bg-white/[0.06] text-white hover:bg-white/[0.1]'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Xabar qilish
      </a>
    </div>
  </div>
);

const StatBox = ({ isDark, value, label, valueClass = 'text-theme-primary' }) => (
  <div className={`rounded-lg p-4 text-center ${isDark ? 'bg-[#0d1320]' : 'bg-gray-50'}`}>
    <div className={`text-2xl font-bold ${valueClass}`}>{value}</div>
    <div className="text-xs text-theme-muted mt-1">{label}</div>
  </div>
);

export default Hero;
