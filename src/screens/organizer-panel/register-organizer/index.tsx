import Image from 'next/image';
import { FC } from 'react';

import RegisterForm from './register-form';

import { Card, CardContent } from '@/components/ui/card';

const RegisterOrganizerPage: FC = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="min-h-[476px] p-6 md:p-8">
                <div className="flex h-full flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Just one more step</h1>
                    <p className="text-muted-foreground text-balance">
                      Please provide the remaining information
                    </p>
                  </div>

                  <div className="flex h-full items-center justify-center">
                    <RegisterForm />
                  </div>
                </div>
              </div>
              <div className="relative hidden bg-gradient-to-br from-blue-700 to-blue-500 md:block">
                <Image
                  src="/assets/organizer-dashboard.png"
                  alt="organizer dashboard"
                  width={1000}
                  height={1000}
                  className="back absolute inset-0 top-[50%] left-[50%] -translate-y-1/2 scale-170 rounded-lg ring-4 ring-white/20"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-muted-foreground [&_a]:hover:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
            By clicking continue, you agree to our{' '}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterOrganizerPage;
