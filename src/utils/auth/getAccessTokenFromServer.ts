'use server';

import { cookies } from 'next/headers';

export const getAccessTokenFromServer = async () => {
  const cookieStore = await cookies();

  return cookieStore.get('session')?.value;
};
