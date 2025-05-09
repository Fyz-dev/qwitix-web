import { console } from 'inspector';

import { FC } from 'react';

import { EventStatus } from '@/gen/data-contracts';
import EventsPage from '@/pages/main/events';
import { eventQueryClient } from '@/queries/query-clients';
import { TSearchParams } from '@/types';
import { getAccessTokenFromServer } from '@/utils/auth';

interface EventsProps {
  searchParams: TSearchParams;
}

async function getEvents(categories: string[], search?: string) {
  const events = await eventQueryClient(
    await getAccessTokenFromServer(),
  ).getEventList({
    status: EventStatus.Scheduled,
  });

  return events;
}

const Events: FC<EventsProps> = async ({ searchParams }) => {
  const { category, search } = await searchParams;

  const normalizedCategories = Array.isArray(category)
    ? category
    : category
      ? [category]
      : [];
  const normalizedSearch = Array.isArray(search) ? search.toString() : search;

  const events = await getEvents(normalizedCategories, normalizedSearch);

  return <EventsPage events={events.data} />;
};

export default Events;
