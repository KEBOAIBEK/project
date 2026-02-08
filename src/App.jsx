import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ReportsProvider } from './context/ReportsContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ReportDetail from './pages/ReportDetail';
import InfoPage from './pages/InfoPage';
import AllReports from './pages/AllReports';
import SearchResults from './pages/SearchResults';
import ReportPage from './pages/ReportPage';

function App() {
  return (
    <AppProvider>
      <ReportsProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-theme-primary">
            <Header />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reports" element={<AllReports />} />
                <Route path="/report/:id" element={<ReportDetail />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/info/:type" element={<InfoPage />} />
                <Route path="/search" element={<SearchResults />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </ReportsProvider>
    </AppProvider>
  );
}

export default App;

