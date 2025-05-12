import { FC } from 'react';

import EventCard from './components/event-card';
import EventPagination from './components/event-pagination';

import { ResponseEventDTOPaginationResponse } from '@/gen/data-contracts';

interface EventsProps {
  events: ResponseEventDTOPaginationResponse;
}

const EventsPage: FC<EventsProps> = ({ events }) => {
  return (
    <div className="flex min-h-[calc(100svh-(var(--spacing-header)+112px))] flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        {events.items.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <EventPagination events={events} />
    </div>
  );
};

export default EventsPage;
