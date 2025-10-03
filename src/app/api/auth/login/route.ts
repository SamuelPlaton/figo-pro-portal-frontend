import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { serializeAccessCookie, serializeIdCookie, serializeRefreshCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const response = await axios.post(`${process.env.AUTH0_DOMAIN}/oauth/token`, {
      grant_type: 'password',
      username: email,
      password: password,
      audience: process.env.AUTH0_AUDIENCE,
      scope: 'openid profile email offline_access',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
    });
    const { access_token, refresh_token, id_token, expires_in } = response.data;

    const nextResponse = NextResponse.json(
      { status: 200 },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const accessCookie = serializeAccessCookie(access_token, expires_in);
    const idCookie = serializeIdCookie(id_token, expires_in);
    const refreshCookie = serializeRefreshCookie(refresh_token);
    nextResponse.headers.append('Set-Cookie', accessCookie);
    nextResponse.headers.append('Set-Cookie', refreshCookie);
    nextResponse.headers.append('Set-Cookie', idCookie);

    return nextResponse;
    // eslint-disable-next-line
  } catch (err: any) {
    return NextResponse.json({ data: err.response?.data }, { status: err.response?.status || 500 });
  }
}
