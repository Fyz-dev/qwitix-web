export const getAccountOrganizerKey = () => ['account', 'organizer'] as const;

export const getOrganizerListPrefixKey = () => ['organizer', 'list'] as const;
export const getOrganizerListKey = (limit?: number, offset?: number) =>
  [...getOrganizerListPrefixKey(), limit, offset] as const;
export const getOrganizerKey = (organizerId: string) =>
  ['organizer', organizerId] as const;

export const getEventListPrefixKey = () => ['event', 'list'] as const;
export const getEventListKey = (limit?: number, offset?: number) =>
  [...getEventListPrefixKey(), limit, offset] as const;
