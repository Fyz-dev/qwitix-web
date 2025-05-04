import { Account } from '@/gen/Account';

export const accountQueryClient = (accessToken?: string) => {
  return new Account({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
};
