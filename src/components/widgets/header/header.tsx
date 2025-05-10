'use client';

import Link from 'next/link';
import { FC } from 'react';

import AuthDropdown from './components/auth-dropdown';
import LoginButton from './components/login-button';

import { Button } from '@/components/ui/button';
import { useAuthUser } from '@/stores';

const navItems = [
  { name: 'MLB', href: '/mlb' },
  { name: 'NHL', href: '/nhl' },
  { name: 'NBA', href: '/nba' },
  { name: 'NFL', href: '/nfl' },
  { name: 'Concerts', href: '/concerts' },
  { name: 'Other', href: '/other' },
];

const Header: FC = () => {
  const { user, logout } = useAuthUser(state => state);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            {/* <Image
              src="/logo.svg"
              alt="TickPick"
              width={40}
              height={40}
              className="h-10 w-10"
            /> */}
            <span className="text-5xl font-bold">QwiTix</span>
          </Link>

          <nav className="hidden items-center md:flex">
            {navItems.map(item => (
              <Button
                className="text-muted-foreground"
                key={item.name}
                variant="link"
                asChild
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </nav>
        </div>

        <div className="flex items-center">
          <Button
            className="text-muted-foreground text-base"
            variant="link"
            size="lg"
            asChild
          >
            <Link href="/login-organizer">Organize Events</Link>
          </Button>

          {user ? (
            <AuthDropdown user={user} logout={logout} />
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
