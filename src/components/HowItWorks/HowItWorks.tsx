import { motion } from 'framer-motion';
import { Search, Box, Gift } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useBoxStore } from '../../store/boxStore';

const steps = [
  { icon: Search, num: '01' },
  { icon: Box, num: '02' },
  { icon: Gift, num: '03' },
];

export default function HowItWorks() {
  const { t, isRtl } = useTranslation();
  const { theme } = useBoxStore();
  const isDark = theme === 'dark';

  const titles = [t('step1Title'), t('step2Title'), t('step3Title')];
  const descs = [t('step1Desc'), t('step2Desc'), t('step3Desc')];

  return (
    <section
      id="how-it-works"
      className={`py-20 md:py-28 transition-colors duration-300 ${
        isDark ? 'bg-[#101114]' : 'bg-[#FAF9F6]'
      }`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className={`text-3xl sm:text-4xl font-black mb-4 transition-colors ${
              isDark ? 'text-white' : 'text-gray-950'
            }`}
          >
            {t('howItWorks')}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#F34D83] to-[#D92968] mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative text-center group"
              >
                {/* Connector line */}
                {i < 2 && (
                  <div
                    className={`hidden md:block absolute top-16 left-[60%] right-[-40%] h-px bg-gradient-to-r ${
                      isDark ? 'from-[#F34D83]/30' : 'from-[#F34D83]/40'
                    } to-transparent`}
                  />
                )}

                <div className="relative inline-flex items-center justify-center w-28 h-28 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#F34D83]/20 to-[#D92968]/10 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
                  <div
                    className={`relative border rounded-2xl w-full h-full flex flex-col items-center justify-center transition-all duration-500 ${
                      isDark
                        ? 'bg-[#18191F] border-white/5 group-hover:border-[#F34D83]/30'
                        : 'bg-white border-gray-200/90 shadow-md group-hover:border-[#F34D83]/40'
                    }`}
                  >
                    <span className="text-[#F34D83] text-xs font-mono mb-1 font-bold">{step.num}</span>
                    <Icon size={28} className={isDark ? 'text-white' : 'text-gray-900'} />
                  </div>
                </div>

                <h3 className={`font-bold text-lg mb-2 transition-colors ${isDark ? 'text-white' : 'text-gray-950'}`}>
                  {titles[i]}
                </h3>
                <p
                  className={`text-sm leading-relaxed max-w-xs mx-auto transition-colors ${
                    isDark ? 'text-[#A5A5AD]' : 'text-gray-600'
                  }`}
                >
                  {descs[i]}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
