'use client';

import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { redirect } from 'next/navigation';

import { accountQueryClient } from '../query-clients';

import { getAccountOrganizerKey } from './query-key-helper';

import { ProblemDetails, UpdateUserDTO } from '@/gen/data-contracts';
import { useSession } from '@/providers/session-provider';
import { useAuthUser } from '@/stores';
import { authUserOnServer } from '@/utils/auth/server';
import { Paths } from '@/utils/paths';

export const useAccountOrganizerQuery = () => {
  const { token } = useSession();

  return useSuspenseQuery({
    queryKey: getAccountOrganizerKey(),
    retry: 0,
    queryFn: async () => {
      try {
        return await accountQueryClient(token).getOrganizerAccount();
      } catch {
        redirect(Paths.Organizer.Register);
      }
    },
  });
};

export const useGoogleLoginUrlQuery = (
  query: Parameters<
    ReturnType<typeof accountQueryClient>['getGoogleLoginUrl']
  >[0],
) => {
  const { token } = useSession();

  return useSuspenseQuery({
    queryKey: getAccountOrganizerKey(),
    queryFn: async () => {
      return await accountQueryClient(token).getGoogleLoginUrl(query);
    },
  });
};

export const useUpdateAccountMutation = () => {
  const { token } = useSession();
  const login = useAuthUser(state => state.login);

  return useMutation<AxiosResponse<void, void>, ProblemDetails, UpdateUserDTO>({
    mutationFn: async data => {
      return await accountQueryClient(token).updateAccount(data);
    },
    onSuccess: async response => {
      if (response.status === 200) {
        const res = await accountQueryClient(token).getAccount();

        login(res.data.user);

        authUserOnServer(res.data);
      }
    },
  });
};
