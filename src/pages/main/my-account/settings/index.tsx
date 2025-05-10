import { FC } from 'react';

import SettingForm from './components/setting-form';

import { Separator } from '@/components/ui/separator';

const MyAccountSettingsPage: FC = () => {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground font-semibold">
            Manage your account settings
          </p>
        </div>
      </div>

      <Separator />

      <SettingForm />
    </div>
  );
};

export default MyAccountSettingsPage;
