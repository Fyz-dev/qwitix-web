import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { eventQueryClient } from '../query-clients';

import { getEventListKey } from './query-key-helper';

import { CreateEventDTO, ProblemDetails } from '@/gen/data-contracts';
import { useSession } from '@/providers';

export const useCreateEventMutation = () => {
  return useMutation<AxiosResponse<void, void>, ProblemDetails, CreateEventDTO>(
    {
      mutationFn: async data => {
        return await (await eventQueryClient()).createEvent(data);
      },
      onSuccess: response => {
        // if (response.status === 204) {
        // }
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
