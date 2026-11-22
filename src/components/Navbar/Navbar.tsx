import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Globe } from 'lucide-react';
import { useBoxStore } from '../../store/boxStore';
import { useTranslation } from '../../hooks/useTranslation';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, isRtl } = useTranslation();
  const { language, setLanguage, totalItems, toggleBox } = useBoxStore();
  const count = totalItems();

  const links = [
    { label: t('home'), href: '#home' },
    { label: t('shop'), href: '#shop' },
    { label: t('categories'), href: '#categories' },
    { label: t('howItWorks'), href: '#how-it-works' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#101114]/80 border-b border-white/5"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <img src="/LG-rosee.rose.webp" alt="Kima" className="h-10 md:h-12" />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-[#A5A5AD] hover:text-white transition-colors duration-300 uppercase tracking-wider"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <button
              onClick={() => setLanguage(language === 'fr' ? 'ar' : 'fr')}
              className="flex items-center gap-1.5 text-xs text-[#A5A5AD] hover:text-white transition-colors px-2 py-1.5 rounded-lg hover:bg-white/5"
            >
              <Globe size={14} />
              <span>{language === 'fr' ? 'العربية' : 'Français'}</span>
            </button>

            {/* My Box */}
            <button
              onClick={toggleBox}
              className="relative flex items-center gap-2 bg-gradient-to-r from-[#F34D83] to-[#D92968] text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-[#F34D83]/30 transition-all duration-300"
            >
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">{t('myBox')}</span>
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-white text-[#D92968] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {count}
                </motion.span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-white p-1"
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
            className="md:hidden bg-[#18191F] border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-[#A5A5AD] hover:text-white transition-colors py-2 text-sm uppercase tracking-wider"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
