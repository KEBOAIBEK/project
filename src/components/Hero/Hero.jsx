import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { stats } from '../../data/mockData';
import './Hero.css';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Navigate to search results (to be implemented)
    }
  };

  const suggestedSearches = ['+998 90 123 45 67', '@crypto_invest_uz', 'loans-express-uz.com'];

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-glow"></div>
      </div>

      <div className="container hero-content">
        <div className="hero-badge animate-fade-in-up">
          <span className="badge-dot"></span>
          <span>{stats.weeklyReports}+ fraud reports this week</span>
        </div>

        <h1 className="hero-title animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Aldanmang. Avval<br />tekshiring.
        </h1>

        <p className="hero-subtitle animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Ishonch reytingini bir zumda bilish uchun telefon raqami, foydalanuvchi 
          nomi yoki havolani kiriting.
        </p>

        <form className="hero-search animate-fade-in-up" style={{ animationDelay: '0.3s' }} onSubmit={handleSearch}>
          <div className="search-container">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Telefon, @username yoki URL kiriting..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              Tekshirish
            </button>
          </div>
        </form>

        <div className="hero-suggestions animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <span className="suggestions-label">Try:</span>
          {suggestedSearches.map((suggestion, index) => (
            <button
              key={index}
              className="suggestion-tag"
              onClick={() => setSearchQuery(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
