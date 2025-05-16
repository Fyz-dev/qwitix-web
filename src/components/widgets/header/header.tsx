'use client';

import Image from 'next/image';
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
    <header className="sticky top-0 z-50 w-full border-b">
      <div className="h-header bg-background container flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/logo.png"
              alt="QwiTix"
              width={250}
              height={250}
              className="size-20"
            />
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
