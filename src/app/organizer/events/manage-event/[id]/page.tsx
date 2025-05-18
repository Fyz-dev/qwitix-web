import { FC } from 'react';

import ManageEventPage from '@/screens/organizer-panel/events/manage-event';

interface ManageEventProps {
  params: Promise<{ id: string }>;
}

const ManageEvent: FC<ManageEventProps> = async ({ params }) => {
  const { id } = await params;

  return <ManageEventPage eventId={id}></ManageEventPage>;
};

export default ManageEvent;
