'use client';

import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { useAuthUser } from '@/stores';

const SuccessBuyTicket: FC = () => {
  const user = useAuthUser(state => state.user);

  return (
    <div className="flex min-h-[calc(100svh-(var(--spacing-header)+112px))] items-center">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-primary text-5xl leading-tight font-bold">
          Congratulation!
        </h1>

        <Image
          src="/assets/congratulation.png"
          alt="congratulation"
          width={500}
          height={500}
        />

        {user ? (
          <>
            <span className="max-w-[500px] text-center text-2xl font-medium">
              You can see information about purchased tickets in your profile.
              We also sent tickets to
            </span>
            <p className="text-primary text-center text-xl font-medium">
              {user.email}
            </p>
          </>
        ) : (
          <span className="max-w-[500px] text-center text-2xl font-medium">
            After authorization, you will be able to view information about
            tickets in your profile or by email.
          </span>
        )}
        <div className="mt-6 flex gap-4">
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        <div className="mt-[100px] flex flex-col items-center gap-4">
          <span className="font-semibold">
            Having trouble receiving the tickets?
          </span>

          <div className="flex gap-8">
            <div className="text-primary flex items-center gap-2">
              <Phone className="size-5" />
              <Link href="tel:+3801234568888" className="font-semibold">
                +380 123 456 8888
              </Link>
            </div>
            <div className="text-primary flex items-center gap-2">
              <Mail className="size-5" />
              <Link href={`mailto:qwitix@qwitix.com`} className="font-semibold">
                qwitix@qwitix.com
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessBuyTicket;
