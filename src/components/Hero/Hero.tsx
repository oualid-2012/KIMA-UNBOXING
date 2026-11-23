import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useBoxStore } from '../../store/boxStore';

export default function Hero() {
  const { t, isRtl } = useTranslation();
  const { theme } = useBoxStore();
  const isDark = theme === 'dark';

  const floatingProducts = [
    { src: '/Produit 1.png', x: -280, y: -60, delay: 0, size: 90 },
    { src: '/Produit 3.png', x: -220, y: 100, delay: 0.3, size: 75 },
    { src: '/Produit 5.png', x: 220, y: -80, delay: 0.6, size: 85 },
    { src: '/Produit 7.png', x: 260, y: 80, delay: 0.9, size: 70 },
    { src: '/Produit 9.png', x: -160, y: -150, delay: 1.2, size: 65 },
    { src: '/Produit 14.png', x: 180, y: 160, delay: 0.4, size: 60 },
  ];

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-20 transition-colors duration-300 ${
        isDark ? 'bg-[#101114]' : 'bg-[#FAF9F6]'
      }`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] transition-opacity duration-500 ${
            isDark ? 'bg-[#F34D83]/10' : 'bg-[#F34D83]/15'
          }`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] transition-opacity duration-500 ${
            isDark ? 'bg-[#D92968]/10' : 'bg-[#D92968]/15'
          }`}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-start"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 border transition-colors ${
                isDark
                  ? 'bg-white/5 border-white/10 text-[#A5A5AD]'
                  : 'bg-pink-50 border-pink-200/80 text-pink-700'
              }`}
            >
              <Sparkles size={14} className="text-[#F34D83]" />
              <span className="text-xs uppercase tracking-widest font-semibold">Kima Unboxing</span>
            </motion.div>

            <h1
              className={`text-4xl sm:text-5xl lg:text-7xl font-black leading-tight mb-6 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-950'
              }`}
            >
              {t('buildYourBox')
                .split(' ')
                .map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`inline-block mr-3 ${
                      i === t('buildYourBox').split(' ').length - 1
                        ? 'bg-gradient-to-r from-[#F34D83] to-[#D92968] bg-clip-text text-transparent'
                        : ''
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className={`text-base sm:text-lg max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed transition-colors duration-300 ${
                isDark ? 'text-[#A5A5AD]' : 'text-gray-600'
              }`}
            >
              {t('heroSubtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#shop"
                className="group relative px-8 py-4 bg-gradient-to-r from-[#F34D83] to-[#D92968] text-white rounded-full font-bold text-sm uppercase tracking-wider overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#F34D83]/30 hover:scale-105 text-center"
              >
                <span className="relative z-10">{t('startBuilding')}</span>
              </a>
              <a
                href="#shop"
                className={`px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:border-[#F34D83]/50 text-center border ${
                  isDark
                    ? 'border-white/20 text-white hover:bg-white/5'
                    : 'border-gray-300 text-gray-800 hover:bg-gray-100 hover:text-black'
                }`}
              >
                {t('exploreProducts')}
              </a>
            </motion.div>
          </motion.div>

          {/* Right visual — floating products around box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative flex items-center justify-center min-h-[400px] lg:min-h-[500px]"
          >
            {/* Glow behind box */}
            <div className="absolute w-64 h-64 bg-[#F34D83]/20 rounded-full blur-[80px]" />

            {/* Central luxury emblem */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10"
            >
              <div className="w-48 h-48 sm:w-56 sm:h-56 relative flex items-center justify-center">
                {/* Glowing border ring */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F34D83] to-[#D92968] rounded-3xl shadow-2xl shadow-[#F34D83]/30 rotate-6" />
                <div
                  className={`absolute inset-1.5 rounded-2xl flex flex-col items-center justify-center p-6 transition-colors border ${
                    isDark
                      ? 'bg-[#18191F] border-white/10'
                      : 'bg-white border-pink-100 shadow-xl'
                  }`}
                >
                  <img
                    src={isDark ? '/LG-rosee.rose.webp' : '/LG-Black.rose.webp'}
                    alt="Kima"
                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-md"
                  />
                  <span className="text-[10px] tracking-widest font-black uppercase text-[#F34D83] mt-1">
                    Kima Unboxing
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Floating products */}
            {floatingProducts.map((p, i) => (
              <motion.div
                key={i}
                className="absolute hidden sm:block"
                style={{ left: `calc(50% + ${p.x}px)`, top: `calc(50% + ${p.y}px)` }}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeInOut',
                }}
              >
                <div
                  className={`backdrop-blur-sm rounded-2xl p-2 transition-colors duration-300 border ${
                    isDark
                      ? 'bg-white/5 border-white/10 shadow-xl'
                      : 'bg-white/95 border-gray-200 shadow-xl'
                  }`}
                  style={{ width: p.size, height: p.size }}
                >
                  <img
                    src={p.src}
                    alt=""
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className={isDark ? 'text-[#A5A5AD]' : 'text-gray-400'} size={20} />
      </motion.div>
    </section>
  );
}
