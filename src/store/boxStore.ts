import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BoxItem, Product, Language, CheckoutFormData } from '../types';
import { BOX_MAX_CAPACITY, DELIVERY_FEE } from '../data/products';

interface BoxStore {
  // Box items
  items: BoxItem[];
  language: Language;
  isBoxOpen: boolean;
  isCheckoutOpen: boolean;
  activeCategory: string;
  isDraggingOver: boolean;
  checkoutForm: CheckoutFormData;
  orderConfirmed: boolean;

  // Computed
  totalItems: () => number;
  totalVolume: () => number;
  totalPrice: () => number;
  capacityPercentage: () => number;
  isBoxFull: () => boolean;
  orderSummary: () => { subtotal: number; deliveryFee: number; total: number };

  // Actions
  addItem: (product: Product) => boolean;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearBox: () => void;
  setLanguage: (lang: Language) => void;
  toggleBox: () => void;
  setBoxOpen: (open: boolean) => void;
  setCheckoutOpen: (open: boolean) => void;
  setActiveCategory: (category: string) => void;
  setDraggingOver: (over: boolean) => void;
  setCheckoutForm: (form: Partial<CheckoutFormData>) => void;
  confirmOrder: () => void;
  resetOrder: () => void;
}

export const useBoxStore = create<BoxStore>()(
  persist(
    (set, get) => ({
      items: [],
      language: 'fr',
      isBoxOpen: false,
      isCheckoutOpen: false,
      activeCategory: 'all',
      isDraggingOver: false,
      orderConfirmed: false,
      checkoutForm: {
        fullName: '',
        phone: '',
        city: '',
        address: '',
        notes: '',
      },

      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      totalVolume: () =>
        get().items.reduce((sum, item) => sum + item.product.volume * item.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      capacityPercentage: () => Math.min((get().totalVolume() / BOX_MAX_CAPACITY) * 100, 100),
      isBoxFull: () => get().totalVolume() >= BOX_MAX_CAPACITY,
      orderSummary: () => {
        const subtotal = get().totalPrice();
        return {
          subtotal,
          deliveryFee: DELIVERY_FEE,
          total: subtotal + DELIVERY_FEE,
        };
      },

      addItem: (product: Product) => {
        const state = get();
        const currentVolume = state.totalVolume();
        if (currentVolume + product.volume > BOX_MAX_CAPACITY) {
          return false;
        }

        const existing = state.items.find((item) => item.product.id === product.id);
        if (existing) {
          set({
            items: state.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 0.5;
          const position: [number, number, number] = [
            Math.cos(angle) * radius,
            0.1 + state.items.length * 0.15,
            Math.sin(angle) * radius,
          ];
          set({
            items: [...state.items, { product, quantity: 1, position }],
          });
        }
        return true;
      },

      removeItem: (productId: string) => {
        set({ items: get().items.filter((item) => item.product.id !== productId) });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearBox: () => set({ items: [] }),

      setLanguage: (language) => set({ language }),
      toggleBox: () => set({ isBoxOpen: !get().isBoxOpen }),
      setBoxOpen: (isBoxOpen) => set({ isBoxOpen }),
      setCheckoutOpen: (isCheckoutOpen) => set({ isCheckoutOpen }),
      setActiveCategory: (activeCategory) => set({ activeCategory }),
      setDraggingOver: (isDraggingOver) => set({ isDraggingOver }),
      setCheckoutForm: (form) =>
        set({ checkoutForm: { ...get().checkoutForm, ...form } }),
      confirmOrder: () => set({ orderConfirmed: true }),
      resetOrder: () =>
        set({
          items: [],
          orderConfirmed: false,
          isCheckoutOpen: false,
          checkoutForm: {
            fullName: '',
            phone: '',
            city: '',
            address: '',
            notes: '',
          },
        }),
    }),
    {
      name: 'kima-box-storage',
      partialize: (state) => ({
        items: state.items,
        language: state.language,
      }),
    }
  )
);
