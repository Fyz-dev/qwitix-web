'use client';

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useRef,
} from 'react';
import { useStore } from 'zustand';

import {
  createVenueStore,
  VenueStore,
  VenueStoreApi,
} from '../stores/venue-store';

export const StoreContext = createContext<VenueStoreApi | undefined>(undefined);

export const VenueStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<VenueStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createVenueStore();
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useVenueStore = <T,>(selector: (store: VenueStore) => T): T => {
  const storeContext = useContext(StoreContext);

  if (!storeContext)
    throw new Error(`useVenueStore must be used within CounterStoreProvider`);

  return useStore(storeContext, selector);
};
