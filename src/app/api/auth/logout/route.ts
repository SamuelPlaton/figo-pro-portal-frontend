import { NextResponse } from 'next/server';
import { serializeAccessCookie, serializeRefreshCookie } from '@/lib/auth';

export async function POST() {
  // Delete Cookies

  const nextResponse = NextResponse.json(
    { success: true },
    {
      status: 200,
    },
  );

  nextResponse.headers.append('Set-Cookie', serializeAccessCookie('', 0));
  nextResponse.headers.append('Set-Cookie', serializeRefreshCookie('', 0));

  return nextResponse;
}
