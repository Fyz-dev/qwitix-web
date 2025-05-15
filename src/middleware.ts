import { NextRequest, NextResponse } from 'next/server';

import { getAccessTokenFromServer } from './utils/auth';
import { Paths } from './utils/paths';

export async function middleware(request: NextRequest) {
  try {
    let tokenSession = await getAccessTokenFromServer();

    if (!tokenSession) {
      const accountRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/account`,
        {
          credentials: 'include',
        },
      );

      const { token: receivedToken } = await accountRes.json();

      if (!receivedToken)
        return NextResponse.redirect(new URL(Paths.Unauthorized, request.url));

      tokenSession = receivedToken;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/account/authorize`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tokenSession}`,
        },
      },
    );

    if (res.status !== 200)
      return NextResponse.redirect(new URL(Paths.Unauthorized, request.url));

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL(Paths.Unauthorized, request.url));
  }
}

export const config = {
  matcher: ['/organizer/:path*', '/my-account/:path*'],
};
