import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  
  const { login, isAuthenticated, error, clearError } = useAuth();
  const { theme } = useApp();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when switching tabs
  useEffect(() => {
    setFormError('');
    clearError?.();
  }, [activeTab]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!username.trim() || !password.trim()) {
      setFormError('Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }

    setIsLoading(true);
    
    const result = await login(username, password);
    
    if (result.success) {
      navigate('/');
    } else {
      setFormError(result.error || 'Login yoki parol noto\'g\'ri');
    }
    
    setIsLoading(false);
  };

  const isDark = theme === 'dark';

  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${isDark ? 'bg-blue-500' : 'bg-blue-400'}`} />
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${isDark ? 'bg-purple-500' : 'bg-purple-400'}`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10 ${isDark ? 'bg-cyan-500' : 'bg-cyan-400'}`} />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(${isDark ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#fff' : '#000'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Auth Card */}
      <div className={`relative w-full max-w-md animate-fade-in`}>
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-3 mb-8 group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <span className="text-2xl font-bold text-theme-primary">Antifraud</span>
        </Link>

        {/* Card */}
        <div className={`rounded-2xl p-8 backdrop-blur-xl ${
          isDark 
            ? 'bg-white/[0.03] border border-white/[0.08] shadow-2xl shadow-black/20' 
            : 'bg-white/70 border border-gray-200 shadow-2xl shadow-gray-200/50'
        }`}>
          {/* Tabs */}
          <div className={`flex rounded-xl p-1 mb-8 ${isDark ? 'bg-white/[0.04]' : 'bg-gray-100'}`}>
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'login'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'text-theme-secondary hover:text-theme-primary'
              }`}
            >
              Kirish
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'register'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'text-theme-secondary hover:text-theme-primary'
              }`}
            >
              Ro'yxatdan o'tish
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-theme-secondary mb-2">
                  Foydalanuvchi nomi
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl outline-none transition-all ${
                      isDark 
                        ? 'bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-white/[0.06]' 
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-theme-secondary mb-2">
                  Parol
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-12 py-3.5 rounded-xl outline-none transition-all ${
                      isDark 
                        ? 'bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-white/[0.06]' 
                        : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme-primary transition-colors"
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {(formError || error) && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {formError || error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Kirish...
                  </>
                ) : (
                  <>
                    Kirish
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Register Tab - Telegram Bot */}
          {activeTab === 'register' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  isDark ? 'bg-sky-500/10' : 'bg-sky-50'
                }`}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-sky-500">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-theme-primary mb-2">
                  Telegram orqali ro'yxatdan o'ting
                </h3>
                <p className="text-theme-secondary text-sm leading-relaxed">
                  Ro'yxatdan o'tish uchun Telegram botimizga o'ting. Bot sizga login va parol beradi.
                </p>
              </div>

              {/* Steps */}
              <div className={`space-y-3 p-4 rounded-xl ${isDark ? 'bg-white/[0.02]' : 'bg-gray-50'}`}>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <p className="text-sm text-theme-secondary">
                    Telegram botga kiring va <span className="text-theme-primary font-medium">/start</span> buyrug'ini yuboring
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <p className="text-sm text-theme-secondary">
                    Bot sizga <span className="text-theme-primary font-medium">login</span> va <span className="text-theme-primary font-medium">parol</span> beradi
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <p className="text-sm text-theme-secondary">
                    Olingan ma'lumotlar bilan <span className="text-theme-primary font-medium">"Kirish"</span> tabiga o'ting
                  </p>
                </div>
              </div>

              {/* Telegram Bot Button */}
              <a
                href="https://t.me/AntifraudUzBot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold transition-all shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 flex items-center justify-center gap-3"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                Telegram Botga o'tish
              </a>

              {/* Divider */}
              <div className="relative">
                <div className={`absolute inset-0 flex items-center ${isDark ? 'border-white/[0.06]' : 'border-gray-200'}`}>
                  <div className={`w-full border-t ${isDark ? 'border-white/[0.06]' : 'border-gray-200'}`}></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className={`px-3 ${isDark ? 'bg-[#151d2e]/30' : 'bg-white/70'} text-theme-muted`}>
                    yoki
                  </span>
                </div>
              </div>

              {/* Switch to Login */}
              <button
                onClick={() => setActiveTab('login')}
                className={`w-full py-3 rounded-xl font-medium transition-all ${
                  isDark 
                    ? 'bg-white/[0.04] hover:bg-white/[0.08] text-theme-primary border border-white/[0.06]' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                }`}
              >
                Allaqachon hisobingiz bormi? Kirish
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-theme-muted text-xs mt-6">
          Tizimga kirish orqali siz{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300 underline">foydalanish shartlari</a>
          {' '}va{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300 underline">maxfiylik siyosati</a>
          {' '}ga rozilik bildirasiz.
        </p>
      </div>
    </main>
  );
};

export default Auth;
