import { MessageCircle, Mail, Heart } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useBoxStore } from '../../store/boxStore';

export default function Footer() {
  const { t, isRtl } = useTranslation();
  const { theme } = useBoxStore();
  const isDark = theme === 'dark';

  return (
    <footer
      className={`border-t py-12 transition-colors duration-300 ${
        isDark ? 'bg-[#0a0b0d] border-white/5' : 'bg-gray-100/90 border-gray-200'
      }`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <img
              src={isDark ? '/LG-rosee.rose.webp' : '/LG-Black.rose.webp'}
              alt="Kima Unboxing"
              className="h-12 mb-4 object-contain transition-opacity duration-300"
            />
            <p
              className={`text-sm leading-relaxed max-w-sm mb-6 transition-colors ${
                isDark ? 'text-[#A5A5AD]' : 'text-gray-600'
              }`}
            >
              {isRtl
                ? 'كيما أنبوكسينغ — أول تجربة تسوق تفاعلية في المغرب. اختر منتجاتك وصمم صندوقك الخاص!'
                : 'Kima Unboxing — La première expérience shopping interactive au Maroc. Choisissez vos produits et construisez votre propre box !'}
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full border flex items-center justify-center hover:text-[#F34D83] hover:border-[#F34D83]/30 transition-all duration-300 ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-[#A5A5AD]'
                    : 'bg-white border-gray-200 text-gray-600 shadow-xs'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full border flex items-center justify-center hover:text-green-500 hover:border-green-400/30 transition-all duration-300 ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-[#A5A5AD]'
                    : 'bg-white border-gray-200 text-gray-600 shadow-xs'
                }`}
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="mailto:contact@kimaunboxing.com"
                className={`w-10 h-10 rounded-full border flex items-center justify-center hover:text-pink-500 hover:border-pink-300 transition-all duration-300 ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-[#A5A5AD]'
                    : 'bg-white border-gray-200 text-gray-600 shadow-xs'
                }`}
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4
              className={`font-semibold mb-4 text-sm uppercase tracking-wider transition-colors ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {t('shop')}
            </h4>
            <ul className="space-y-2.5">
              {[t('home'), t('shop'), t('categories'), t('howItWorks')].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className={`text-sm transition-colors duration-300 ${
                      isDark ? 'text-[#A5A5AD] hover:text-white' : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className={`font-semibold mb-4 text-sm uppercase tracking-wider transition-colors ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {t('contact')}
            </h4>
            <ul className="space-y-2.5">
              {[t('deliveryInfo'), t('faq'), t('privacy'), t('terms')].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className={`text-sm transition-colors duration-300 ${
                      isDark ? 'text-[#A5A5AD] hover:text-white' : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors ${
            isDark ? 'border-white/5 text-[#A5A5AD]' : 'border-gray-200 text-gray-500'
          }`}
        >
          <p className="text-xs">© 2024 Kima Unboxing. All rights reserved.</p>
          <p className="text-xs flex items-center gap-1">
            Made with <Heart size={12} className="text-[#F34D83]" /> in Morocco
          </p>
        </div>
      </div>
    </footer>
  );
}
