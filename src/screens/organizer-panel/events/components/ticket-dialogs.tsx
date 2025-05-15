'use client';

import { FC } from 'react';

import { useEventStore } from '../providers/event-store-provider';
import { useTicketStore } from '../providers/ticket-store-provider';

import TicketDeleteDialog from './ticket-delete-dialog';
import TicketMutationDrawer from './ticket-mutation-drawer';

const TicketDialogs: FC = () => {
  const { open, setOpen, ticket } = useTicketStore(state => state);
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
            ticket={ticket}
          />
        </>
      )}

      {ticket && (
        <TicketDeleteDialog
          open={open === 'delete'}
          onOpenChange={() => setOpen('delete')}
          ticket={ticket}
        />
      )}
    </>
  );
};

export default TicketDialogs;
