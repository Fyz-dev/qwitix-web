'use client';

import { FC, PropsWithChildren, useState } from 'react';

import { useOrganizerStore } from '../providers/organizer-provider';

import EventDialogs from './components/event-dialogs';
import EventHeaderButton from './components/event-header-button';
import EventList from './components/event-list';
import { EventStoreProvider } from './providers/event-store-provider';
import { EventStatusOptions } from './types';

import SuspenseWrapper from '@/components/features/suspense-wrapper';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useDebounce } from '@/hooks/use-debounce';

interface EventsPageProps extends PropsWithChildren {}

const selectOptions = new Map<EventStatusOptions, string>([
  ['All', 'All states'],
  ['Draft', 'Draft'],
  ['Scheduled', 'Scheduled'],
  ['Live', 'Live'],
  ['Ended', 'Ended'],
]);

const EventsPage: FC<EventsPageProps> = () => {
  const organizer = useOrganizerStore(state => state.organizer);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] =
    useState<EventStatusOptions>('All');

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  return (
    <EventStoreProvider>
      <div className="relative space-y-4 py-4">
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
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <Select
              value={selectedStatus}
              onValueChange={value => {
                setSelectedStatus(value as EventStatusOptions);
              }}
            >
              <SelectTrigger>
                <SelectValue>{selectOptions.get(selectedStatus)}</SelectValue>
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

        <SuspenseWrapper spinnerProps={{ size: 'medium' }}>
          <EventList
            selectedStatus={selectedStatus}
            organizer={organizer}
            searchQuery={debouncedSearchQuery}
          />
        </SuspenseWrapper>
      </div>

      <EventDialogs />
    </EventStoreProvider>
  );
};

export default EventsPage;
