import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Package } from 'lucide-react';
import { useBoxStore } from '../../store/boxStore';
import { useTranslation } from '../../hooks/useTranslation';
import BoxCapacityBar from '../UI/BoxCapacityBar';

export default function MyBox() {
  const {
    items,
    isBoxOpen,
    setBoxOpen,
    removeItem,
    updateQuantity,
    clearBox,
    totalItems,
    totalPrice,
    setCheckoutOpen,
  } = useBoxStore();
  const { t, isRtl, language } = useTranslation();

  return (
    <AnimatePresence>
      {isBoxOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setBoxOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: isRtl ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRtl ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            dir={isRtl ? 'rtl' : 'ltr'}
            className={`fixed top-0 ${isRtl ? 'left-0' : 'right-0'} w-full max-w-md h-full bg-[#18191F] z-50 flex flex-col border-${isRtl ? 'r' : 'l'} border-white/5`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#F34D83] to-[#D92968] rounded-xl flex items-center justify-center">
                  <Package size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold">{t('myBox')}</h3>
                  <p className="text-[#A5A5AD] text-xs">{totalItems()} {t('products')}</p>
                </div>
              </div>
              <button
                onClick={() => setBoxOpen(false)}
                className="text-[#A5A5AD] hover:text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Capacity bar */}
            <div className="px-5 py-3 border-b border-white/5">
              <BoxCapacityBar />
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-[#A5A5AD]/30 mb-4" />
                  <h4 className="text-white font-semibold mb-2">{t('boxEmpty')}</h4>
                  <p className="text-[#A5A5AD] text-sm max-w-xs">{t('boxEmptyMsg')}</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    className="flex gap-3 bg-white/5 rounded-xl p-3 border border-white/5"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 bg-[#101114] rounded-lg flex-shrink-0 p-1.5">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-medium truncate">
                        {language === 'ar' ? item.product.nameAr : item.product.name}
                      </h4>
                      <p className="text-[#F34D83] text-sm font-bold mt-0.5">
                        {item.product.price} {t('mad')}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-[#A5A5AD] hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-white text-sm w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-[#A5A5AD] hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-[#A5A5AD] hover:text-red-400 p-1.5 hover:bg-red-400/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Item total */}
                    <div className="text-right flex-shrink-0">
                      <span className="text-white text-sm font-bold">
                        {item.product.price * item.quantity}
                      </span>
                      <span className="text-[#A5A5AD] text-xs block">{t('mad')}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-white/5 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-[#A5A5AD]">{t('total')}</span>
                  <span className="text-white text-xl font-black">
                    {totalPrice()} <span className="text-sm text-[#A5A5AD]">{t('mad')}</span>
                  </span>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setBoxOpen(false);
                      setCheckoutOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#F34D83] to-[#D92968] text-white py-3.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-[#F34D83]/30 transition-all duration-300"
                  >
                    <span>{t('proceedToCheckout')}</span>
                    <ArrowRight size={16} />
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setBoxOpen(false)}
                      className="flex-1 py-2.5 rounded-xl text-sm text-[#A5A5AD] hover:text-white border border-white/10 hover:border-white/20 transition-all"
                    >
                      {t('continueShopping')}
                    </button>
                    <button
                      onClick={clearBox}
                      className="px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-400/10 border border-red-400/20 transition-all"
                    >
                      {t('emptyBox')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
