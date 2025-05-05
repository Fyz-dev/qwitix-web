import { createStore } from 'zustand';

type TicketDialogType = 'create' | 'edit';

export interface TicketState {
  open?: TicketDialogType;
}

export interface TicketActions {
  setOpen: (open?: TicketDialogType) => void;
}

export type TicketStore = TicketState & TicketActions;

export const createTicketStore = () => {
  return createStore<TicketStore>()((set, get) => ({
    open: undefined,
    setOpen: open => set({ open: get().open === open ? undefined : open }),
  }));
};

export type TicketStoreApi = ReturnType<typeof createTicketStore>;
