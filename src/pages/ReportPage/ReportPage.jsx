import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const ReportPage = () => {
  const { t, theme } = useApp();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    identifier: '',
    category: '',
    description: '',
    evidence: null,
    contact: ''
  });

  const types = [
    { id: 'phone', label: 'Telefon raqami', icon: 'phone', placeholder: '+998 XX XXX XX XX' },
    { id: 'telegram', label: 'Telegram', icon: 'telegram', placeholder: '@username yoki link' },
    { id: 'website', label: 'Veb-sayt', icon: 'website', placeholder: 'https://example.com' },
    { id: 'other', label: 'Boshqa', icon: 'other', placeholder: 'Identifikator kiriting' }
  ];

  const categories = [
    { id: 'investment', label: 'Soxta investitsiya', description: 'Kripto, forex, MLM piramidalar' },
    { id: 'shopping', label: 'Soxta do\'kon', description: 'Oldindan to\'lov, yetkazib bermaslik' },
    { id: 'lottery', label: 'Soxta lottery/sovrin', description: '"Siz yutdingiz" xabarlari' },
    { id: 'job', label: 'Soxta ish taklifi', description: 'Yolg\'on ish o\'rinlari' },
    { id: 'phishing', label: 'Fishing', description: 'Shaxsiy ma\'lumotlarni o\'g\'irlash' },
    { id: 'other', label: 'Boshqa', description: 'Boshqa turdagi firibgarlik' }
  ];

  const handleTypeSelect = (typeId) => {
    setFormData({ ...formData, type: typeId });
  };

  const handleCategorySelect = (categoryId) => {
    setFormData({ ...formData, category: categoryId });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const getTypeIcon = (iconName) => {
    switch (iconName) {
      case 'phone':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
        );
      case 'telegram':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
        );
      case 'website':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        );
    }
  };

  const inputClass = theme === 'dark'
    ? 'w-full px-4 py-3 bg-[#111826] border border-white/[0.08] rounded-lg text-white placeholder-slate-500 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all'
    : 'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all';

  const cardClass = theme === 'dark'
    ? 'bg-[#151d2e] border border-white/[0.06]'
    : 'bg-white border border-gray-200 shadow-sm';

  // Success State
  if (isSubmitted) {
    return (
      <main className="min-h-screen py-16">
        <div className="max-w-lg mx-auto px-6 text-center">
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
            theme === 'dark' ? 'bg-green-500/10' : 'bg-green-50'
          }`}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-theme-primary mb-3">Xabaringiz qabul qilindi!</h1>
          <p className="text-theme-secondary mb-8">
            Sizning xabaringiz muvaffaqiyatli yuborildi. Jamoamiz buni tekshirib, bazaga qo'shadi.
            Umumiy xavfsizlikka hissangiz uchun rahmat!
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/" className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors">
              Bosh sahifa
            </Link>
            <button 
              onClick={() => {
                setIsSubmitted(false);
                setStep(1);
                setFormData({
                  type: '',
                  identifier: '',
                  category: '',
                  description: '',
                  evidence: null,
                  contact: ''
                });
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-white/[0.06] text-white hover:bg-white/[0.1]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Yangi xabar
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-theme-secondary hover:text-theme-primary mb-6 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            {t('backHome')}
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-theme-primary">Firibgarlikni xabar qiling</h1>
              <p className="text-theme-secondary text-sm">Jamoatchilikni himoya qilishga yordam bering</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                step >= s 
                  ? 'bg-blue-500 text-white' 
                  : theme === 'dark' ? 'bg-white/[0.06] text-slate-500' : 'bg-gray-100 text-gray-400'
              }`}>
                {step > s ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                  step > s ? 'bg-blue-500' : theme === 'dark' ? 'bg-white/[0.06]' : 'bg-gray-100'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Select Type */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-semibold text-theme-primary mb-4">Firibgarlik turini tanlang</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {types.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className={`p-4 rounded-xl text-left transition-all ${
                    formData.type === type.id
                      ? 'bg-blue-500/10 border-2 border-blue-500 ring-2 ring-blue-500/20'
                      : `${cardClass} hover:border-blue-500/30`
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg mb-3 flex items-center justify-center ${
                    formData.type === type.id ? 'bg-blue-500 text-white' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {getTypeIcon(type.icon)}
                  </div>
                  <div className="font-medium text-theme-primary">{type.label}</div>
                </button>
              ))}
            </div>

            {formData.type && (
              <div className="mb-6 animate-fade-in">
                <label className="text-sm text-theme-secondary block mb-2">
                  {types.find(t => t.id === formData.type)?.label} kiriting
                </label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder={types.find(t => t.id === formData.type)?.placeholder}
                  value={formData.identifier}
                  onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                />
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              disabled={!formData.type || !formData.identifier}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
              Davom etish
            </button>
          </div>
        )}

        {/* Step 2: Select Category & Description */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-semibold text-theme-primary mb-4">Firibgarlik kategoriyasi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`p-4 rounded-xl text-left transition-all ${
                    formData.category === cat.id
                      ? 'bg-blue-500/10 border-2 border-blue-500 ring-2 ring-blue-500/20'
                      : `${cardClass} hover:border-blue-500/30`
                  }`}
                >
                  <div className="font-medium text-theme-primary mb-1">{cat.label}</div>
                  <div className="text-xs text-theme-muted">{cat.description}</div>
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="text-sm text-theme-secondary block mb-2">Batafsil ta'rif</label>
              <textarea
                className={`${inputClass} resize-none h-32`}
                placeholder="Nima bo'lganini batafsil yozing. Qanday aldashdi? Qancha pul yo'qotildi?"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-white/[0.06] text-white hover:bg-white/[0.1]'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Orqaga
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!formData.category}
                className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
              >
                Davom etish
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Evidence & Submit */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-lg font-semibold text-theme-primary mb-4">Dalillar va yuborish</h2>
            
            {/* Summary */}
            <div className={`${cardClass} rounded-xl p-4 mb-6`}>
              <h3 className="text-sm font-medium text-theme-muted mb-3">Xabar xulosasi</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-theme-muted">Turi:</span>
                  <span className="text-theme-primary font-medium">{types.find(t => t.id === formData.type)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-theme-muted">Identifikator:</span>
                  <span className="text-theme-primary font-medium">{formData.identifier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-theme-muted">Kategoriya:</span>
                  <span className="text-theme-primary font-medium">{categories.find(c => c.id === formData.category)?.label}</span>
                </div>
              </div>
            </div>

            {/* Evidence Upload */}
            <div className="mb-6">
              <label className="text-sm text-theme-secondary block mb-2">Dalil qo'shish (ixtiyoriy)</label>
              <div className={`${cardClass} rounded-xl p-8 text-center border-dashed border-2 cursor-pointer hover:border-blue-500/50 transition-colors`}>
                <svg width="40" height="40" className="mx-auto mb-3 text-theme-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
                <p className="text-theme-secondary text-sm mb-1">Skrinshot yoki rasm yuklash</p>
                <p className="text-theme-muted text-xs">PNG, JPG, WEBP - max 5MB</p>
              </div>
            </div>

            {/* Contact (optional) */}
            <div className="mb-6">
              <label className="text-sm text-theme-secondary block mb-2">Aloqa (ixtiyoriy)</label>
              <input
                type="text"
                className={inputClass}
                placeholder="@telegram_username yoki email"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              />
              <p className="text-xs text-theme-muted mt-2">
                Qo'shimcha savollar bo'lsa sizga murojaat qilishimiz uchun
              </p>
            </div>

            {/* Terms */}
            <div className={`${cardClass} rounded-lg p-4 mb-6`}>
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded bg-blue-500/10 flex-shrink-0 flex items-center justify-center text-blue-400 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <p className="text-xs text-theme-muted">
                  Ushbu xabarni yuborish orqali siz ma'lumotlarning to'g'ri ekanligini tasdiqlaysiz. 
                  Yolg'on xabarlar moderatsiya tomonidan o'chiriladi.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-white/[0.06] text-white hover:bg-white/[0.1]'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Orqaga
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-500/70 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Yuborilmoqda...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    Xabarni yuborish
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Telegram Bot Alternative */}
        <div className={`${cardClass} rounded-xl p-5 mt-8`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-theme-primary mb-1">Telegram orqali xabar qilish</h3>
              <p className="text-sm text-theme-secondary">
                Tezroq va osonroq usul - Telegram botimiz orqali xabar yuboring
              </p>
            </div>
            <a 
              href="https://t.me/antifroduzbot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg transition-colors flex-shrink-0"
            >
              Botga o'tish
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReportPage;
