import { Ticket } from '@/gen/Ticket';

export const ticketQueryClient = (accessToken?: string) => {
  return new Ticket({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : false,
    },
  });
};
