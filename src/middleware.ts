import { NextRequest, NextResponse } from 'next/server';

import { accountQueryClient } from './queries/query-clients';
import { getAccessTokenFromServer } from './utils/auth';
import { Paths } from './utils/paths';

export async function middleware(request: NextRequest) {
  try {
    let tokenSession = await getAccessTokenFromServer();

    if (!tokenSession) {
      const {
        data: { token },
      } = await accountQueryClient().getAccount();

      if (!token)
        return NextResponse.redirect(new URL(Paths.Unauthorized, request.url));

      tokenSession = token;
    }

    const res = await accountQueryClient(tokenSession).isAuthorized();

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
