import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { eventQueryClient } from '../query-clients';

import { getEventListKey, getEventListPrefixKey } from './query-key-helper';

import { CreateEventDTO, ProblemDetails } from '@/gen/data-contracts';
import { queryClient, useSession } from '@/providers';

export const useCreateEventMutation = () => {
  const { token } = useSession();

  return useMutation<AxiosResponse<void, void>, ProblemDetails, CreateEventDTO>(
    {
      mutationFn: async data => {
        return await eventQueryClient(token).createEvent(data);
      },
      onSuccess: response => {
        if (response.status === 204)
          queryClient.invalidateQueries({
            queryKey: getEventListPrefixKey(),
          });
      },
    },
  );
};

export const useEventsListQuery = (
  query: Parameters<ReturnType<typeof eventQueryClient>['getEventList']>[0],
) => {
  const { token } = useSession();

  return useSuspenseQuery({
    queryKey: getEventListKey(),
    queryFn: async () => {
      return await eventQueryClient(token).getEventList(query);
    },
  });
};
