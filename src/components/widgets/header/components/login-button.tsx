'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { useGoogleLoginUrlQuery } from '@/queries/hooks/account';
import { Paths } from '@/utils/paths';

const LoginButton: FC = () => {
  const router = useRouter();

  const {
    data: {
      data: { url },
    },
  } = useGoogleLoginUrlQuery({
    returnUrl: `${Paths.BaseUrl}`,
  });

  return (
    <Button
      onClick={() => {
        router.push(url);
      }}
      className="rounded-full"
    >
      Login with Google
    </Button>
  );
};

export default LoginButton;
