import { NextRequest, NextResponse } from 'next/server';

import { accountQueryClient } from './queries/query-clients';
import { getAccessTokenFromServer } from './utils/auth';
import { Paths } from './utils/paths';

export async function middleware(request: NextRequest) {
  try {
    const token = await getAccessTokenFromServer();

    if (!token)
      return NextResponse.redirect(new URL(Paths.Unauthorized, request.url));

    const res = await accountQueryClient(token).isAuthorized();

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
