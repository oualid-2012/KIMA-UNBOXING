import { useBoxStore } from '../../store/boxStore';
import { useTranslation } from '../../hooks/useTranslation';

export default function BoxCapacityBar() {
  const { totalItems, theme } = useBoxStore();
  const { t, language } = useTranslation();
  const count = totalItems();
  const isDark = theme === 'dark';
  const isAr = language === 'ar';

  return (
    <div className="flex items-center justify-between text-xs py-0.5">
      <div className="flex items-center gap-1.5">
        <span className="text-sm">📦</span>
        <span className={`font-semibold transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('boxCapacity')}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {count > 0 && (
          <span className={`text-[11px] font-medium transition-colors ${isDark ? 'text-[#A5A5AD]' : 'text-gray-500'}`}>
            {count} {t('products')}
          </span>
        )}
        <span className="font-bold text-[#F34D83] flex items-center gap-1 bg-[#F34D83]/10 border border-[#F34D83]/20 px-2.5 py-0.5 rounded-full text-xs">
          <span>✨</span>
          <span>{isAr ? 'غير محدودة (∞)' : 'Illimitée (∞)'}</span>
        </span>
      </div>
    </div>
  );
}
