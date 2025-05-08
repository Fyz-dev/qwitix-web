import { FC } from 'react';

import TicketCard from './ticket-card';

import { ResponseEventDTO } from '@/gen/data-contracts';
import { useTicketListQuery } from '@/queries/hooks/ticket';

interface TicketListProps {
  event: ResponseEventDTO;
}

const TicketList: FC<TicketListProps> = ({ event }) => {
  const {
    data: { data: tickets },
  } = useTicketListQuery({ eventId: event.id });

  return (
    <>
      {tickets.map(ticket => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </>
  );
};

export default TicketList;
