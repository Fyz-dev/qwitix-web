import { createStore } from 'zustand';

import { ResponseEventDTO } from '@/gen/data-contracts';

export interface EventState {
  event: ResponseEventDTO;
}

export type EventStore = EventState;

export const createEventStore = (event: ResponseEventDTO) => {
  return createStore<EventStore>()(() => ({
    event: event,
  }));
};

export type EventStoreApi = ReturnType<typeof createEventStore>;
