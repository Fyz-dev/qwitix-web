export const getAccountOrganizerKey = () => ['account', 'organizer'] as const;

export const getOrganizerListPrefixKey = () => ['organizer', 'list'] as const;
export const getOrganizerListKey = (limit?: number, offset?: number) =>
  [...getOrganizerListPrefixKey(), limit, offset] as const;
export const getOrganizerKey = (organizerId: string) =>
  ['organizer', organizerId] as const;
