import { ReactNode } from 'react';

import MyAccountNavbar from '@/pages/main/my-account/components/my-account-navbar';

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <MyAccountNavbar>{children}</MyAccountNavbar>;
}
