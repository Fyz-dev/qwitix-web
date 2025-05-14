'use client';
import { Bird } from 'lucide-react';
import { FC } from 'react';

import { EventStatusOptions } from '../types';

import EventCard from './event-card';

import InfiniteScroll from '@/components/features/infinite-scroll';
import {
  EventStatus,
  ResponseEventDTO,
  ResponseEventDTOPaginationResponse,
  ResponseOrganizerDTO,
} from '@/gen/data-contracts';
import { useInfiniteEventsQuery } from '@/queries/hooks/event';

interface EventListProps {
  organizer: ResponseOrganizerDTO;
  selectedStatus: EventStatusOptions;
  searchQuery: string;
}

const EventList: FC<EventListProps> = ({
  organizer,
  selectedStatus,
  searchQuery,
}) => {
  const query = useInfiniteEventsQuery({
    organizerId: organizer.id,
    statuses: [
      selectedStatus === 'All' ? undefined : (selectedStatus as EventStatus),
    ],
    searchQuery: searchQuery,
  });

  return (
    <div className="flex flex-col gap-4">
      <InfiniteScroll<ResponseEventDTO, ResponseEventDTOPaginationResponse>
        query={query}
        fallback={
          <div className="flex h-96 flex-col items-center justify-center gap-4">
            <Bird className="size-18" />
            <p className="font-semibold">No events found.</p>
          </div>
        }
      >
        {items =>
          items.map(event => <EventCard key={event.id} event={event} />)
        }
      </InfiniteScroll>
    </div>
  );
};

export default EventList;
