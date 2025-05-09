import { FC } from 'react';

import ManageEventPage from '@/pages/organizer-panel/events/manage-event';
import { eventQueryClient } from '@/queries/query-clients';
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
