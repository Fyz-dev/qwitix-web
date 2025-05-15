'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { Paths } from '@/utils/paths';

const EventHeaderButton: FC = () => {
  return (
    <Button asChild>
      <Link href={Paths.Organizer.CreateEvent}>
        Create
        <Plus />
      </Link>
    </Button>
  );
};

export default EventHeaderButton;
