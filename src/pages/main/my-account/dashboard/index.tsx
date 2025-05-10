'use client';

import { FC } from 'react';

import { Separator } from '@/components/ui/separator';

const MyAccountDashboardPage: FC = () => {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-x-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground font-semibold">
            View orders for your future and past events
          </p>
        </div>
      </div>

      <Separator />
    </div>
  );
};

export default MyAccountDashboardPage;
