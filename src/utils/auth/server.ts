import axios from 'axios';

import { ResponseAccountDTO } from '@/gen/data-contracts';

export const authUserOnServer = async (account: ResponseAccountDTO) => {
  if (!account) return false;

  const response = await axios.post(
    '/api/auth/login',
    {},
    {
      headers: {
        Authorization: `Bearer ${account.token}`,
      },
    },
  );

  if (response.status === 200) return true;

  return false;
};

export const logoutUserOnServer = async () => {
  const response = await axios.post('/api/auth/logout', {});

  if (response.status === 200) return true;

  return false;
};
