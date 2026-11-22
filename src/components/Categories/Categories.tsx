import { motion } from 'framer-motion';
import { useBoxStore } from '../../store/boxStore';
import { useTranslation } from '../../hooks/useTranslation';
import { categories } from '../../data/products';

export default function Categories() {
  const { activeCategory, setActiveCategory, theme } = useBoxStore();
  const { isRtl, language } = useTranslation();
  const isDark = theme === 'dark';

  return (
    <section id="categories" className="py-4" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 shrink-0 border ${
                isActive
                  ? 'bg-gradient-to-r from-[#F34D83] to-[#D92968] text-white shadow-lg shadow-[#F34D83]/20 border-transparent'
                  : isDark
                  ? 'bg-[#18191F] text-[#A5A5AD] hover:text-white border-white/5 hover:border-[#F34D83]/30'
                  : 'bg-white text-gray-700 hover:text-black border-gray-200 hover:border-[#F34D83]/40 shadow-xs'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{language === 'ar' ? cat.labelAr : cat.label}</span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
