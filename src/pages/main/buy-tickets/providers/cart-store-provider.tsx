'use client';

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useRef,
} from 'react';
import { useStore } from 'zustand';

import { createCartStore, CartStore, CartStoreApi } from '../stores/cart-store';

export const CartStoreContext = createContext<CartStoreApi | undefined>(
  undefined,
);

export const CartStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<CartStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createCartStore();
  }

  return (
    <CartStoreContext.Provider value={storeRef.current}>
      {children}
    </CartStoreContext.Provider>
  );
};

export const useCartStore = <T,>(selector: (store: CartStore) => T): T => {
  const storeContext = useContext(CartStoreContext);

  if (!storeContext) {
    throw new Error('useCartStore must be used within CartStoreProvider');
  }

  return useStore(storeContext, selector);
};
