import { FC } from 'react';

import ComingSoon from '@/components/widgets/coming-soon';

interface ManageEventProps {
  params: Promise<{ id: string }>;
}

const ManageEvent: FC<ManageEventProps> = async ({ params }) => {
  const { id } = await params;

  return <ComingSoon />;
};

export default ManageEvent;
