import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="logo-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="6" fill="#3b82f6"/>
                  <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <span className="logo-text">Antifraud</span>
            </Link>
            <p className="footer-description">
              Community-powered anti-fraud platform protecting users from scams and fraudsters.
            </p>
            <div className="footer-social">
              <a href="https://t.me/antifraud_uz" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Telegram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href="https://github.com/antifraud-uz" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://twitter.com/antifraud_uz" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-column-title">Platforma</h4>
              <ul className="footer-list">
                <li><Link to="/">Bosh sahifa</Link></li>
                <li><Link to="/reports">Xabarlar</Link></li>
                <li><Link to="/report">Xabar qilish</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Ma'lumotlar</h4>
              <ul className="footer-list">
                <li><Link to="/info/protect-yourself">O'zingizni himoya qilish</Link></li>
                <li><Link to="/info/what-to-do">Aldanganda nima qilish</Link></li>
                <li><Link to="/info/official-sources">Rasmiy manbalar</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Qo'llab-quvvatlash</h4>
              <ul className="footer-list">
                <li><a href="mailto:info@antifraud.uz">Aloqa</a></li>
                <li><Link to="/faq">Ko'p so'raladigan savollar</Link></li>
                <li><Link to="/privacy">Maxfiylik siyosati</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 Antifraud. Barcha huquqlar himoyalangan.
          </p>
          <p className="footer-made">
            Made with <span className="heart">❤️</span> in Uzbekistan <span className="flag">uz</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
