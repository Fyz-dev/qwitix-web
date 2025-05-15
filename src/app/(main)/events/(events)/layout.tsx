import { ReactNode } from 'react';

import EventsLayout from '@/screens/main/events/layout';

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <EventsLayout>{children}</EventsLayout>;
}
