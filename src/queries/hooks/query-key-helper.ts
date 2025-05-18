import {
  eventQueryClient,
  ticketQueryClient,
  transactionQueryClient,
} from '../query-clients';

export const getGoogleLoginKey = () => ['google'] as const;

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
    query?.organizerId,
    query?.limit,
    query?.offset,
    query?.searchQuery,
    query?.statuses,
  ] as const;
export const getEventCategoryListKey = () => ['event', 'category'] as const;

export const getTicketListPrefixKey = () => ['ticket', 'list'] as const;
export const getTicketListKey = (
  query: Parameters<ReturnType<typeof ticketQueryClient>['getTicketList']>[0],
) => [...getTicketListPrefixKey(), query.eventId] as const;
export const getTicketKey = (eventId: string) => ['ticket', eventId] as const;

export const getTransactionKey = (transactionId: string) =>
  ['transaction', transactionId] as const;
export const getTransactionListPrefixKey = () =>
  ['transaction', 'list'] as const;
export const getTransactionListKey = (
  query: Parameters<
    ReturnType<typeof transactionQueryClient>['getTransactionList']
  >[0],
) =>
  [
    ...getTransactionListPrefixKey(),
    query?.limit,
    query?.offset,
    query?.status,
  ] as const;
