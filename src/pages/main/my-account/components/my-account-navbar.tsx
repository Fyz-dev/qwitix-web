'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';

import { dataNavItem } from '../data';
import { NavItem } from '../types';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useAuthUser } from '@/stores';

interface MyAccountNavbarProps extends PropsWithChildren {}

function checkIsActive(pathName: string, item: NavItem) {
  return pathName.startsWith(item.url);
}

const MyAccountNavbar: FC<MyAccountNavbarProps> = ({ children }) => {
  const { user } = useAuthUser(state => state);
  const pathName = usePathname() ?? '';

  if (!user) return null;

  const avatarFallback = user.fullName.slice(0, 2).toUpperCase();

  return (
    <div className="mt-14 flex gap-8">
      <Card className="w-full max-w-[300px]">
        <CardHeader>
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-20 w-20 rounded-lg">
              <AvatarImage src={user.imageUrl} alt={user.fullName} />
              <AvatarFallback className="rounded-lg">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-center">
              <span className="font-bold">{user.fullName}</span>
              <span className="text-muted-foreground text-sm">
                {user.email}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <span className="text-sm font-bold">My Account</span>
          <div className="flex flex-col gap-1">
            {dataNavItem.map(item => (
              <Button
                key={item.title}
                className={cn(
                  'justify-start',
                  checkIsActive(pathName, item) && 'bg-secondary',
                )}
                asChild
                variant="ghost"
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  {item.title}
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      {children}
    </div>
  );
};

export default MyAccountNavbar;
