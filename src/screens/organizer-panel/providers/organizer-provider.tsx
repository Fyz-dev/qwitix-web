'use client';

import { useRouter } from 'next/navigation';
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
import { Paths } from '@/utils/paths';

export const OrganizerStoreContext = createContext<
  OrganizerStoreApi | undefined
>(undefined);

export const OrganizerStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const storeRef = useRef<OrganizerStoreApi | null>(null);

  const {
    data: { data: accountOrganizer },
    isError,
  } = useAccountOrganizerQuery();

  if (storeRef.current === null)
    storeRef.current = createOrganizerStore(accountOrganizer);

  useEffect(() => {
    if (accountOrganizer)
      storeRef.current?.getState().setOrganizer(accountOrganizer);
  }, [accountOrganizer]);

  useEffect(() => {
    if (isError) router.push(Paths.Organizer.Register);
  }, [isError]);

  return (
    <OrganizerStoreContext.Provider value={storeRef.current}>
      {accountOrganizer.id && children}
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
