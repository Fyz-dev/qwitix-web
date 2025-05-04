'use client';

import { FC, Suspense } from 'react';

import { useEventStore } from '../providers/event-store-provider';

import EventCreateDrawer from './event-create-drawer';

const EventDrawers: FC = () => {
  const { open, setOpen } = useEventStore(state => state);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <EventCreateDrawer
          open={open === 'create'}
          onOpenChange={() => setOpen('create')}
        />
      </Suspense>
    </>
  );
};

export default EventDrawers;
