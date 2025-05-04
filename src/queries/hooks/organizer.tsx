'use client';

import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { organizerQueryClient } from '../query-clients';

import {
  getAccountOrganizerKey,
  getOrganizerListKey,
  getOrganizerListPrefixKey,
} from './query-key-helper';

import { CreateOrganizerDTO, ProblemDetails } from '@/gen/data-contracts';
import { queryClient } from '@/providers';
import { useSession } from '@/providers/session-provider';

export const useCreateOrganizerMutation = () => {
  const { token } = useSession();

  return useMutation<
    AxiosResponse<void, void>,
    ProblemDetails,
    CreateOrganizerDTO
  >({
    mutationFn: async data => {
      return await organizerQueryClient(token).createOrganizer(data);
    },
    onSuccess: response => {
      if (response.status === 204)
        queryClient.invalidateQueries({
          queryKey: getOrganizerListPrefixKey(),
        });
    },
  });
};

export const useOrganizerListQuery = (
  query?: Parameters<
    ReturnType<typeof organizerQueryClient>['getOrganizerList']
  >[0],
) => {
  const { token } = useSession();

  return useSuspenseQuery({
    queryKey: getOrganizerListKey(),
    queryFn: async () => {
      return await organizerQueryClient(token).getOrganizerList(query);
    },
  });
};

export const useOrganizerQuery = (organizerId: string) => {
  const { token } = useSession();

  return useSuspenseQuery({
    queryKey: ['organizer', organizerId],
    queryFn: async () => {
      return await organizerQueryClient(token).getOrganizer(organizerId);
    },
  });
};

export const useUpdateOrganizerMutation = (organizerId: string) => {
  const { token } = useSession();

  return useMutation<
    AxiosResponse<void, void>,
    ProblemDetails,
    CreateOrganizerDTO
  >({
    mutationFn: async data => {
      return await organizerQueryClient(token).updateOrganizer(
        organizerId,
        data,
      );
    },
    onSuccess: response => {
      if (response.status === 200)
        queryClient.invalidateQueries({
          queryKey: getAccountOrganizerKey(),
        });
    },
  });
};
