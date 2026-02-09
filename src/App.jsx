import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ReportsProvider } from './context/ReportsContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ReportDetail from './pages/ReportDetail';
import InfoPage from './pages/InfoPage';
import AllReports from './pages/AllReports';
import SearchResults from './pages/SearchResults';
import Auth from './pages/Auth';

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <ReportsProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-theme-primary">
              <Routes>
                {/* Auth page without header/footer */}
                <Route path="/auth" element={<Auth />} />
                
                {/* Main app with header/footer */}
                <Route path="*" element={
                  <>
                    <Header />
                    <div className="flex-1">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/reports" element={<AllReports />} />
                        <Route path="/report/:id" element={<ReportDetail />} />
                        <Route path="/info/:type" element={<InfoPage />} />
                        <Route path="/search" element={<SearchResults />} />
                      </Routes>
                    </div>
                    <Footer />
                  </>
                } />
              </Routes>
            </div>
          </Router>
        </ReportsProvider>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
