import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { serialize } from 'cookie';

// todo: automate refresh
export async function POST(req: NextRequest) {
  try {
    const { refresh_token } = await req.json(); // ou stocké côté serveur

    if (!refresh_token) throw new Error('No refresh token provided');

    const response = await axios.post(`${process.env.AUTH0_DOMAIN}/oauth/token`, {
      grant_type: 'refresh_token',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      refresh_token,
    });

    const { access_token, expires_in } = response.data;

    const cookie = serialize('access_token', access_token, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: expires_in,
    });

    return NextResponse.json({ access_token }, { headers: { 'Set-Cookie': cookie } });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.response?.data || err.message },
      { status: err.response?.status || 500 },
    );
  }
}
