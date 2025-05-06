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
  createEventStore,
  EventStore,
  EventStoreApi,
} from '../stores/event-store';

import { ResponseEventDTO } from '@/gen/data-contracts';

interface EventStoreProviderProps extends PropsWithChildren {
  event: ResponseEventDTO;
}

export const StoreContext = createContext<EventStoreApi | undefined>(undefined);

export const EventStoreProvider: FC<EventStoreProviderProps> = ({
  event,
  children,
}) => {
  const storeRef = useRef<EventStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createEventStore(event);
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
};

export const useEventStore = <T,>(selector: (store: EventStore) => T): T => {
  const storeContext = useContext(StoreContext);

  if (!storeContext)
    throw new Error(`useEventStore must be used within CounterStoreProvider`);

  return useStore(storeContext, selector);
};
