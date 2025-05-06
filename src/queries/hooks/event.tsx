import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { eventQueryClient } from '../query-clients';

import { getEventListKey, getEventListPrefixKey } from './query-key-helper';

import {
  CreateEventDTO,
  ProblemDetails,
  PublishEventDTO,
  UpdateEventDTO,
} from '@/gen/data-contracts';
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

export const usePublishEventMutation = (id: string) => {
  const { token } = useSession();

  return useMutation<
    AxiosResponse<void, void>,
    ProblemDetails,
    PublishEventDTO
  >({
    mutationFn: async data => {
      return await eventQueryClient(token).publishEvent(id, data);
    },
    onSuccess: response => {
      if (response.status === 200)
        queryClient.invalidateQueries({
          queryKey: getEventListPrefixKey(),
        });
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

export const useUpdateEventMutation = (id: string) => {
  const { token } = useSession();

  return useMutation<AxiosResponse<void, void>, ProblemDetails, UpdateEventDTO>(
    {
      mutationFn: async data => {
        return await eventQueryClient(token).updateEvent(id, data);
      },
      onSuccess: response => {
        if (response.status === 200)
          queryClient.invalidateQueries({
            queryKey: getEventListPrefixKey(),
          });
      },
    },
  );
};

export const useDeleteEventMutation = (id: string) => {
  const { token } = useSession();

  return useMutation<AxiosResponse<void, void>, ProblemDetails>({
    mutationFn: async () => {
      return await eventQueryClient(token).deleteEvent(id);
    },
    onSuccess: response => {
      if (response.status === 204)
        queryClient.invalidateQueries({
          queryKey: getEventListPrefixKey(),
        });
    },
  });
};
