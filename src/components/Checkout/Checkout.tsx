import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, CheckCircle, MapPin, Phone, User, FileText, Truck } from 'lucide-react';
import { useBoxStore } from '../../store/boxStore';
import { useTranslation } from '../../hooks/useTranslation';

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
  } = useBoxStore();
  const { t, isRtl, language } = useTranslation();
  const [step, setStep] = useState<'info' | 'review'>('info');
  const summary = orderSummary();

  const isFormValid =
    checkoutForm.fullName.trim().length > 2 &&
    checkoutForm.phone.trim().length > 7 &&
    checkoutForm.city.trim().length > 1 &&
    checkoutForm.address.trim().length > 5;

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
          className="w-full max-w-2xl max-h-[90vh] bg-[#18191F] rounded-2xl border border-white/5 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <div className="flex items-center gap-3">
              {step === 'review' && !orderConfirmed && (
                <button
                  onClick={() => setStep('info')}
                  className="text-[#A5A5AD] hover:text-white p-1"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              <h3 className="text-white font-bold text-lg">
                {orderConfirmed ? t('orderConfirmed') : t('checkout')}
              </h3>
            </div>
            <button
              onClick={() => {
                setCheckoutOpen(false);
                if (orderConfirmed) resetOrder();
              }}
              className="text-[#A5A5AD] hover:text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
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
                <h3 className="text-white text-2xl font-black mb-3">{t('orderConfirmed')}</h3>
                <p className="text-[#A5A5AD] max-w-sm mb-8">{t('orderConfirmedMsg')}</p>
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
                <h4 className="text-white font-semibold flex items-center gap-2">
                  <User size={18} className="text-[#F34D83]" />
                  {t('customerInfo')}
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[#A5A5AD] text-xs mb-1.5">{t('fullName')}</label>
                    <input
                      type="text"
                      value={checkoutForm.fullName}
                      onChange={(e) => setCheckoutForm({ fullName: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F34D83] focus:outline-none transition-colors"
                      placeholder={language === 'ar' ? 'الاسم الكامل' : 'Votre nom complet'}
                    />
                  </div>

                  <div>
                    <label className="block text-[#A5A5AD] text-xs mb-1.5">{t('phone')}</label>
                    <input
                      type="tel"
                      value={checkoutForm.phone}
                      onChange={(e) => setCheckoutForm({ phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F34D83] focus:outline-none transition-colors"
                      placeholder="06 XX XX XX XX"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A5A5AD] text-xs mb-1.5">{t('city')}</label>
                    <input
                      type="text"
                      value={checkoutForm.city}
                      onChange={(e) => setCheckoutForm({ city: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F34D83] focus:outline-none transition-colors"
                      placeholder={language === 'ar' ? 'المدينة' : 'Casablanca, Rabat...'}
                    />
                  </div>

                  <div>
                    <label className="block text-[#A5A5AD] text-xs mb-1.5">{t('address')}</label>
                    <textarea
                      value={checkoutForm.address}
                      onChange={(e) => setCheckoutForm({ address: e.target.value })}
                      rows={2}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F34D83] focus:outline-none transition-colors resize-none"
                      placeholder={language === 'ar' ? 'العنوان الكامل' : 'Adresse complète'}
                    />
                  </div>

                  <div>
                    <label className="block text-[#A5A5AD] text-xs mb-1.5">{t('notes')}</label>
                    <textarea
                      value={checkoutForm.notes}
                      onChange={(e) => setCheckoutForm({ notes: e.target.value })}
                      rows={2}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#F34D83] focus:outline-none transition-colors resize-none"
                      placeholder={language === 'ar' ? 'ملاحظات إضافية (اختياري)' : 'Notes supplémentaires (optionnel)'}
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Order Review */
              <div className="space-y-5">
                <h4 className="text-white font-semibold">{t('orderSummary')}</h4>

                {/* Customer info summary */}
                <div className="bg-white/5 rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[#A5A5AD]">
                    <User size={14} /> <span className="text-white">{checkoutForm.fullName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#A5A5AD]">
                    <Phone size={14} /> <span className="text-white">{checkoutForm.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#A5A5AD]">
                    <MapPin size={14} /> <span className="text-white">{checkoutForm.city} — {checkoutForm.address}</span>
                  </div>
                  {checkoutForm.notes && (
                    <div className="flex items-start gap-2 text-[#A5A5AD]">
                      <FileText size={14} className="mt-0.5" /> <span className="text-white">{checkoutForm.notes}</span>
                    </div>
                  )}
                </div>

                {/* Product list */}
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                      <div className="w-12 h-12 bg-[#101114] rounded-lg p-1 flex-shrink-0">
                        <img src={item.product.image} alt="" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">
                          {language === 'ar' ? item.product.nameAr : item.product.name}
                        </p>
                        <p className="text-[#A5A5AD] text-xs">×{item.quantity}</p>
                      </div>
                      <span className="text-white text-sm font-semibold">
                        {item.product.price * item.quantity} {t('mad')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="bg-white/5 rounded-xl p-4 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A5A5AD]">{t('subtotal')}</span>
                    <span className="text-white">{summary.subtotal} {t('mad')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A5A5AD] flex items-center gap-1">
                      <Truck size={14} /> {t('delivery')}
                    </span>
                    <span className="text-white">{summary.deliveryFee} {t('mad')}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <span className="text-white font-bold">{t('total')}</span>
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
            <div className="p-5 border-t border-white/5">
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
                  onClick={confirmOrder}
                  className="w-full py-3.5 bg-gradient-to-r from-[#F34D83] to-[#D92968] text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-[#F34D83]/30 transition-all"
                >
                  {t('confirmOrder')} — {summary.total} {t('mad')}
                </button>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
