import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

import { Spinner } from '../ui/spinner';

interface InfiniteScrollProps<TItem, TPage extends { items: TItem[] }> {
  query: UseInfiniteQueryResult<InfiniteData<TPage>, unknown>;
  children: (items: TItem[]) => ReactNode;
  fallback?: ReactNode;
}

const InfiniteScroll = <TItem, TPage extends { items: TItem[] }>({
  query,
  children,
  fallback,
}: InfiniteScrollProps<TItem, TPage>) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    query;

  const { ref } = useInView({
    threshold: 1,
    onChange: inView => {
      if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });

  const items = data?.pages.flatMap(page => page.items) ?? [];

  const shouldShowFallback = !isLoading && items.length === 0;

  return (
    <>
      {shouldShowFallback ? (
        (fallback ?? (
          <div className="flex h-96 flex-col items-center justify-center gap-4">
            <p className="font-semibold">No items found.</p>
          </div>
        ))
      ) : (
        <>
          {children(items)}

          {(isLoading || isFetchingNextPage) && (
            <div className="flex w-full justify-center self-center">
              <Spinner size="medium" />
            </div>
          )}

          {hasNextPage && !isFetchingNextPage && (
            <div ref={ref} style={{ height: 1 }} />
          )}
        </>
      )}
    </>
  );
};

export default InfiniteScroll;
