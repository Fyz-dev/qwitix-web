import { House, Settings } from 'lucide-react';

import { NavItem } from './types';

import { Paths } from '@/utils/paths';

export const dataNavItem: NavItem[] = [
  {
    title: 'Home',
    url: Paths.Main.AccountDashboard,
    icon: House,
  },
  {
    title: 'Settings',
    url: Paths.Main.AccountSettingsProfile,
    icon: Settings,
  },
];
