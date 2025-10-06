import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';
import { serializeAccessCookie } from '@/lib/auth';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refresh_token = cookieStore.get('refresh_token')?.value;

    if (!refresh_token) throw new Error('No refresh token provided');

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      refresh_token,
    });

    const { access_token, expires_in } = response.data;

    const nextResponse = NextResponse.json(
      { access_token },
      { headers: { 'Content-Type': 'application/json' } },
    );

    const accessCookie = serializeAccessCookie(access_token, expires_in);
    nextResponse.headers.append('Set-Cookie', accessCookie);

    return nextResponse;
    // eslint-disable-next-line
  } catch (err: any) {
    return NextResponse.json(
      { error: err.response?.data || err.message },
      { status: err.response?.status || 500 },
    );
  }
}
