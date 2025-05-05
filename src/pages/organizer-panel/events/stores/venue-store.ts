import { createStore } from 'zustand';

import { CreateVenueDTO } from '@/gen/data-contracts';

type VenueDialogType = 'create' | 'edit';

export interface VenueState {
  open?: VenueDialogType;
  venue?: CreateVenueDTO;
}

export interface VenueActions {
  setOpen: (open?: VenueDialogType) => void;
  setVenue: (venue?: CreateVenueDTO) => void;
}

export type VenueStore = VenueState & VenueActions;

export const createVenueStore = () => {
  return createStore<VenueStore>()((set, get) => ({
    open: undefined,
    venue: undefined,
    setOpen: open => set({ open: get().open === open ? undefined : open }),
    setVenue: venue => set({ venue }),
  }));
};

export type VenueStoreApi = ReturnType<typeof createVenueStore>;
