'use client';

import Link from 'next/link';
import { FC } from 'react';

import AuthDropdown from './components/auth-dropdown';
import CategoryNav from './components/category-nav';
import LoginButton from './components/login-button';

import { Button } from '@/components/ui/button';
import { useAuthUser } from '@/stores';
import { Paths } from '@/utils/paths';

const Header: FC = () => {
  const { user, logout } = useAuthUser(state => state);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="h-header container flex items-center justify-between px-4 md:px-6">
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

          <CategoryNav />
        </div>

        <div className="flex items-center">
          <Button
            className="text-muted-foreground text-base"
            variant="link"
            size="lg"
            asChild
          >
            <Link href={user ? Paths.Organizer.Events : Paths.Organizer.Login}>
              Organize Events
            </Link>
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
