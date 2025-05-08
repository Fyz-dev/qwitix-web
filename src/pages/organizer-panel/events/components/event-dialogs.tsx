import { FC } from 'react';

import { useEventStore } from '../providers/event-store-provider';

import EventDeleteDialog from './event-delete-dialog';

const EventDialogs: FC = () => {
  const { open, setOpen, event } = useEventStore(state => state);

  return (
    <>
      {event && (
        <EventDeleteDialog
          open={open === 'delete'}
          onOpenChange={() => setOpen('delete')}
          event={event}
        />
      )}
    </>
  );
};

export default EventDialogs;
