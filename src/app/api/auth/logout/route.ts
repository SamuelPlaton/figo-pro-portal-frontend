import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  // Delete Cookies
  const accessCookie = serialize('access_token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });

  const refreshCookie = serialize('refresh_token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });

  const nextResponse = NextResponse.json(
    { success: true },
    {
      status: 200,
    },
  );
  nextResponse.headers.append('Set-Cookie', accessCookie);
  nextResponse.headers.append('Set-Cookie', refreshCookie);
  return nextResponse;
}
