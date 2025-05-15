import { FC } from 'react';

import BuyTicketHeader from './components/buy-ticket-header';
import CartButton from './components/cart-button';
import CartDialogs from './components/cart-dialogs';
import TicketCard from './components/ticket-card';
import { CartStoreProvider } from './providers/cart-store-provider';

import { Separator } from '@/components/ui/separator';
import EventStartedAlert from '@/components/widgets/event-started-alert';
import {
  EventStatus,
  ResponseEventDTO,
  ResponseTicketDTO,
} from '@/gen/data-contracts';

interface BuyTicketsPageProps {
  event: ResponseEventDTO;
  tickets: ResponseTicketDTO[];
}

const BuyTicketsPage: FC<BuyTicketsPageProps> = ({ event, tickets }) => {
  return (
    <CartStoreProvider>
      <div className="my-14 flex h-full flex-col gap-14">
        <EventStartedAlert event={event} />
        <BuyTicketHeader event={event} />
        <Separator />
        <section className="grid grid-cols-4 gap-6">
          {tickets.map(ticket => (
            <TicketCard
              isReadonly={
                event.status !== EventStatus.Scheduled ||
                (event.startDate && new Date(event.startDate) < new Date())
              }
              key={ticket.id}
              ticket={ticket}
            />
          ))}
        </section>
        <CartDialogs />

        <CartButton />
      </div>
    </CartStoreProvider>
  );
};

export default BuyTicketsPage;
