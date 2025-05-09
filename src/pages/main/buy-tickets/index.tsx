import { ShoppingCart } from 'lucide-react';
import { FC } from 'react';

import BuyTicketHeader from './components/buy-ticket-header';
import TicketCard from './components/ticket-card';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ResponseEventDTO, ResponseTicketDTO } from '@/gen/data-contracts';

interface BuyTicketsPageProps {
  event: ResponseEventDTO;
  tickets: ResponseTicketDTO[];
}

const BuyTicketsPage: FC<BuyTicketsPageProps> = ({ event, tickets }) => {
  return (
    <div className="h-full">
      <BuyTicketHeader event={event} />
      <Separator className="my-14" />
      <section className="grid grid-cols-4 gap-6">
        {tickets.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </section>
      <section className="absolute right-20 bottom-20">
        <Button size="icon" className="size-14">
          <ShoppingCart className="size-6" />
        </Button>
      </section>
    </div>
  );
};

export default BuyTicketsPage;
