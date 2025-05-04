'use client';

import { User } from 'lucide-react';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

import Profile from './profile';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Paths } from '@/utils/paths';

interface SettingsPageProps extends PropsWithChildren {}

const SettingsPage: FC<SettingsPageProps> = () => {
  return (
    <div className="py-4">
      <div className="mb-3 flex flex-wrap items-center justify-between space-y-2 gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground font-semibold">
            Manage your account settings
          </p>
        </div>

        <Separator className="my-4 lg:my-6" />

        <div className="flex flex-1 flex-col space-y-2 overflow-hidden p-1 md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
          <aside className="top-0 lg:sticky lg:w-1/5">
            <Button asChild variant="ghost">
              <Link
                href={Paths.Organizer.Settings}
                className="bg-muted hover:bg-muted w-full justify-start"
              >
                <User />
                Profile
              </Link>
            </Button>
          </aside>
          <div className="flex w-full overflow-y-hidden">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
