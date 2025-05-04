import { create } from 'zustand';

import { ResponseUserDTO } from '@/gen/data-contracts';
import { logoutUserOnServer } from '@/utils/auth/server';

export interface AuthUserState {
  user?: ResponseUserDTO;
  login: (user?: ResponseUserDTO) => void;
  logout: () => void;
}

export const useAuthUser = create<AuthUserState>(set => ({
  user: undefined,
  login: (user?: ResponseUserDTO) => set({ user }),
  logout: () => {
    logoutUserOnServer();
    set({ user: undefined });
  },
}));
