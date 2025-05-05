'use client';

import { FC } from 'react';

import { useTicketStore } from '../providers/ticket-store-provider';

import TicketCreateDrawer from './ticket-create-drawer';

const TicketDialogs: FC = () => {
  const { open, setOpen } = useTicketStore(state => state);

  return (
    <>
      <TicketCreateDrawer
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />
    </>
  );
};

export default TicketDialogs;
