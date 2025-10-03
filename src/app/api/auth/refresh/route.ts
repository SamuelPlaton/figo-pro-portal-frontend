import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';
import { serializeAccessCookie, serializeIdCookie } from '@/lib/auth';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refresh_token = cookieStore.get('refresh_token')?.value;

    if (!refresh_token) throw new Error('No refresh token provided');

    const response = await axios.post(`${process.env.AUTH0_DOMAIN}/oauth/token`, {
      grant_type: 'refresh_token',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      refresh_token,
    });

    const { access_token, id_token, expires_in } = response.data;

    const nextResponse = NextResponse.json(
      { access_token },
      { headers: { 'Content-Type': 'application/json' } },
    );

    const accessCookie = serializeAccessCookie(access_token, expires_in);
    const idCookie = serializeIdCookie(id_token, expires_in);
    nextResponse.headers.append('Set-Cookie', accessCookie);
    nextResponse.headers.append('Set-Cookie', idCookie);

    return nextResponse;
    // eslint-disable-next-line
  } catch (err: any) {
    return NextResponse.json(
      { error: err.response?.data || err.message },
      { status: err.response?.status || 500 },
    );
  }
}
