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

export const EventStoreContext = createContext<EventStoreApi | undefined>(
  undefined,
);

export const EventStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<EventStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createEventStore();
  }

  return (
    <EventStoreContext.Provider value={storeRef.current}>
      {children}
    </EventStoreContext.Provider>
  );
};

export const useEventStore = <T,>(selector: (store: EventStore) => T): T => {
  const eventStoreContext = useContext(EventStoreContext);

  if (!eventStoreContext)
    throw new Error(`useEventStore must be used within CounterStoreProvider`);

  return useStore(eventStoreContext, selector);
};
