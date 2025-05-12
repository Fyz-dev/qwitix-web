import { Bird } from 'lucide-react';
import { FC } from 'react';

import TransactionCard from './transaction-card';

import InfiniteScroll from '@/components/features/infinite-scroll';
import {
  ResponseTransactionDTO,
  ResponseTransactionDTOPaginationResponse,
} from '@/gen/data-contracts';
import { useInfiniteTransactionsQuery } from '@/queries/hooks/transaction';

const TransactionList: FC = () => {
  const query = useInfiniteTransactionsQuery();

  return (
    <div className="flex flex-col gap-4">
      <InfiniteScroll<
        ResponseTransactionDTO,
        ResponseTransactionDTOPaginationResponse
      >
        query={query}
        fallback={
          <div className="flex h-96 flex-col items-center justify-center gap-4">
            <Bird className="size-18" />
            <p className="font-semibold">No transaction found.</p>
          </div>
        }
      >
        {items =>
          items.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        }
      </InfiniteScroll>
    </div>
  );
};

export default TransactionList;
