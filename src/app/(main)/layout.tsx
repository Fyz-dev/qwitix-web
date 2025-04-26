import { ReactNode } from 'react';

import Header from '@/components/widgets/header';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="container">{children}</main>
    </>
  );
}
