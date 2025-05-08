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
  createTicketStore,
  TicketStore,
  TicketStoreApi,
} from '../stores/ticket-store';

export const StoreContext = createContext<TicketStoreApi | undefined>(
  undefined,
);

export const TicketStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<TicketStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createTicketStore();
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useTicketStore = <T,>(selector: (store: TicketStore) => T): T => {
  const storeContext = useContext(StoreContext);

  if (!storeContext)
    throw new Error(`useTicketStore must be used within TicketStoreProvider`);

  return useStore(storeContext, selector);
};
