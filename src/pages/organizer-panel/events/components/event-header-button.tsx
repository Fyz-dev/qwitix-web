'use client';

import { Plus } from 'lucide-react';
import { FC } from 'react';

import { useEventStore } from '../providers/event-store-provider';

import { Button } from '@/components/ui/button';

const EventHeaderButton: FC = () => {
  const { setOpen } = useEventStore(state => state);

  return (
    <Button onClick={() => setOpen('create')}>
      Create
      <Plus />
    </Button>
  );
};

export default EventHeaderButton;
