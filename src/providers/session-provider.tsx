'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useRef,
} from 'react';

import { Account } from '@/gen/Account';
import { useAuthUser } from '@/stores';
import { authUserOnServer } from '@/utils/auth/server';
import { Paths } from '@/utils/paths';

interface SessionContextProps {
  token?: string;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined,
);

export const SessionProvider: React.FC<{
  children: ReactNode;
  token?: string;
}> = ({ children, token }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenRef = useRef<string | undefined>(token);

  const login = useAuthUser(state => state.login);

  useEffect(() => {
    new Account({
      baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
      withCredentials: true,
    })
      .getAccount()
      .then(async res => {
        login(res.data.user);

        await authUserOnServer(res.data);

        const params = new URLSearchParams(searchParams.toString());
        const isRedirectToOrganizer = params.get('redirect') === 'organizer';

        params.delete('redirect');

        if (isRedirectToOrganizer) {
          router.push(Paths.Organizer.Events);
        } else {
          router.replace(`?${params.toString()}`);
        }
      })
      .catch(() => login(undefined));
  }, []);

  return (
    <SessionContext.Provider value={{ token: tokenRef.current }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextProps => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
