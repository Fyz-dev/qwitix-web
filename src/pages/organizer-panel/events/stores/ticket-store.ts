import { createStore } from 'zustand';

import { ResponseTicketDTO } from '@/gen/data-contracts';

type TicketDialogType = 'create' | 'edit' | 'delete';

export interface TicketState {
  open?: TicketDialogType;
  ticket?: ResponseTicketDTO;
}

export interface TicketActions {
  setOpen: (open?: TicketDialogType) => void;
  setTicket: (ticket?: ResponseTicketDTO) => void;
}

export type TicketStore = TicketState & TicketActions;

export const createTicketStore = () => {
  return createStore<TicketStore>()((set, get) => ({
    open: undefined,
    ticket: undefined,
    setOpen: open => set({ open: get().open === open ? undefined : open }),
    setTicket: ticket => set({ ticket }),
  }));
};

export type TicketStoreApi = ReturnType<typeof createTicketStore>;
