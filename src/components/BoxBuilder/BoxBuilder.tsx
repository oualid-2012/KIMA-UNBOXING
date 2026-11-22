import { Suspense, lazy } from 'react';
import { DndContext, DragOverlay, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { useBoxStore } from '../../store/boxStore';
import { useTranslation } from '../../hooks/useTranslation';
import type { Product } from '../../types';
import ProductGrid from '../ProductGrid/ProductGrid';
import Categories from '../Categories/Categories';
import BoxCapacityBar from '../UI/BoxCapacityBar';
import { motion } from 'framer-motion';
import { Box, Package } from 'lucide-react';
import { useState } from 'react';

const ThreeDBox = lazy(() => import('../ThreeDBox/ThreeDBox'));

export default function BoxBuilder() {
  const { addItem, totalItems, totalPrice, setDraggingOver, isDraggingOver, theme } = useBoxStore();
  const { t, isRtl } = useTranslation();
  const [activeDragProduct, setActiveDragProduct] = useState<Product | null>(null);
  const isDark = theme === 'dark';

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 8 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 5 },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  const handleDragStart = (event: any) => {
    const product = event.active.data?.current?.product;
    if (product) setActiveDragProduct(product);
  };

  const handleDragOver = (event: any) => {
    if (event.over?.id === 'box-drop-zone') {
      setDraggingOver(true);
    } else {
      setDraggingOver(false);
    }
  };

  const handleDragEnd = (event: any) => {
    setDraggingOver(false);
    setActiveDragProduct(null);
    if (event.over?.id === 'box-drop-zone') {
      const product = event.active.data?.current?.product as Product | undefined;
      if (product) {
        addItem(product);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <section
        id="shop"
        className={`py-12 md:py-20 transition-colors duration-300 ${
          isDark ? 'bg-[#101114]' : 'bg-[#FAF9F6]'
        }`}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className={`text-3xl sm:text-4xl font-black mb-4 transition-colors ${
                isDark ? 'text-white' : 'text-gray-950'
              }`}
            >
              {t('buildYourBox')}
            </h2>
            <p className={`max-w-lg mx-auto transition-colors ${isDark ? 'text-[#A5A5AD]' : 'text-gray-600'}`}>
              {t('heroSubtitle')}
            </p>
          </motion.div>

          {/* Categories */}
          <Categories />

          {/* Two-column layout: products + 3D box */}
          <div className="mt-8 grid lg:grid-cols-5 gap-8">
            {/* Products — 3 cols */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <ProductGrid />
            </div>

            {/* 3D box — 2 cols, sticky */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="lg:sticky lg:top-24 space-y-4">
                {/* 3D Box */}
                <DropZone isDraggingOver={isDraggingOver} isDark={isDark}>
                  <Suspense
                    fallback={
                      <div className="w-full h-[400px] flex items-center justify-center">
                        <div
                          className={`flex flex-col items-center gap-3 ${
                            isDark ? 'text-[#A5A5AD]' : 'text-gray-500'
                          }`}
                        >
                          <Box size={40} className="text-[#F34D83] animate-pulse" />
                          <span className="text-sm font-medium">Loading 3D Box...</span>
                        </div>
                      </div>
                    }
                  >
                    <ThreeDBox />
                  </Suspense>
                </DropZone>

                {/* Box stats */}
                <div
                  className={`border rounded-2xl p-5 space-y-4 transition-colors duration-300 ${
                    isDark
                      ? 'bg-[#18191F] border-white/5'
                      : 'bg-white border-gray-200/90 shadow-md'
                  }`}
                >
                  <BoxCapacityBar />

                  <div
                    className={`flex items-center justify-between pt-2 border-t transition-colors ${
                      isDark ? 'border-white/5' : 'border-gray-100'
                    }`}
                  >
                    <div
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        isDark ? 'text-[#A5A5AD]' : 'text-gray-600'
                      }`}
                    >
                      <Package size={16} />
                      <span>
                        {totalItems()} {t('itemsInBox')}
                      </span>
                    </div>
                    <span
                      className={`font-bold text-lg transition-colors ${
                        isDark ? 'text-white' : 'text-gray-950'
                      }`}
                    >
                      {totalPrice()}{' '}
                      <span className={`text-xs ${isDark ? 'text-[#A5A5AD]' : 'text-gray-500'}`}>
                        {t('mad')}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Drag overlay */}
      <DragOverlay>
        {activeDragProduct && (
          <div
            className={`w-24 h-24 border-2 border-[#F34D83] rounded-xl p-2 shadow-2xl shadow-[#F34D83]/30 opacity-90 rotate-6 ${
              isDark ? 'bg-[#18191F]' : 'bg-white'
            }`}
          >
            <img
              src={activeDragProduct.image}
              alt={activeDragProduct.name}
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

// Drop zone wrapping the 3D canvas
import { useDroppable } from '@dnd-kit/core';

function DropZone({
  children,
  isDraggingOver,
  isDark,
}: {
  children: React.ReactNode;
  isDraggingOver: boolean;
  isDark: boolean;
}) {
  const { setNodeRef } = useDroppable({ id: 'box-drop-zone' });
  const { t } = useTranslation();

  return (
    <div
      ref={setNodeRef}
      className={`relative border-2 rounded-2xl overflow-hidden transition-all duration-500 ${
        isDraggingOver
          ? 'border-[#F34D83] shadow-xl shadow-[#F34D83]/20'
          : isDark
          ? 'bg-[#18191F] border-white/5'
          : 'bg-white border-gray-200/90 shadow-md'
      }`}
    >
      {children}
      {isDraggingOver && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-[#F34D83]/10 flex items-center justify-center pointer-events-none"
        >
          <div className="bg-[#F34D83]/25 backdrop-blur-sm rounded-full px-6 py-3 border border-[#F34D83]/50 shadow-lg">
            <span className="text-white font-bold text-sm">{t('dropHere')}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
