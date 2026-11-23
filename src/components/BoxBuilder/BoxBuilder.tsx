import { useBoxStore } from '../../store/boxStore';
import { useTranslation } from '../../hooks/useTranslation';
import ProductGrid from '../ProductGrid/ProductGrid';
import Categories from '../Categories/Categories';
import BoxCapacityBar from '../UI/BoxCapacityBar';
import { motion } from 'framer-motion';
import { ShoppingBag, Sparkles } from 'lucide-react';

export default function BoxBuilder() {
  const { totalItems, totalPrice, theme, toggleBox } = useBoxStore();
  const { t, isRtl } = useTranslation();
  const isDark = theme === 'dark';
  const count = totalItems();

  return (
    <section
      id="shop"
      className={`py-12 md:py-20 transition-colors duration-300 ${
        isDark ? 'bg-[#101114]' : 'bg-[#FAF9F6]'
      }`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 border transition-colors ${
              isDark
                ? 'bg-white/5 border-white/10 text-[#A5A5AD]'
                : 'bg-pink-50 border-pink-200/80 text-pink-700'
            }`}
          >
            <Sparkles size={14} className="text-[#F34D83]" />
            <span className="text-xs uppercase tracking-widest font-semibold">
              {isRtl ? 'صمم صندوقك الشخصي' : 'Composez votre box sur-mesure'}
            </span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl font-black mb-4 transition-colors ${
              isDark ? 'text-white' : 'text-gray-950'
            }`}
          >
            {t('buildYourBox')}
          </h2>
          <p
            className={`max-w-xl mx-auto text-sm sm:text-base transition-colors ${
              isDark ? 'text-[#A5A5AD]' : 'text-gray-600'
            }`}
          >
            {t('heroSubtitle')}
          </p>
        </motion.div>

        {/* Capacity status banner & summary (appears when products are in box) */}
        {count > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-xl mx-auto mb-8 p-4 rounded-2xl border transition-colors ${
              isDark
                ? 'bg-[#18191F] border-white/5'
                : 'bg-white border-gray-200/90 shadow-md'
            }`}
          >
            <BoxCapacityBar />
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5 dark:border-white/5 border-gray-100">
              <span className={`text-xs font-medium ${isDark ? 'text-[#A5A5AD]' : 'text-gray-600'}`}>
                {count} {t('itemsInBox')} • <span className="text-[#F34D83] font-bold">{totalPrice()} {t('mad')}</span>
              </span>
              <button
                onClick={toggleBox}
                className="text-xs font-bold text-[#F34D83] hover:underline flex items-center gap-1 transition-all"
              >
                <ShoppingBag size={13} />
                <span>{t('myBox')} →</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Categories */}
        <div className="mb-8">
          <Categories />
        </div>

        {/* Full-width Product Grid */}
        <ProductGrid />
      </div>
    </section>
  );
}
