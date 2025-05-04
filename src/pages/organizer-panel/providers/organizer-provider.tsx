'use client';

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useStore } from 'zustand';

import {
  createOrganizerStore,
  OrganizerStore,
  OrganizerStoreApi,
} from '../stores/organizer-store';

import { useAccountOrganizerQuery } from '@/queries/hooks/account';

export const OrganizerStoreContext = createContext<
  OrganizerStoreApi | undefined
>(undefined);

export const OrganizerStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<OrganizerStoreApi | null>(null);

  const {
    data: { data: accountOrganizer },
  } = useAccountOrganizerQuery();

  if (storeRef.current === null)
    storeRef.current = createOrganizerStore(accountOrganizer);

  useEffect(() => {
    if (accountOrganizer)
      storeRef.current?.getState().setOrganizer(accountOrganizer);
  }, [accountOrganizer]);

  return (
    <OrganizerStoreContext.Provider value={storeRef.current}>
      {children}
    </OrganizerStoreContext.Provider>
  );
};

export const useOrganizerStore = <T,>(
  selector: (store: OrganizerStore) => T,
): T => {
  const organizerStoreContext = useContext(OrganizerStoreContext);

  if (!organizerStoreContext)
    throw new Error(
      `useOrganizerStore must be used within CounterStoreProvider`,
    );

  return useStore(organizerStoreContext, selector);
};
