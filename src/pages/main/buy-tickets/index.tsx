import { FC } from 'react';

import BuyTicketHeader from './components/buy-ticket-header';
import CartButton from './components/cart-button';
import CartDialogs from './components/cart-dialogs';
import TicketCard from './components/ticket-card';
import { CartStoreProvider } from './providers/cart-store-provider';

import { Separator } from '@/components/ui/separator';
import { ResponseEventDTO, ResponseTicketDTO } from '@/gen/data-contracts';

interface BuyTicketsPageProps {
  event: ResponseEventDTO;
  tickets: ResponseTicketDTO[];
}

const BuyTicketsPage: FC<BuyTicketsPageProps> = ({ event, tickets }) => {
  return (
    <CartStoreProvider>
      <div className="h-full">
        <BuyTicketHeader event={event} />
        <Separator className="my-14" />
        <section className="grid grid-cols-4 gap-6">
          {tickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </section>
        <CartDialogs />

        <CartButton />
      </div>
    </CartStoreProvider>
  );
};

export default BuyTicketsPage;
