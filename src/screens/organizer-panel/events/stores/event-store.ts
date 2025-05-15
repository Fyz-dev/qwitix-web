import { createStore } from 'zustand';

import { ResponseEventDTO } from '@/gen/data-contracts';

type EventDialogType = 'delete' | 'publish';

export interface EventState {
  event?: ResponseEventDTO;
  open?: EventDialogType;
}

export interface EventActions {
  setOpen: (open?: EventDialogType) => void;
  setEvent: (event?: ResponseEventDTO) => void;
}

export type EventStore = EventState & EventActions;

export const createEventStore = (event?: ResponseEventDTO) => {
  return createStore<EventStore>()((set, get) => ({
    event: event,
    setOpen: open => set({ open: get().open === open ? undefined : open }),
    setEvent: event => set({ event }),
  }));
};

export type EventStoreApi = ReturnType<typeof createEventStore>;
