import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { serialize } from 'cookie';

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
    const { access_token, refresh_token, expires_in } = response.data;

    // Stockage access_token en HttpOnly cookie
    const accessCookie = serialize('access_token', access_token, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: expires_in, // in seconds
    });

    const refreshCookie = serialize('refresh_token', refresh_token, {
      httpOnly: true,
      path: '/api/auth/refresh', // only accessible by the refresh route
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    const nextResponse = NextResponse.json(
      { status: 200 },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    nextResponse.headers.append('Set-Cookie', accessCookie);
    nextResponse.headers.append('Set-Cookie', refreshCookie);

    return nextResponse;
    // eslint-disable-next-line
  } catch (err: any) {
    return NextResponse.json({ data: err.response?.data }, { status: err.response?.status || 500 });
  }
}
