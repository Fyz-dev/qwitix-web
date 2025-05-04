import { Transaction } from '@/gen/Transaction';

export const transactionQueryClient = (accessToken?: string) => {
  return new Transaction({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : false,
    },
  });
};
