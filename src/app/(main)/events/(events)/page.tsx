import { FC } from 'react';

import { EVENT_PAGINATION_PAGE_SIZE } from '@/const';
import { EventStatus } from '@/gen/data-contracts';
import { eventQueryClient } from '@/queries/query-clients';
import EventsPage from '@/screens/main/events';
import { TSearchParams } from '@/types';
import { getAccessTokenFromServer } from '@/utils/auth';

interface EventsProps {
  searchParams: TSearchParams;
}
async function getEvents(
  page: number,
  categories: string[],
  ended?: string,
  search?: string,
) {
  const statuses = [
    EventStatus.Scheduled,
    ...(ended === 'true' ? [EventStatus.Ended, EventStatus.Live] : []),
  ];

  const events = await eventQueryClient(
    await getAccessTokenFromServer(),
  ).getEventList({
    statuses,
    offset: (page - 1) * EVENT_PAGINATION_PAGE_SIZE,
    limit: EVENT_PAGINATION_PAGE_SIZE,
    searchQuery: search,
    categories,
  });

  return events;
}
const Events: FC<EventsProps> = async ({ searchParams }) => {
  const { page, category, search, ended } = await searchParams;

  const normalizedCategories = Array.isArray(category)
    ? category
    : category
      ? [category]
      : [];
  const normalizedSearch = Array.isArray(search) ? search.toString() : search;
  const normalizedPage = Number(page || 1);
  const normalizedEnded = Array.isArray(ended) ? ended[0] : ended;

  const events = await getEvents(
    normalizedPage,
    normalizedCategories,
    normalizedEnded,
    normalizedSearch,
  );

  return <EventsPage events={events.data} />;
};

export default Events;
