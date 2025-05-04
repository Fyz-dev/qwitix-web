'use client';

import { FC, PropsWithChildren } from 'react';

import { useOrganizerStore } from '../providers/organizer-provider';

import EventCard from './components/event-card';
import EventDrawers from './components/event-drawers';
import EventHeaderButton from './components/event-header-button';
import { EventStoreProvider } from './providers/event-store-provider';

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useEventsListQuery } from '@/queries/hooks/event';

interface EventsPageProps extends PropsWithChildren {}

const EventsPage: FC<EventsPageProps> = () => {
  const organizer = useOrganizerStore(state => state.organizer);
  const {
    data: { data: events },
  } = useEventsListQuery({
    organizerId: organizer.id,
  });

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

        <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
          <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
            <Input
              placeholder="Filter events..."
              className="h-9 w-40 lg:w-[250px]"
            />
          </div>
        </div>

        <Separator className="shadow-sm" />

        <div className="mt-4 flex flex-col gap-4">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      <EventDrawers />
    </EventStoreProvider>
  );
};

export default EventsPage;
