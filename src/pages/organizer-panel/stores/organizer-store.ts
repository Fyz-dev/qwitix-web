import { createStore } from 'zustand';

import { ResponseOrganizerDTO } from '@/gen/data-contracts';

export interface OrganizerState {
  organizer: ResponseOrganizerDTO;
}

export interface OrganizerActions {
  setOrganizer: (organizer?: ResponseOrganizerDTO) => void;
}

export type OrganizerStore = OrganizerState & OrganizerActions;

export const createOrganizerStore = (organizer: ResponseOrganizerDTO) => {
  return createStore<OrganizerStore>()(set => ({
    organizer: organizer,
    setOrganizer: organizer => set({ organizer }),
  }));
};

export type OrganizerStoreApi = ReturnType<typeof createOrganizerStore>;
