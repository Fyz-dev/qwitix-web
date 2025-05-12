'use client';

import { CalendarClock, ChartSpline, Home, Settings2 } from 'lucide-react';
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
import { useOrganizerStore } from '@/pages/organizer-panel/providers/organizer-provider';
import { useAuthUser } from '@/stores';
import { Paths } from '@/utils/paths';

const data = {
  navMain: [
    {
      title: 'Home',
      url: Paths.Organizer.Home,
      icon: Home,
      isActive: true,
    },
    {
      title: 'Events',
      url: Paths.Organizer.Events,
      icon: CalendarClock,
    },
    {
      title: 'Analytics',
      url: Paths.Organizer.Analytics,
      icon: ChartSpline,
    },
    {
      title: 'Settings',
      url: Paths.Organizer.Settings,
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const user = useAuthUser(state => state.user);
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
        {user && organizer && <NavUser user={user} organizer={organizer} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
