import { motion } from 'framer-motion';
import { Plus, Check, Package } from 'lucide-react';
import type { Product } from '../../types';
import { useBoxStore } from '../../store/boxStore';
import { useTranslation } from '../../hooks/useTranslation';
import { useDraggable } from '@dnd-kit/core';
import { useState } from 'react';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem, isBoxFull, items, theme } = useBoxStore();
  const { t, language } = useTranslation();
  const [justAdded, setJustAdded] = useState(false);
  const inBox = items.some((i) => i.product.id === product.id);
  const isDark = theme === 'dark';

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: product.id,
    data: { product },
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        zIndex: 1000,
        opacity: isDragging ? 0.8 : 1,
      }
    : undefined;

  const handleAdd = () => {
    if (isBoxFull()) return;
    const success = addItem(product);
    if (success) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1200);
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 cursor-grab active:cursor-grabbing ${
        isDark
          ? 'bg-[#18191F] border-white/5 hover:border-[#F34D83]/30'
          : 'bg-white border-gray-200/90 hover:border-[#F34D83]/40 shadow-xs hover:shadow-lg'
      }`}
    >
      {/* Image */}
      <div
        className={`relative aspect-square p-4 sm:p-6 flex items-center justify-center overflow-hidden transition-colors ${
          isDark
            ? 'bg-gradient-to-b from-[#1e1f26] to-[#18191F]'
            : 'bg-gradient-to-b from-[#FFF5F7] to-[#FAF9F6]'
        }`}
      >
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain drop-shadow-md"
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.3 }}
        />

        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 backdrop-blur-sm text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold ${
            isDark ? 'bg-white/10 text-[#A5A5AD]' : 'bg-black/5 text-gray-700'
          }`}
        >
          {product.category}
        </span>

        {inBox && (
          <div className="absolute top-3 right-3 bg-[#F34D83] text-white p-1.5 rounded-full shadow-xs">
            <Package size={12} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        <h3
          className={`font-semibold text-xs sm:text-sm leading-tight line-clamp-2 transition-colors ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          {language === 'ar' ? product.nameAr : product.name}
        </h3>

        <div className="flex items-center justify-between gap-2">
          <span className="text-[#F34D83] font-bold text-sm sm:text-lg">
            {product.price}{' '}
            <span className={`text-[10px] sm:text-xs font-normal ${isDark ? 'text-[#A5A5AD]' : 'text-gray-500'}`}>
              {t('mad')}
            </span>
          </span>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleAdd();
            }}
            disabled={isBoxFull() && !inBox}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold transition-all duration-300 ${
              justAdded
                ? 'bg-green-500 text-white'
                : isBoxFull() && !inBox
                ? isDark
                  ? 'bg-white/5 text-[#A5A5AD] cursor-not-allowed'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#F34D83] to-[#D92968] text-white hover:shadow-lg hover:shadow-[#F34D83]/20'
            }`}
          >
            {justAdded ? <Check size={12} /> : <Plus size={12} />}
            <span className="hidden sm:inline">{justAdded ? '✓' : t('addToBox')}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
