'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { FC } from 'react';

import { Checkbox } from '@/components/ui/checkbox';

const LiveEndedEvent: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const isChecked = searchParams?.get('live-ended') === 'true';

  const handleChange = (checked: boolean) => {
    const params = new URLSearchParams(searchParams?.toString());

    if (checked) {
      params.set('ended', 'true');
    } else {
      params.delete('ended');
    }

    params.delete('page');

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="live-ended"
          defaultChecked={isChecked}
          onCheckedChange={value => handleChange(Boolean(value))}
        />
        <label
          htmlFor="live-ended"
          className="text-sm leading-none font-medium capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Display live and ended events?
        </label>
      </div>
    </div>
  );
};

export default LiveEndedEvent;
