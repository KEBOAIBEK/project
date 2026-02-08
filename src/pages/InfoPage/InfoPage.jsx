import { useParams, Link } from 'react-router-dom';
import { infoPages } from '../../services/api';

const InfoPage = () => {
  const { type } = useParams();
  const pageData = infoPages[type];

  if (!pageData) {
    return (
      <main className="min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold text-white mb-3">Sahifa topilmadi</h1>
          <p className="text-slate-400 mb-6">Bu sahifa mavjud emas.</p>
          <Link to="/" className="text-blue-400 hover:text-blue-300">← Bosh sahifaga qaytish</Link>
        </div>
      </main>
    );
  }

  const iconColors = {
    shield: 'bg-green-500/10 text-green-400',
    alert: 'bg-red-500/10 text-red-400',
    info: 'bg-blue-500/10 text-blue-400'
  };

  const icons = {
    shield: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    alert: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    info: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    )
  };

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-6 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Home
        </Link>

        {/* Hero */}
        <div className="bg-[#151d2e] border border-white/[0.06] rounded-xl p-8 mb-8 flex items-center gap-6">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${iconColors[pageData.icon]}`}>
            {icons[pageData.icon]}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">{pageData.title}</h1>
            <p className="text-slate-400">{pageData.subtitle}</p>
          </div>
        </div>

        {/* Rules */}
        {pageData.rules && (
          <div className="space-y-4">
            {pageData.rules.map((rule, index) => (
              <article key={index} className="bg-[#151d2e] border border-white/[0.06] rounded-xl p-6 hover:bg-[#1a2436] transition-colors">
                <h3 className="flex items-center gap-3 text-lg font-semibold text-white mb-3">
                  <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                  {rule.title}
                </h3>
                <p className="text-slate-400 leading-relaxed pl-4">{rule.content}</p>
              </article>
            ))}
          </div>
        )}

        {/* Sources */}
        {pageData.sources && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pageData.sources.map((source, index) => (
              <div key={index} className="bg-[#151d2e] border border-white/[0.06] rounded-xl p-6 hover:bg-[#1a2436] transition-colors">
                <h3 className="text-lg font-semibold text-white mb-2">{source.name}</h3>
                <p className="text-sm text-slate-400 mb-3">{source.description}</p>
                <span className="text-blue-400 font-medium">{source.contact}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default InfoPage;
