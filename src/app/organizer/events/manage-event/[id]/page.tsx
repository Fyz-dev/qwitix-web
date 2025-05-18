import { FC } from 'react';

import { eventQueryClient } from '@/queries/query-clients';
import ManageEventPage from '@/screens/organizer-panel/events/manage-event';
import { getAccessTokenFromServer } from '@/utils/auth';

interface ManageEventProps {
  params: Promise<{ id: string }>;
}

async function getEventId(id: string) {
  const accessToken = await getAccessTokenFromServer();

  return eventQueryClient(accessToken).getEvent(id);
}

const ManageEvent: FC<ManageEventProps> = async ({ params }) => {
  const { id } = await params;

  const event = await getEventId(id);

  return <ManageEventPage event={event.data}></ManageEventPage>;
};

export default ManageEvent;
