import { Event } from '@/gen/Event';

export const eventQueryClient = (accessToken?: string) => {
  return new Event({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : false,
    },
  });
};
