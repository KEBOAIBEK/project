/**
 * Centralized type icon component.
 * Eliminates SVG duplication across ReportCard, AllReports, SearchResults,
 * ReportDetail, Hero, and other components.
 *
 * @param {'Phone' | 'Telegram' | 'Website' | 'Email'} type
 * @param {'sm' | 'md' | 'lg'} size - Icon container size
 * @param {'gradient' | 'muted'} variant - Visual style
 */

const SIZES = {
  sm: { container: 'w-8 h-8', icon: 14 },
  md: { container: 'w-10 h-10', icon: 18 },
  lg: { container: 'w-12 h-12', icon: 22 },
  xl: { container: 'w-14 h-14', icon: 24 },
};

const GRADIENT_STYLES = {
  Phone: 'bg-gradient-to-br from-green-500 to-green-600 text-white',
  Telegram: 'bg-gradient-to-br from-sky-500 to-sky-600 text-white',
  Website: 'bg-gradient-to-br from-purple-500 to-purple-600 text-white',
  Email: 'bg-gradient-to-br from-orange-500 to-orange-600 text-white',
};

const MUTED_STYLES = {
  Phone: 'bg-green-500/10 text-green-400',
  Telegram: 'bg-sky-500/10 text-sky-400',
  Website: 'bg-purple-500/10 text-purple-400',
  Email: 'bg-orange-500/10 text-orange-400',
};

const TelegramSvg = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const PhoneSvg = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const WebsiteSvg = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ICON_COMPONENTS = {
  Phone: PhoneSvg,
  Telegram: TelegramSvg,
  Website: WebsiteSvg,
  Email: PhoneSvg, // fallback
};

const TypeIcon = ({ type, size = 'md', variant = 'gradient', className = '' }) => {
  const sizeConfig = SIZES[size] || SIZES.md;
  const styleMap = variant === 'gradient' ? GRADIENT_STYLES : MUTED_STYLES;
  const colorClass = styleMap[type] || styleMap.Phone;
  const IconComponent = ICON_COMPONENTS[type];

  if (!IconComponent) return null;

  return (
    <div className={`${sizeConfig.container} rounded-lg flex items-center justify-center ${colorClass} ${className}`}>
      <IconComponent size={sizeConfig.icon} />
    </div>
  );
};

export default TypeIcon;

// Re-export individual SVGs for edge cases
export { TelegramSvg, PhoneSvg, WebsiteSvg };
