'use client';

import { ReactNode } from 'react';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/widgets/organizer-panel/app-sidebar';
import { OrganizerStoreProvider } from '@/pages/organizer-panel/providers/organizer-provider';

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <OrganizerStoreProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger
                variant="outline"
                className="scale-125 sm:scale-100"
              />
              {/* <Separator orientation="vertical" className="!h-6" /> */}
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </OrganizerStoreProvider>
  );
}
