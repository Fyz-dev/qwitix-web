'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { useGoogleLoginUrlQuery } from '@/queries/hooks/account';
import { Paths } from '@/utils/paths';

const LoginButton: FC = () => {
  const router = useRouter();
  const pathName = usePathname();

  const {
    data: {
      data: { url },
    },
  } = useGoogleLoginUrlQuery({
    returnUrl: `${Paths.BaseUrl}${pathName}`,
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
