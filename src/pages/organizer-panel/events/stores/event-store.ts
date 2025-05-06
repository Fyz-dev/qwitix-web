import { createStore } from 'zustand';

import { ResponseEventDTO } from '@/gen/data-contracts';

export interface EventState {
  event?: ResponseEventDTO;
}

export interface EventActions {
  setEvent: (event?: ResponseEventDTO) => void;
}

export type EventStore = EventState & EventActions;

export const createEventStore = (event?: ResponseEventDTO) => {
  return createStore<EventStore>()(set => ({
    event: event,
    setEvent: event => set({ event }),
  }));
};

export type EventStoreApi = ReturnType<typeof createEventStore>;
