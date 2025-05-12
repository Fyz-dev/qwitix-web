import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { accountQueryClient } from '@/queries/query-clients';
import { getAccessTokenFromServer } from '@/utils/auth';
import { Paths } from '@/utils/paths';

const LoginOrganizer: FC = async () => {
  const {
    data: { url: googleLoginUrl },
  } = await accountQueryClient(
    await getAccessTokenFromServer(),
  ).getGoogleLoginUrl({
    returnUrl: `${Paths.BaseUrl}${Paths.Organizer.Events}`,
  });

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form className="min-h-[476px] p-6 md:p-8">
                <div className="flex h-full flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground text-balance">
                      To continue, sign in with Google
                    </p>
                  </div>

                  <div className="flex h-full items-center justify-center">
                    <Button asChild className="w-full">
                      <Link href={googleLoginUrl}>
                        <div className="rounded-full bg-white p-1">
                          <svg
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                          >
                            <g>
                              <path
                                fill="#EA4335"
                                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                              ></path>
                              <path
                                fill="#4285F4"
                                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                              ></path>
                              <path
                                fill="#FBBC05"
                                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                              ></path>
                              <path
                                fill="#34A853"
                                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                              ></path>
                              <path fill="none" d="M0 0h48v48H0z"></path>
                            </g>
                          </svg>
                        </div>
                        Login with Google
                      </Link>
                    </Button>
                  </div>
                </div>
              </form>
              <div className="bg-muted relative hidden md:block">
                <Image
                  src="/assets/placeholder.svg"
                  alt="Image"
                  width={1000}
                  height={1000}
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
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

export default LoginOrganizer;
