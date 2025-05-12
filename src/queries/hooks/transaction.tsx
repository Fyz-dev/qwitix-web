import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import { transactionQueryClient } from '../query-clients';

import { getTransactionKey, getTransactionListKey } from './query-key-helper';

import { useSession } from '@/providers';

const TRANSACTION_LIST_PAGE_SIZE = 5;

export const useInfiniteTransactionsQuery = (
  query?: Omit<
    Parameters<
      ReturnType<typeof transactionQueryClient>['getTransactionList']
    >[0],
    'limit' | 'offset'
  >,
) => {
  const { token } = useSession();

  return useInfiniteQuery({
    queryKey: getTransactionListKey(query),
    queryFn: async ({ pageParam = 0 }) => {
      const response = await transactionQueryClient(token).getTransactionList({
        ...query,
        offset: pageParam,
        limit: TRANSACTION_LIST_PAGE_SIZE,
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

export const useTransactionQuery = (id: string) => {
  const { token } = useSession();

  return useSuspenseQuery({
    queryKey: getTransactionKey(id),
    queryFn: async () => {
      return await transactionQueryClient(token).getTransaction(id);
    },
  });
};
