'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Paths } from '@/utils/paths';

export function HomeButton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Link href={Paths.Organizer.Events}>
            <div className="text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
              <Image
                src="/assets/logo.png"
                alt="Qwitix"
                width={100}
                height={100}
                className="h-full w-full"
              />
            </div>
            <span className="truncate font-semibold">QwiTix</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
