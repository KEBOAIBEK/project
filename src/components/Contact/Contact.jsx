import { useState } from 'react';
import { useApp } from '../../context/AppContext';

const Contact = () => {
  const { t, theme } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const inputClass = theme === 'dark'
    ? 'w-full px-4 py-3 bg-[#111826] border border-white/[0.08] rounded-lg text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all'
    : 'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all';

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold text-theme-primary mb-3">{t('contactTitle')}</h2>
            <p className="text-theme-secondary mb-8 leading-relaxed">{t('contactSubtitle')}</p>

            <div className="space-y-4">
              <a href="mailto:info@antifroduz.uz" className="flex items-center gap-4 group">
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-blue-400 ${
                  theme === 'dark' ? 'bg-white/[0.04] group-hover:bg-blue-500/10' : 'bg-gray-100 group-hover:bg-blue-50'
                } transition-colors`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-theme-muted block">{t('email')}</span>
                  <span className="text-theme-primary group-hover:text-blue-400 transition-colors">info@antifroduz.uz</span>
                </div>
              </a>

              <a href="https://t.me/antifroduzbot" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-blue-400 ${
                  theme === 'dark' ? 'bg-white/[0.04] group-hover:bg-blue-500/10' : 'bg-gray-100 group-hover:bg-blue-50'
                } transition-colors`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-xs text-theme-muted block">Telegram</span>
                  <span className="text-theme-primary group-hover:text-blue-400 transition-colors">@antifroduzbot</span>
                </div>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={`rounded-xl p-6 space-y-5 ${
            theme === 'dark'
              ? 'bg-[#151d2e] border border-white/[0.06]'
              : 'bg-white border border-gray-200 shadow-sm'
          }`}>
            <div>
              <label htmlFor="name" className="text-sm text-theme-secondary block mb-2">{t('yourName')}</label>
              <input
                type="text"
                id="name"
                name="name"
                className={inputClass}
                value={formData.name}
                onChange={handleChange}
                placeholder={t('namePlaceholder')}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm text-theme-secondary block mb-2">{t('email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                className={inputClass}
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="text-sm text-theme-secondary block mb-2">{t('message')}</label>
              <textarea
                id="message"
                name="message"
                className={`${inputClass} resize-none h-28`}
                value={formData.message}
                onChange={handleChange}
                placeholder={t('messagePlaceholder')}
                required
              />
            </div>

            <button type="submit" className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
              {t('sendMessage')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
