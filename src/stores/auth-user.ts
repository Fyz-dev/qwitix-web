import { create } from 'zustand';

import { ResponseUserDTO } from '@/gen/data-contracts';
import { accountQueryClient } from '@/queries/query-clients';
import { getAccessTokenFromServer } from '@/utils/auth';
import { logoutUserOnServer } from '@/utils/auth/server';

export interface AuthUserStore {
  user?: ResponseUserDTO;
  login: (user?: ResponseUserDTO) => void;
  logout: () => void;
}

export const useAuthUser = create<AuthUserStore>(set => ({
  user: undefined,
  login: (user?: ResponseUserDTO) => set({ user }),
  logout: async () => {
    await accountQueryClient(await getAccessTokenFromServer()).logout();
    logoutUserOnServer();
    set({ user: undefined });
  },
}));
