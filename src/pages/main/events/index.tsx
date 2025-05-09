import { FC } from 'react';

import EventCard from './components/event-card';

import { ResponseEventDTOPaginationResponse } from '@/gen/data-contracts';

interface EventsProps {
  events: ResponseEventDTOPaginationResponse;
}

const EventsPage: FC<EventsProps> = ({ events }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {events.items.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsPage;
