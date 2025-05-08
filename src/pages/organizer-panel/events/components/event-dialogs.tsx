import { FC } from 'react';

import { useEventStore } from '../providers/event-store-provider';

import EventDeleteDialog from './event-delete-dialog';
import EventPublishDialog from './event-publish-dialog';

const EventDialogs: FC = () => {
  const { open, setOpen, event } = useEventStore(state => state);

  return (
    <>
      {event && (
        <>
          <EventDeleteDialog
            open={open === 'delete'}
            onOpenChange={() => setOpen('delete')}
            event={event}
          />
          <EventPublishDialog
            open={open === 'publish'}
            onOpenChange={() => setOpen('publish')}
            event={event}
          />
        </>
      )}
    </>
  );
};

export default EventDialogs;
