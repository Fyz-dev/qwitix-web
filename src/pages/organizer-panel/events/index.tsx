'use client';

import { FC, PropsWithChildren } from 'react';

import { useOrganizerStore } from '../providers/organizer-provider';

import EventCard from './components/event-card';
import EventHeaderButton from './components/event-header-button';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useEventsListQuery } from '@/queries/hooks/event';

interface EventsPageProps extends PropsWithChildren {}

const selectOptions = new Map<string, string>([
  ['all', 'All states'],
  ['draft', 'Draft'],
  ['scheduled', 'Scheduled'],
]);

const EventsPage: FC<EventsPageProps> = () => {
  const organizer = useOrganizerStore(state => state.organizer);
  const {
    data: { data: events },
  } = useEventsListQuery({
    organizerId: organizer.id,
  });

  return (
    <div className="space-y-4 py-4">
      <div className="flex flex-wrap items-center justify-between gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Events</h2>
          <p className="text-muted-foreground font-semibold">
            Here's you can manage your events!
          </p>
        </div>
        <EventHeaderButton />
      </div>

      <div className="flex items-end justify-between sm:items-center">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input
            placeholder="Filter events..."
            className="h-9 w-40 lg:w-[250px]"
          />
          <Select value="all">
            <SelectTrigger>
              <SelectValue>{selectOptions.get('all')}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Array.from(selectOptions.entries()).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="shadow-sm" />

      <div className="flex flex-col gap-4">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
