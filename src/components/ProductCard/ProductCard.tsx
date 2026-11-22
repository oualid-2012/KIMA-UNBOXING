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
  const { addItem, isBoxFull, items } = useBoxStore();
  const { t, language } = useTranslation();
  const [justAdded, setJustAdded] = useState(false);
  const inBox = items.some((i) => i.product.id === product.id);

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
      className="group relative bg-[#18191F] rounded-2xl overflow-hidden border border-white/5 hover:border-[#F34D83]/30 transition-all duration-300 cursor-grab active:cursor-grabbing"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-b from-[#1e1f26] to-[#18191F] p-4 sm:p-6 flex items-center justify-center overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain drop-shadow-xl"
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.3 }}
        />

        {/* Category badge */}
        <span className="absolute top-3 left-3 bg-white/10 backdrop-blur-sm text-[10px] text-[#A5A5AD] px-2.5 py-1 rounded-full uppercase tracking-wider">
          {product.category}
        </span>

        {inBox && (
          <div className="absolute top-3 right-3 bg-[#F34D83] text-white p-1.5 rounded-full">
            <Package size={12} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        <h3 className="text-white font-semibold text-xs sm:text-sm leading-tight line-clamp-2">
          {language === 'ar' ? product.nameAr : product.name}
        </h3>

        <div className="flex items-center justify-between gap-2">
          <span className="text-[#F34D83] font-bold text-sm sm:text-lg">
            {product.price} <span className="text-[10px] sm:text-xs font-normal text-[#A5A5AD]">{t('mad')}</span>
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
                ? 'bg-white/5 text-[#A5A5AD] cursor-not-allowed'
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
