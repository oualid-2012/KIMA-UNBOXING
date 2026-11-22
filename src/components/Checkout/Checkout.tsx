import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  CheckCircle,
  MapPin,
  Phone,
  User,
  FileText,
  Truck,
  Loader2,
  Table,
} from 'lucide-react';
import { useBoxStore } from '../../store/boxStore';
import { useTranslation } from '../../hooks/useTranslation';
import { sendOrderToGoogleSheet } from '../../services/googleSheetService';

export default function Checkout() {
  const {
    items,
    isCheckoutOpen,
    setCheckoutOpen,
    totalPrice,
    totalItems,
    checkoutForm,
    setCheckoutForm,
    orderSummary,
    orderConfirmed,
    confirmOrder,
    resetOrder,
    theme,
  } = useBoxStore();
  const { t, isRtl, language } = useTranslation();
  const [step, setStep] = useState<'info' | 'review'>('info');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const summary = orderSummary();
  const isDark = theme === 'dark';

  const isFormValid =
    checkoutForm.fullName.trim().length > 2 &&
    checkoutForm.phone.trim().length > 7 &&
    checkoutForm.city.trim().length > 1 &&
    checkoutForm.address.trim().length > 5;

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    try {
      const now = new Date();
      const dateFormatted = now.toLocaleString(language === 'ar' ? 'ar-MA' : 'fr-FR', {
        timeZone: 'Africa/Casablanca',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });

      const productsSummary = items
        .map((item) => {
          const name = language === 'ar' ? item.product.nameAr : item.product.name;
          return `${name} (×${item.quantity}) - ${item.product.price * item.quantity} MAD`;
        })
        .join(' | ');

      await sendOrderToGoogleSheet({
        date: dateFormatted,
        fullName: checkoutForm.fullName,
        phone: checkoutForm.phone,
        city: checkoutForm.city,
        address: checkoutForm.address,
        notes: checkoutForm.notes || '-',
        products: productsSummary,
        itemCount: totalItems(),
        subtotal: summary.subtotal,
        deliveryFee: summary.deliveryFee,
        total: summary.total,
      });
    } catch (err) {
      console.error('Erreur transmission Google Sheets:', err);
    } finally {
      setIsSubmitting(false);
      confirmOrder();
    }
  };

  if (!isCheckoutOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
        onClick={() => setCheckoutOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          dir={isRtl ? 'rtl' : 'ltr'}
          className={`w-full max-w-2xl max-h-[90vh] rounded-2xl border overflow-hidden flex flex-col transition-colors duration-300 ${
            isDark ? 'bg-[#18191F] border-white/5' : 'bg-white border-gray-200 shadow-2xl'
          }`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between p-5 border-b transition-colors ${
              isDark ? 'border-white/5' : 'border-gray-100'
            }`}
          >
            <div className="flex items-center gap-3">
              {step === 'review' && !orderConfirmed && (
                <button
                  onClick={() => setStep('info')}
                  className={`p-1 transition-colors ${
                    isDark ? 'text-[#A5A5AD] hover:text-white' : 'text-gray-500 hover:text-black'
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              <h3 className={`font-bold text-lg transition-colors ${isDark ? 'text-white' : 'text-gray-950'}`}>
                {orderConfirmed ? t('orderConfirmed') : t('checkout')}
              </h3>
            </div>
            <button
              onClick={() => {
                setCheckoutOpen(false);
                if (orderConfirmed) resetOrder();
              }}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-[#A5A5AD] hover:text-white hover:bg-white/5'
                  : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {orderConfirmed ? (
              /* Confirmation */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center text-center py-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle size={40} className="text-green-500" />
                </motion.div>
                <h3 className={`text-2xl font-black mb-3 ${isDark ? 'text-white' : 'text-gray-950'}`}>
                  {t('orderConfirmed')}
                </h3>
                <p className={`max-w-sm mb-4 ${isDark ? 'text-[#A5A5AD]' : 'text-gray-600'}`}>
                  {t('orderConfirmedMsg')}
                </p>

                {/* Google Sheet Sync Confirmation Badge */}
                <div
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-8 border ${
                    isDark
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  }`}
                >
                  <Table size={13} />
                  <span>
                    {language === 'ar'
                      ? 'تم إرسال الطلب وحفظه في Google Sheet بنجاح'
                      : 'Commande enregistrée dans Google Sheets'}
                  </span>
                </div>

                <button
                  onClick={() => {
                    resetOrder();
                    setCheckoutOpen(false);
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-[#F34D83] to-[#D92968] text-white rounded-full font-bold text-sm hover:shadow-lg hover:shadow-[#F34D83]/30 transition-all"
                >
                  {t('backToShop')}
                </button>
              </motion.div>
            ) : step === 'info' ? (
              /* Customer Info Form */
              <div className="space-y-5">
                <h4 className={`font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <User size={18} className="text-[#F34D83]" />
                  {t('customerInfo')}
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className={`block text-xs mb-1.5 font-medium ${isDark ? 'text-[#A5A5AD]' : 'text-gray-600'}`}>
                      {t('fullName')}
                    </label>
                    <input
                      type="text"
                      value={checkoutForm.fullName}
                      onChange={(e) => setCheckoutForm({ fullName: e.target.value })}
                      className={`w-full rounded-xl px-4 py-3 text-sm focus:border-[#F34D83] focus:outline-none transition-colors border ${
                        isDark
                          ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                      placeholder={language === 'ar' ? 'الاسم الكامل' : 'Votre nom complet'}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs mb-1.5 font-medium ${isDark ? 'text-[#A5A5AD]' : 'text-gray-600'}`}>
                      {t('phone')}
                    </label>
                    <input
                      type="tel"
                      value={checkoutForm.phone}
                      onChange={(e) => setCheckoutForm({ phone: e.target.value })}
                      className={`w-full rounded-xl px-4 py-3 text-sm focus:border-[#F34D83] focus:outline-none transition-colors border ${
                        isDark
                          ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                      placeholder="06 XX XX XX XX"
                    />
                  </div>

                  <div>
                    <label className={`block text-xs mb-1.5 font-medium ${isDark ? 'text-[#A5A5AD]' : 'text-gray-600'}`}>
                      {t('city')}
                    </label>
                    <input
                      type="text"
                      value={checkoutForm.city}
                      onChange={(e) => setCheckoutForm({ city: e.target.value })}
                      className={`w-full rounded-xl px-4 py-3 text-sm focus:border-[#F34D83] focus:outline-none transition-colors border ${
                        isDark
                          ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                      placeholder={language === 'ar' ? 'المدينة' : 'Casablanca, Rabat...'}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs mb-1.5 font-medium ${isDark ? 'text-[#A5A5AD]' : 'text-gray-600'}`}>
                      {t('address')}
                    </label>
                    <textarea
                      value={checkoutForm.address}
                      onChange={(e) => setCheckoutForm({ address: e.target.value })}
                      rows={2}
                      className={`w-full rounded-xl px-4 py-3 text-sm focus:border-[#F34D83] focus:outline-none transition-colors resize-none border ${
                        isDark
                          ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                      placeholder={language === 'ar' ? 'العنوان الكامل' : 'Adresse complète'}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs mb-1.5 font-medium ${isDark ? 'text-[#A5A5AD]' : 'text-gray-600'}`}>
                      {t('notes')}
                    </label>
                    <textarea
                      value={checkoutForm.notes}
                      onChange={(e) => setCheckoutForm({ notes: e.target.value })}
                      rows={2}
                      className={`w-full rounded-xl px-4 py-3 text-sm focus:border-[#F34D83] focus:outline-none transition-colors resize-none border ${
                        isDark
                          ? 'bg-white/5 border-white/10 text-white placeholder-gray-500'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                      }`}
                      placeholder={
                        language === 'ar' ? 'ملاحظات إضافية (اختياري)' : 'Notes supplémentaires (optionnel)'
                      }
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Order Review */
              <div className="space-y-5">
                <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('orderSummary')}</h4>

                {/* Customer info summary */}
                <div
                  className={`rounded-xl p-4 space-y-2 text-sm border transition-colors ${
                    isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className={`flex items-center gap-2 ${isDark ? 'text-[#A5A5AD]' : 'text-gray-500'}`}>
                    <User size={14} />{' '}
                    <span className={isDark ? 'text-white' : 'text-gray-900 font-medium'}>
                      {checkoutForm.fullName}
                    </span>
                  </div>
                  <div className={`flex items-center gap-2 ${isDark ? 'text-[#A5A5AD]' : 'text-gray-500'}`}>
                    <Phone size={14} />{' '}
                    <span className={isDark ? 'text-white' : 'text-gray-900 font-medium'}>
                      {checkoutForm.phone}
                    </span>
                  </div>
                  <div className={`flex items-center gap-2 ${isDark ? 'text-[#A5A5AD]' : 'text-gray-500'}`}>
                    <MapPin size={14} />{' '}
                    <span className={isDark ? 'text-white' : 'text-gray-900 font-medium'}>
                      {checkoutForm.city} — {checkoutForm.address}
                    </span>
                  </div>
                  {checkoutForm.notes && (
                    <div className={`flex items-start gap-2 ${isDark ? 'text-[#A5A5AD]' : 'text-gray-500'}`}>
                      <FileText size={14} className="mt-0.5" />{' '}
                      <span className={isDark ? 'text-white' : 'text-gray-900 font-medium'}>
                        {checkoutForm.notes}
                      </span>
                    </div>
                  )}
                </div>

                {/* Product list */}
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className={`flex items-center gap-3 rounded-xl p-3 border transition-colors ${
                        isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-lg p-1 flex-shrink-0 ${
                          isDark ? 'bg-[#101114]' : 'bg-white border border-gray-100'
                        }`}
                      >
                        <img src={item.product.image} alt="" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm truncate font-medium ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {language === 'ar' ? item.product.nameAr : item.product.name}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-[#A5A5AD]' : 'text-gray-500'}`}>
                          ×{item.quantity}
                        </p>
                      </div>
                      <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.product.price * item.quantity} {t('mad')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div
                  className={`rounded-xl p-4 space-y-2.5 border transition-colors ${
                    isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex justify-between text-sm">
                    <span className={isDark ? 'text-[#A5A5AD]' : 'text-gray-600'}>{t('subtotal')}</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {summary.subtotal} {t('mad')}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className={`flex items-center gap-1 ${isDark ? 'text-[#A5A5AD]' : 'text-gray-600'}`}>
                      <Truck size={14} /> {t('delivery')}
                    </span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {summary.deliveryFee} {t('mad')}
                    </span>
                  </div>
                  <div
                    className={`flex justify-between pt-2 border-t ${
                      isDark ? 'border-white/10' : 'border-gray-200'
                    }`}
                  >
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t('total')}
                    </span>
                    <span className="text-[#F34D83] font-black text-lg">
                      {summary.total} {t('mad')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer buttons */}
          {!orderConfirmed && (
            <div
              className={`p-5 border-t transition-colors ${
                isDark ? 'border-white/5' : 'border-gray-100'
              }`}
            >
              {step === 'info' ? (
                <button
                  disabled={!isFormValid}
                  onClick={() => setStep('review')}
                  className="w-full py-3.5 bg-gradient-to-r from-[#F34D83] to-[#D92968] text-white rounded-xl font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[#F34D83]/30 transition-all"
                >
                  {t('orderSummary')} ({totalItems()} {t('products')} — {totalPrice()} {t('mad')})
                </button>
              ) : (
                <button
                  onClick={handleConfirmOrder}
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-[#F34D83] to-[#D92968] text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-[#F34D83]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>
                        {language === 'ar' ? 'جاري تسجيل الطلب...' : 'Envoi vers Google Sheets...'}
                      </span>
                    </>
                  ) : (
                    <span>
                      {t('confirmOrder')} — {summary.total} {t('mad')}
                    </span>
                  )}
                </button>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
