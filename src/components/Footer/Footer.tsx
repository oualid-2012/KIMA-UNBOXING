import { MessageCircle, Mail, Heart } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export default function Footer() {
  const { t, isRtl } = useTranslation();

  return (
    <footer className="bg-[#0a0b0d] border-t border-white/5 py-12" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <img src="/LG-rosee.rose.webp" alt="Kima Unboxing" className="h-12 mb-4" />
            <p className="text-[#A5A5AD] text-sm leading-relaxed max-w-sm mb-6">
              {isRtl
                ? 'كيما أنبوكسينغ — أول تجربة تسوق تفاعلية في المغرب. اختر منتجاتك وصمم صندوقك الخاص!'
                : 'Kima Unboxing — La première expérience shopping interactive au Maroc. Choisissez vos produits et construisez votre propre box !'}
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A5A5AD] hover:text-[#F34D83] hover:border-[#F34D83]/30 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A5A5AD] hover:text-green-400 hover:border-green-400/30 transition-all duration-300"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="mailto:contact@kimaunboxing.com"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A5A5AD] hover:text-white hover:border-white/30 transition-all duration-300"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('shop')}</h4>
            <ul className="space-y-2.5">
              {[t('home'), t('shop'), t('categories'), t('howItWorks')].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[#A5A5AD] hover:text-white text-sm transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('contact')}</h4>
            <ul className="space-y-2.5">
              {[t('deliveryInfo'), t('faq'), t('privacy'), t('terms')].map((link) => (
                <li key={link}>
                  <a href="#" className="text-[#A5A5AD] hover:text-white text-sm transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#A5A5AD] text-xs">
            © 2024 Kima Unboxing. All rights reserved.
          </p>
          <p className="text-[#A5A5AD] text-xs flex items-center gap-1">
            Made with <Heart size={12} className="text-[#F34D83]" /> in Morocco
          </p>
        </div>
      </div>
    </footer>
  );
}
