import { Transaction } from '@/gen/Transaction';
import { getAccessToken } from '@/utils/auth';

export const transactionQueryClient = () => {
  const accessToken = getAccessToken();

  return new Transaction({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : false,
    },
  });
};
