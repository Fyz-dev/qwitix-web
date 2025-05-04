'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { accountQueryClient } from '../query-clients';

import { useSession } from '@/providers/session-provider';

export const useAccountOrganizerQuery = () => {
  const { token } = useSession();

  return useSuspenseQuery({
    queryKey: ['account', 'organizer'],
    queryFn: async () => {
      return await accountQueryClient(token).getOrganizerAccount();
    },
  });
};
