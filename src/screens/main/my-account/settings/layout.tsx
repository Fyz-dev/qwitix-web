'use client';

import { Palette, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Paths } from '@/utils/paths';

function checkIsActive(pathName: string, url: string) {
  return pathName.startsWith(url);
}

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname() || '';

  return (
    <div className="py-4">
      <div className="flex flex-wrap items-center justify-between gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground font-semibold">
            Manage your account settings
          </p>
        </div>

        <Separator className="my-4 lg:my-6" />

        <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
          <aside className="top-0 space-y-1 lg:sticky lg:w-1/5">
            <Button asChild variant="ghost">
              <Link
                href={Paths.Main.AccountSettingsProfile}
                className={cn(
                  'hover:bg-muted w-full justify-start',
                  checkIsActive(pathname, Paths.Main.AccountSettingsProfile) &&
                    'bg-muted',
                )}
              >
                <User />
                Profile
              </Link>
            </Button>

            <Button asChild variant="ghost">
              <Link
                href={Paths.Main.AccountSettingsAppearance}
                className={cn(
                  'hover:bg-muted w-full justify-start',
                  checkIsActive(
                    pathname,
                    Paths.Main.AccountSettingsAppearance,
                  ) && 'bg-muted',
                )}
              >
                <Palette />
                Appearance
              </Link>
            </Button>
          </aside>
          <div className="flex w-full overflow-y-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
