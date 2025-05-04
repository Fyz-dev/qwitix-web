import { Organizer } from '@/gen/Organizer';

export const organizerQueryClient = (accessToken?: string) => {
  return new Organizer({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : false,
    },
  });
};
