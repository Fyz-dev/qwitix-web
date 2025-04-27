import { Event } from '@/gen/Event';
import { getAccessToken } from '@/utils/auth';

export const eventQueryClient = () => {
  const accessToken = getAccessToken();

  return new Event({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : false,
    },
  });
};
