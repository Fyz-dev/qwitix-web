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

import { CreateVenueDTO } from '@/gen/data-contracts';

interface VenueStoreProviderProps extends PropsWithChildren {
  venue?: CreateVenueDTO;
}

export const StoreContext = createContext<VenueStoreApi | undefined>(undefined);

export const VenueStoreProvider: FC<VenueStoreProviderProps> = ({
  venue,
  children,
}) => {
  const storeRef = useRef<VenueStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createVenueStore(venue);
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
    throw new Error(`useVenueStore must be used within VenueStoreProvider`);

  return useStore(storeContext, selector);
};
