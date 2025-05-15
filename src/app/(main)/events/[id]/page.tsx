import { FC } from 'react';

import EventPage from '@/screens/main/event';
import { eventQueryClient } from '@/queries/query-clients';
import { getAccessTokenFromServer } from '@/utils/auth';

interface EventPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getEvent(eventId: string) {
  return await eventQueryClient(await getAccessTokenFromServer()).getEvent(
    eventId,
  );
}

const Event: FC<EventPageProps> = async ({ params }) => {
  const { id } = await params;

  const event = await getEvent(id);

  return <EventPage event={event.data} />;
};

export default Event;
