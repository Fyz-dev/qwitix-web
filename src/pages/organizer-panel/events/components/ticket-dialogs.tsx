'use client';

import { FC } from 'react';

import { useEventStore } from '../providers/event-store-provider';
import { useTicketStore } from '../providers/ticket-store-provider';

import TicketMutationDrawer from './ticket-mutation-drawer';

const TicketDialogs: FC = () => {
  const { open, setOpen } = useTicketStore(state => state);
  const event = useEventStore(state => state.event);

  return (
    <>
      {event && (
        <>
          <TicketMutationDrawer
            open={open === 'create'}
            onOpenChange={() => setOpen('create')}
            event={event}
          />
          <TicketMutationDrawer
            open={open === 'edit'}
            onOpenChange={() => setOpen('edit')}
            event={event}
          />
        </>
      )}
    </>
  );
};

export default TicketDialogs;
