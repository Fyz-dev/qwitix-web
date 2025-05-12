import { FC } from 'react';

import { EVENT_PAGINATION_PAGE_SIZE } from '@/const';
import { EventStatus } from '@/gen/data-contracts';
import EventsPage from '@/pages/main/events';
import { eventQueryClient } from '@/queries/query-clients';
import { TSearchParams } from '@/types';
import { getAccessTokenFromServer } from '@/utils/auth';

interface EventsProps {
  searchParams: TSearchParams;
}

async function getEvents(page: number, categories: string[], search?: string) {
  const events = await eventQueryClient(
    await getAccessTokenFromServer(),
  ).getEventList({
    status: EventStatus.Scheduled,
    offset: (page - 1) * EVENT_PAGINATION_PAGE_SIZE,
    limit: EVENT_PAGINATION_PAGE_SIZE,
    searchQuery: search,
    categories: categories,
  });

  return events;
}

const Events: FC<EventsProps> = async ({ searchParams }) => {
  const { page, category, search } = await searchParams;

  const normalizedCategories = Array.isArray(category)
    ? category
    : category
      ? [category]
      : [];
  const normalizedSearch = Array.isArray(search) ? search.toString() : search;

  const normalizedPage = Number(page || 1);

  const events = await getEvents(
    normalizedPage,
    normalizedCategories,
    normalizedSearch,
  );

  return <EventsPage events={events.data} />;
};

export default Events;
