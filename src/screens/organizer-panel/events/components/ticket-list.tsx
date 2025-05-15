'use client';

import { FC, ReactNode } from 'react';

import TicketCard from './ticket-card';

import { ResponseEventDTO } from '@/gen/data-contracts';
import { useTicketListQuery } from '@/queries/hooks/ticket';

interface TicketListProps {
  event: ResponseEventDTO;
  isReadOnly?: boolean;
  fallback?: ReactNode;
}

const TicketList: FC<TicketListProps> = ({ event, isReadOnly, fallback }) => {
  const {
    data: { data: tickets },
  } = useTicketListQuery({ eventId: event.id });

  return (
    <>
      {tickets.map(ticket => (
        <TicketCard isReadOnly={isReadOnly} key={ticket.id} ticket={ticket} />
      ))}

      {tickets.length === 0 && fallback}
    </>
  );
};

export default TicketList;
