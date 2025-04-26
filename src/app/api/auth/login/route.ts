import { jwtDecode } from 'jwt-decode';
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';

interface JwtPayload {
  exp?: number;
  [key: string]: unknown;
}

export async function POST() {
  const headersList = await headers();
  const authorization = headersList.get('Authorization');

  if (!authorization?.startsWith('Bearer '))
    return NextResponse.json({}, { status: 401 });

  const token = authorization.split('Bearer ')[1];

  let decoded: JwtPayload;
  try {
    decoded = jwtDecode<JwtPayload>(token);
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  if (!decoded?.exp)
    return NextResponse.json(
      { error: 'No expiration in token' },
      { status: 400 },
    );

  const maxAge = decoded.exp - Math.floor(Date.now() / 1000);

  if (maxAge <= 0)
    return NextResponse.json({ error: 'Token expired' }, { status: 400 });

  const cookieStore = await cookies();

  cookieStore.set({
    name: 'session',
    value: token,
    maxAge: decoded.exp,
    httpOnly: true,
    secure: true,
  });

  return NextResponse.json(
    { message: 'Logged in successfully' },
    { status: 200 },
  );
}
