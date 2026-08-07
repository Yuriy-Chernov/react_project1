import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { loadFromStorage, saveToStorage } from '../../shared/lib/localStorage';
import type { CatalogItem } from '../catalog/types';

type WishlistState = {
  items: CatalogItem[];
};

const WISHLIST_KEY = 'wishlist';

const loadWishlistItems = (): CatalogItem[] => {
  const items = loadFromStorage<CatalogItem[]>(WISHLIST_KEY, []);
  return Array.isArray(items) ? items : [];
};

const persistWishlist = (items: CatalogItem[]) => {
  saveToStorage(WISHLIST_KEY, items);
};

const initialState: WishlistState = {
  items: loadWishlistItems(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<CatalogItem>) {
      if (state.items.some((item) => item.id === action.payload.id)) return;

      state.items.push(action.payload);
      persistWishlist(state.items);
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      persistWishlist(state.items);
    },
    toggleWishlist(state, action: PayloadAction<CatalogItem>) {
      const index = state.items.findIndex((item) => item.id === action.payload.id);

      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }

      persistWishlist(state.items);
    },
    clearWishlist(state) {
      state.items = [];
      persistWishlist(state.items);
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;

export const selectWishlistItems = (state: { wishlist: WishlistState }) =>
  state.wishlist.items;

export const selectWishlistCount = (state: { wishlist: WishlistState }) =>
  state.wishlist.items.length;

export const selectIsInWishlist =
  (id: number) => (state: { wishlist: WishlistState }) =>
    state.wishlist.items.some((item) => item.id === id);
