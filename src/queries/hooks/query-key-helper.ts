import { eventQueryClient, ticketQueryClient } from '../query-clients';

export const getAccountOrganizerKey = () => ['account', 'organizer'] as const;

export const getOrganizerListPrefixKey = () => ['organizer', 'list'] as const;
export const getOrganizerListKey = (limit?: number, offset?: number) =>
  [...getOrganizerListPrefixKey(), limit, offset] as const;
export const getOrganizerKey = (organizerId: string) =>
  ['organizer', organizerId] as const;

export const getEventListPrefixKey = () => ['event', 'list'] as const;
export const getEventListKey = (
  query: Parameters<ReturnType<typeof eventQueryClient>['getEventList']>[0],
) =>
  [
    ...getEventListPrefixKey(),
    query.organizerId,
    query.limit,
    query.offset,
    query.searchQuery,
    query.status,
  ] as const;

export const getTicketListPrefixKey = () => ['ticket', 'list'] as const;
export const getTicketListKey = (
  query: Parameters<ReturnType<typeof ticketQueryClient>['getTicketList']>[0],
) => [...getTicketListPrefixKey(), query.eventId] as const;
export const getTicketKey = (eventId: string) => ['ticket', eventId] as const;
