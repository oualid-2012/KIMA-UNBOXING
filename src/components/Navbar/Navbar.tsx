import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Globe, Sun, Moon } from 'lucide-react';
import { useBoxStore } from '../../store/boxStore';
import { useTranslation } from '../../hooks/useTranslation';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, isRtl } = useTranslation();
  const { language, setLanguage, totalItems, toggleBox, theme, toggleTheme } = useBoxStore();
  const count = totalItems();
  const isDark = theme === 'dark';

  const links = [
    { label: t('home'), href: '#home' },
    { label: t('shop'), href: '#shop' },
    { label: t('categories'), href: '#categories' },
    { label: t('howItWorks'), href: '#how-it-works' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
        isDark
          ? 'bg-[#101114]/85 border-white/5'
          : 'bg-white/90 border-gray-200/80 shadow-xs'
      }`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <img
              src={isDark ? '/asset/LG-rosee.rose.svg' : '/asset/LG-whait.rose.svg'}
              alt="Kima"
              className="h-10 md:h-12 object-contain transition-opacity duration-300"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm uppercase tracking-wider font-medium transition-colors duration-300 ${
                  isDark
                    ? 'text-[#A5A5AD] hover:text-white'
                    : 'text-gray-600 hover:text-gray-950'
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Switcher Button (Mode Sombre / Mode Blanc) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={toggleTheme}
              aria-label={isDark ? t('lightMode') : t('darkMode')}
              title={isDark ? t('lightMode') : t('darkMode')}
              className={`flex items-center gap-1.5 text-xs px-2.5 sm:px-3 py-1.5 rounded-full transition-all duration-300 ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 text-amber-300 border border-white/10 hover:border-amber-400/30'
                  : 'bg-gray-100 hover:bg-gray-200 text-indigo-700 border border-gray-200 shadow-xs'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? (
                    <Sun size={15} className="text-amber-300" />
                  ) : (
                    <Moon size={15} className="text-indigo-600" />
                  )}
                </motion.div>
              </AnimatePresence>
              <span className="hidden sm:inline font-semibold">
                {isDark ? t('lightMode') : t('darkMode')}
              </span>
            </motion.button>

            {/* Language switcher */}
            <button
              onClick={() => setLanguage(language === 'fr' ? 'ar' : 'fr')}
              className={`flex items-center gap-1.5 text-xs px-2 sm:px-2.5 py-1.5 rounded-lg transition-colors ${
                isDark
                  ? 'text-[#A5A5AD] hover:text-white hover:bg-white/5'
                  : 'text-gray-600 hover:text-gray-950 hover:bg-gray-100'
              }`}
            >
              <Globe size={14} />
              <span className="font-medium">{language === 'fr' ? 'العربية' : 'Français'}</span>
            </button>

            {/* My Box */}
            <button
              onClick={toggleBox}
              className="relative flex items-center gap-2 bg-gradient-to-r from-[#F34D83] to-[#D92968] text-white px-3.5 sm:px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-[#F34D83]/30 transition-all duration-300 shrink-0"
            >
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">{t('myBox')}</span>
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-white text-[#D92968] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs"
                >
                  {count}
                </motion.span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden p-1 transition-colors ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t overflow-hidden transition-colors duration-300 ${
              isDark ? 'bg-[#18191F] border-white/5' : 'bg-white border-gray-200 shadow-xl'
            }`}
          >
            <div className="px-4 py-4 space-y-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-2 text-sm uppercase tracking-wider font-medium transition-colors ${
                    isDark
                      ? 'text-[#A5A5AD] hover:text-white'
                      : 'text-gray-700 hover:text-gray-950'
                  }`}
                >
                  {l.label}
                </a>
              ))}

              {/* Mobile theme toggle row */}
              <div className="pt-3 border-t border-white/5 dark:border-white/5 border-gray-200 flex items-center justify-between">
                <span className={`text-xs font-medium ${isDark ? 'text-[#A5A5AD]' : 'text-gray-600'}`}>
                  {t('switchTheme')}
                </span>
                <button
                  onClick={toggleTheme}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    isDark
                      ? 'bg-white/10 text-amber-300'
                      : 'bg-gray-100 text-indigo-700'
                  }`}
                >
                  {isDark ? <Sun size={14} /> : <Moon size={14} />}
                  <span>{isDark ? t('lightMode') : t('darkMode')}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
