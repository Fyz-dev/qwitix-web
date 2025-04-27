import { Ticket } from '@/gen/Ticket';
import { getAccessToken } from '@/utils/auth';

export const ticketQueryClient = () => {
  const accessToken = getAccessToken();

  return new Ticket({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : false,
    },
  });
};
