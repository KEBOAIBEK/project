import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ReportDetail from './pages/ReportDetail';
import InfoPage from './pages/InfoPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report/:id" element={<ReportDetail />} />
          <Route path="/info/:type" element={<InfoPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
