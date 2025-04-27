import { Organizer } from '@/gen/Organizer';
import { getAccessToken } from '@/utils/auth';

export const organizerQueryClient = () => {
  const accessToken = getAccessToken();

  return new Organizer({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : false,
    },
  });
};
