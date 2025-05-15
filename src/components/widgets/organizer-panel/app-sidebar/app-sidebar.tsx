'use client';

import { CalendarClock, Settings2 } from 'lucide-react';
import { ComponentProps } from 'react';

import { HomeButton } from './home-button';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useOrganizerStore } from '@/screens/organizer-panel/providers/organizer-provider';
import { useAuthUser } from '@/stores';
import { Paths } from '@/utils/paths';

const data = {
  navMain: [
    // {
    //   title: 'Home',
    //   url: Paths.Organizer.Home,
    //   icon: Home,
    //   isActive: true,
    // },
    {
      title: 'Events',
      url: Paths.Organizer.Events,
      icon: CalendarClock,
    },
    // {
    //   title: 'Analytics',
    //   url: Paths.Organizer.Analytics,
    //   icon: ChartSpline,
    // },
    {
      title: 'Settings',
      url: Paths.Organizer.SettingsProfile,
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuthUser(state => state);
  const organizer = useOrganizerStore(state => state.organizer);

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <HomeButton />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {user && organizer.id && (
          <NavUser logout={logout} user={user} organizer={organizer} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
