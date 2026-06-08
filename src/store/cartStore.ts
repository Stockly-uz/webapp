import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];

  // Actions
  add: (product: Product) => void;
  remove: (productId: number) => void;
  increment: (productId: number) => void;
  decrement: (productId: number) => void;
  clear: () => void;

  // Computed (через геттеры)
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (product) => {
        const exists = get().items.find(i => i.product.id === product.id);
        if (exists) {
          set(state => ({
            items: state.items.map(i =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }));
        } else {
          set(state => ({
            items: [...state.items, { product, quantity: 1 }],
          }));
        }
      },

      remove: (productId) => {
        set(state => ({
          items: state.items.filter(i => i.product.id !== productId),
        }));
      },

      increment: (productId) => {
        set(state => ({
          items: state.items.map(i =>
            i.product.id === productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }));
      },

      decrement: (productId) => {
        set(state => ({
          items: state.items
            .map(i =>
              i.product.id === productId
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
            .filter(i => i.quantity > 0),
        }));
      },

      clear: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (sum, i) => sum + i.product.final_price * i.quantity,
          0
        ),
    }),
    {
      name: 'stockly-cart', // ключ в localStorage
    }
  )
);