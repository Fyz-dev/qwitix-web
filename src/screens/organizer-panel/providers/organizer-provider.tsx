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

import { Spinner } from '@/components/ui/spinner';
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
      {accountOrganizer.id ? (
        children
      ) : (
        <div className="absolute inset-x-0 flex size-full flex-col items-center justify-center">
          <Spinner size="large" />
        </div>
      )}
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
