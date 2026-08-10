import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { loadFromStorage, saveToStorage } from '../../shared/lib/localStorage';
import type { CatalogItem } from '../catalog/types';

type CartItem = CatalogItem & {
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const CART_KEY = 'cart';

const loadCartItems = (): CartItem[] => {
  const items = loadFromStorage<CartItem[]>(CART_KEY, []);
  return Array.isArray(items) ? items : [];
};

const persistCart = (items: CartItem[]) => {
  saveToStorage(CART_KEY, items);
};

const initialState: CartState = {
  items: loadCartItems(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CatalogItem>) {
      const existing = state.items.find((item) => item.id === action.payload.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      persistCart(state.items);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      persistCart(state.items);
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const existing = state.items.find((item) => item.id === action.payload);

      if (!existing) return;

      if (existing.quantity <= 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      } else {
        existing.quantity -= 1;
      }

      persistCart(state.items);
    },
    clearCart(state) {
      state.items = [];
      persistCart(state.items);
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;

export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectIsInCart = (id: number) => (state: { cart: CartState }) =>
  state.cart.items.some((item) => item.id === id);
