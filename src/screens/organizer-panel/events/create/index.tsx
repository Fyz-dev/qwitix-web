'use client';

import { FC } from 'react';

import VenueDialogs from '../components/venue-dialogs';
import { VenueStoreProvider } from '../providers/venue-store-provider';

import CreateForm from './create-form';

import { Separator } from '@/components/ui/separator';

const EventCreatePage: FC = () => {
  return (
    <VenueStoreProvider>
      <div className="space-y-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-x-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Create Event</h2>
            <p className="text-muted-foreground font-semibold">
              Here's you can create an event and also specify the location!
            </p>
          </div>
        </div>

        <Separator className="shadow-sm" />

        <div className="-mx-1 px-1.5 lg:max-w-xl">
          <CreateForm />
        </div>
      </div>

      <VenueDialogs />
    </VenueStoreProvider>
  );
};

export default EventCreatePage;
