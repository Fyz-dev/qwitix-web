'use client';

import { FC } from 'react';

import { useTicketStore } from '../providers/ticket-store-provider';

import TicketMutationDrawer from './ticket-mutation-drawer';

const TicketDialogs: FC = () => {
  const { open, setOpen } = useTicketStore(state => state);

  return (
    <>
      <TicketMutationDrawer
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />
    </>
  );
};

export default TicketDialogs;
