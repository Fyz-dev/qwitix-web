'use client';

import { FC, ReactNode, useEffect } from 'react';

import { Account } from '@/gen/Account';
import { useAuthUser } from '@/store';
import { authUserOnServer } from '@/utils/auth/server';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const login = useAuthUser(state => state.login);

  useEffect(() => {
    new Account({
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
      withCredentials: true,
    })
      .getAccount()
      .then(res => {
        login(res.data.user);

        authUserOnServer(res.data);
      })
      .catch(() => login(undefined));
  }, []);

  return children;
};

export default AuthProvider;
