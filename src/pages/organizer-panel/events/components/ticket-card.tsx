import { FC } from 'react';

import { ResponseTicketDTO } from '@/gen/data-contracts';

interface TicketCardProps {
  ticket: ResponseTicketDTO;
}

const TicketCard: FC<TicketCardProps> = ({ ticket }) => {
  return <div>{ticket.name}</div>;
};

export default TicketCard;
