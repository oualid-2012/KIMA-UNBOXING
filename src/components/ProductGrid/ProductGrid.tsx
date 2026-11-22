import { useBoxStore } from '../../store/boxStore';
import { products } from '../../data/products';
import ProductCard from '../ProductCard/ProductCard';
import { useTranslation } from '../../hooks/useTranslation';
import { motion } from 'framer-motion';

export default function ProductGrid() {
  const { activeCategory, theme } = useBoxStore();
  const { isRtl } = useTranslation();
  const isDark = theme === 'dark';

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        layout
        className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
      >
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className={`text-center py-20 ${isDark ? 'text-[#A5A5AD]' : 'text-gray-500'}`}>
          <p className="text-lg">Aucun produit dans cette catégorie.</p>
        </div>
      )}
    </div>
  );
}
