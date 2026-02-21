import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { searchReports, transformReport } from '../../services/reportsService';
import { PageLoading, BackLink, EmptyState } from '../../components/ui/PageStates';
import ReportListItem from '../../components/ReportsGrid/ReportListItem';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { t, theme } = useApp();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      performSearch();
    } else {
      setLoading(false);
    }
  }, [query]);

  const performSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const results = await searchReports(query);
      setSearchResults(results.map(transformReport));
    } catch (err) {
      console.error('Error searching:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <PageLoading message="Qidirilmoqda..." />;

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-6">
        <BackLink />

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-theme-primary mb-2">{t('searchResults')}</h1>
          <p className="text-theme-secondary">
            "{query}" - <span className="text-theme-muted">{searchResults.length} {t('resultsFound')}</span>
          </p>
        </div>

        {error && (
          <div className={`text-center py-8 rounded-xl mb-6 ${
            theme === 'dark' ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'
          }`}>
            <p className="text-red-500">{error}</p>
            <button
              onClick={performSearch}
              className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Qayta urinish
            </button>
          </div>
        )}

        {searchResults.length === 0 && !error ? (
          <EmptyState
            icon="search"
            title={t('noResults')}
            description={`"${query}" bo'yicha hech narsa topilmadi`}
          />
        ) : (
          <div className="space-y-3">
            {searchResults.map((report) => (
              <ReportListItem key={report.id} report={report} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default SearchResults;
