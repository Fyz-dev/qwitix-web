import { Bird } from 'lucide-react';
import { FC } from 'react';

import EventCard from './components/event-card';
import EventPagination from './components/event-pagination';

import { ResponseEventDTOPaginationResponse } from '@/gen/data-contracts';

interface EventsProps {
  events: ResponseEventDTOPaginationResponse;
}

const EventsPage: FC<EventsProps> = ({ events }) => {
  return (
    <div className="flex min-h-[calc(100svh-(var(--spacing-header)+112px))] w-full flex-col gap-4">
      {events.items.length !== 0 ? (
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
          {events.items.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <Bird className="size-18" />
          <p className="font-semibold">No events found.</p>
        </div>
      )}
      <EventPagination events={events} />
    </div>
  );
};

export default EventsPage;
