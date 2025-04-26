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
import { useAuthUser } from '@/store';

const data = {
  navMain: [
    {
      title: 'Home',
      url: '#',
      icon: Home,
      isActive: true,
    },
    {
      title: 'Events',
      url: '#',
      icon: CalendarClock,
    },
    {
      title: 'Analytics',
      url: '#',
      icon: ChartSpline,
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
    },
  ],
};
export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const user = useAuthUser(state => state.user);

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <HomeButton />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
