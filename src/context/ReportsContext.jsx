import { createContext, useContext, useState, useEffect } from 'react';
import { getReports, transformReport } from '../services/api';

const ReportsContext = createContext();

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error('useReports must be used within a ReportsProvider');
  }
  return context;
};

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ weeklyReports: 0, totalReports: 0 });
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    total: 0,
    pageTotal: 0
  });

  // Fetch reports - called once when app loads
  const fetchReports = async (page = 0, size = 10) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getReports(page, size);
      
      // Handle different response formats - API wraps data in 'result' object
      const data = response.result || response;
      const items = data.items || data.content || data.data || [];
      const transformedReports = Array.isArray(items) ? items.map(transformReport) : [];
      
      setReports(transformedReports);
      setStats({
        weeklyReports: Math.min(data.total || transformedReports.length, 50),
        totalReports: data.total || transformedReports.length
      });
      setPagination({
        page: data.page ?? page,
        size: data.size || size,
        total: data.total || transformedReports.length,
        pageTotal: data.pageTotal || Math.ceil((data.total || transformedReports.length) / size)
      });
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchReports(0, 20);
  }, []);

  // Refresh reports
  const refreshReports = () => {
    fetchReports(pagination.page, pagination.size);
  };

  // Load more reports (pagination)
  const loadPage = (page) => {
    fetchReports(page, pagination.size);
  };

  const value = {
    reports,
    loading,
    error,
    stats,
    pagination,
    fetchReports,
    refreshReports,
    loadPage,
    // Convenience getters
    recentReports: reports.slice(0, 6),
  };

  return (
    <ReportsContext.Provider value={value}>
      {children}
    </ReportsContext.Provider>
  );
};

export default ReportsContext;
