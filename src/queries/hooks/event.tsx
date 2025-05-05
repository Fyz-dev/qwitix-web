import {
  useInfiniteQuery,
  useMutation,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { eventQueryClient } from '../query-clients';

import { getEventListKey, getEventListPrefixKey } from './query-key-helper';

import { CreateEventDTO, ProblemDetails } from '@/gen/data-contracts';
import { queryClient, useSession } from '@/providers';

const EVENT_LIST_PAGE_SIZE = 5;

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
    queryKey: getEventListKey(query),
    queryFn: async () => {
      return await eventQueryClient(token).getEventList(query);
    },
  });
};

export const useInfiniteEventsQuery = (
  query: Omit<
    Parameters<ReturnType<typeof eventQueryClient>['getEventList']>[0],
    'limit' | 'offset'
  >,
) => {
  const { token } = useSession();

  return useInfiniteQuery({
    queryKey: getEventListKey(query),
    queryFn: async ({ pageParam = 0 }) => {
      const response = await eventQueryClient(token).getEventList({
        ...query,
        offset: pageParam,
        limit: EVENT_LIST_PAGE_SIZE,
      });

      return response.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const currentOffset = allPages.flatMap(p => p.items ?? []).length;
      return currentOffset < (lastPage.totalCount ?? 0)
        ? currentOffset
        : undefined;
    },
  });
};
