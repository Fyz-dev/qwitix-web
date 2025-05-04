'use client';

import { FC, PropsWithChildren } from 'react';

import EventDrawers from './components/event-drawers';
import EventHeaderButton from './components/event-header-button';
import { EventStoreProvider } from './providers/event-store-provider';

interface EventsPageProps extends PropsWithChildren {}

const EventsPage: FC<EventsPageProps> = () => {
  return (
    <EventStoreProvider>
      <div className="py-4">
        <div className="mb-3 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Events</h2>
            <p className="text-muted-foreground font-semibold">
              Here's you can manage your events!
            </p>
          </div>
          <EventHeaderButton />
        </div>
      </div>
      <EventDrawers />
    </EventStoreProvider>
  );
};

export default EventsPage;
