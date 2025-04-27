import { Account } from '@/gen/Account';
import { getAccessToken } from '@/utils/auth';

export const accountQueryClient = () => {
  const accessToken = getAccessToken();

  return new Account({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : false,
    },
    withCredentials: true,
  });
};
