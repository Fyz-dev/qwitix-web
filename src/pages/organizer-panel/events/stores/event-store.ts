import { createStore } from 'zustand';

type EventDialogType = 'create' | 'edit';

export interface EventState {
  open?: EventDialogType;
}

export interface EventActions {
  setOpen: (open?: EventDialogType) => void;
}

export type EventStore = EventState & EventActions;

export const createEventStore = () => {
  return createStore<EventStore>()((set, get) => ({
    open: undefined,
    setOpen: open => set({ open: get().open === open ? undefined : open }),
  }));
};

export type EventStoreApi = ReturnType<typeof createEventStore>;
