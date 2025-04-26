'use client';
import {
  QueryClient,
  QueryClientProvider as BaseQueryClientProvider,
} from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      experimental_prefetchInRender: true,
    },
  },
});

const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BaseQueryClientProvider client={queryClient}>
      {children}
    </BaseQueryClientProvider>
  );
};

export default QueryClientProvider;
