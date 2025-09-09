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

    const { access_token, refresh_token, expires_in, id_token } = response.data;

    // Stockage access_token en HttpOnly cookie
    const cookie = serialize('access_token', access_token, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: expires_in, // en secondes
    });

    return NextResponse.json(
      { status: 200 },
      {
        status: 200,
        headers: { 'Set-Cookie': cookie, 'Content-Type': 'application/json' },
      },
    );
    // eslint-disable-next-line
  } catch (err: any) {
    console.error('ERROR', err.response);
    console.error('STATUS', err.response.status);
    return NextResponse.json({ data: err.response?.data }, { status: err.response?.status || 500 });
  }
}
