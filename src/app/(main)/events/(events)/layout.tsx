import { ReactNode } from 'react';

import EventsLayout from '@/pages/main/events/layout';

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <EventsLayout>{children}</EventsLayout>;
}
