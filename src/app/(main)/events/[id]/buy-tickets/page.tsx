import { FC } from 'react';

import BuyTicketsPage from '@/pages/main/buy-tickets';
import { eventQueryClient, ticketQueryClient } from '@/queries/query-clients';
import { getAccessTokenFromServer } from '@/utils/auth';

interface BuyTicketsProps {
  params: Promise<{
    id: string;
  }>;
}

async function getEvent(eventId: string) {
  return await eventQueryClient(await getAccessTokenFromServer()).getEvent(
    eventId,
  );
}

async function getTickets(eventId: string) {
  return await ticketQueryClient(
    await getAccessTokenFromServer(),
  ).getTicketList({ eventId });
}

const BuyTickets: FC<BuyTicketsProps> = async ({ params }) => {
  const { id } = await params;

  const { data: event } = await getEvent(id);
  const { data: tickets } = await getTickets(id);

  return <BuyTicketsPage event={event} tickets={tickets} />;
};

export default BuyTickets;
