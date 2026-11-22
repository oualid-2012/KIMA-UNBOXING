import { motion } from 'framer-motion';
import { useBoxStore } from '../../store/boxStore';
import { useTranslation } from '../../hooks/useTranslation';

export default function BoxCapacityBar() {
  const { capacityPercentage, theme } = useBoxStore();
  const { t } = useTranslation();
  const pct = capacityPercentage();
  const isDark = theme === 'dark';

  const getLabel = () => {
    if (pct === 0) return t('empty');
    if (pct <= 25) return t('gettingStarted');
    if (pct <= 50) return t('halfFull');
    if (pct <= 75) return t('almostFull');
    return t('full');
  };

  const getColor = () => {
    if (pct <= 25) return 'from-[#F34D83] to-[#F34D83]';
    if (pct <= 50) return 'from-[#F34D83] to-[#D92968]';
    if (pct <= 75) return 'from-[#D92968] to-[#c41e56]';
    return 'from-[#D92968] to-[#a0153e]';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className={`transition-colors font-medium ${isDark ? 'text-[#A5A5AD]' : 'text-gray-600'}`}>
          {t('boxCapacity')}
        </span>
        <span className={`font-bold transition-colors ${isDark ? 'text-white' : 'text-gray-950'}`}>
          {getLabel()} — {Math.round(pct)}%
        </span>
      </div>
      <div
        className={`h-2.5 rounded-full overflow-hidden transition-colors ${isDark ? 'bg-white/10' : 'bg-gray-200'
          }`}
      >
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${getColor()}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
      </div>
    </div>
  );
}
