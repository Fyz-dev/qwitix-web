import { format } from 'date-fns';
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  CreditCard,
  CreditCardIcon,
  Ticket,
} from 'lucide-react';
import Link from 'next/link';
import { FC, useState } from 'react';

import TransactionQrCodeDialog from './transaction-qr-code-dialog';
import TransactionTicketCard from './transaction-ticket-card';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  ResponseTransactionDTO,
  TransactionStatus,
} from '@/gen/data-contracts';
import { cn } from '@/lib/utils';

interface TransactionCardProps {
  transaction: ResponseTransactionDTO;
}

const TransactionCard: FC<TransactionCardProps> = ({ transaction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const totalAmount = transaction.tickets.reduce(
    (sum, ticket) => sum + ticket.quantity * ticket.price,
    0,
  );

  return (
    <Card className="w-full py-4">
      <CardContent className="px-4">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <h3 className="font-medium">ID: {transaction.id}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-1 h-3 w-3" />
                  {format(transaction.createdAt, 'MMM d, yyyy, HH:mm')}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <CreditCard className="mr-1 h-4 w-4 text-gray-500" />
                <span className="text-base font-medium">${totalAmount}</span>
              </div>
              <Badge
                className={cn(
                  'px-2 py-0.5 text-xs font-medium',
                  transaction.status === TransactionStatus.Pending &&
                    'bg-blue-100 text-blue-800',
                  transaction.status === TransactionStatus.Completed &&
                    'bg-green-100 text-green-800',
                  transaction.status === TransactionStatus.Failed &&
                    'bg-red-100 text-red-800',
                  transaction.status === TransactionStatus.Refunded &&
                    'bg-yellow-100 text-yellow-800',
                )}
              >
                {transaction.status}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Ticket className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                {transaction.tickets.length} ticket types
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {transaction.status === TransactionStatus.Completed && (
                <TransactionQrCodeDialog transaction={transaction} />
              )}

              {transaction.status === TransactionStatus.Pending &&
                transaction.stripePaymentLink && (
                  <Button asChild size="sm" className="h-7 px-3">
                    <Link href={transaction.stripePaymentLink}>
                      <CreditCardIcon className="mr-1 h-3 w-3" />
                      <span className="text-xs">Pay Now</span>
                    </Link>
                  </Button>
                )}

              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <ChevronUp className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
                <span className="ml-1 text-xs">{isOpen ? 'Hide' : 'View'}</span>
              </Button>
            </div>
          </div>

          {isOpen && (
            <>
              <Separator className="my-1" />
              <div className="space-y-2">
                {transaction.tickets.map(ticket => (
                  <TransactionTicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionCard;
