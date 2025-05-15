'use client';

import { FC } from 'react';

import { useVenueStore } from '../providers/venue-store-provider';

import VenueMutationDrawer from './venue-mutation-drawer';

const VenueDialogs: FC = () => {
  const { open, setOpen, venue } = useVenueStore(state => state);

  return (
    <>
      <VenueMutationDrawer
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />
      {venue && (
        <VenueMutationDrawer
          open={open === 'edit'}
          onOpenChange={() => setOpen('edit')}
          venue={venue}
        />
      )}
    </>
  );
};

export default VenueDialogs;
