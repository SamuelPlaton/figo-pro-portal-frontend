import { NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { serialize } from 'cookie';

export async function GET() {
  try {
    const domain = process.env.AUTH0_DOMAIN;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/auth/callback`;
    const state = randomBytes(16).toString('hex');
    const nonce = randomBytes(16).toString('hex');

    const params = new URLSearchParams({
      client_id: clientId!,
      response_type: 'code',
      scope: 'openid profile email offline_access',
      redirect_uri: redirectUri,
      state,
      nonce,
      connection: 'google-oauth2',
      audience: process.env.AUTH0_AUDIENCE!,
    });

    const authUrl = `${domain}/authorize?${params.toString()}`;
    const response = NextResponse.redirect(authUrl);

    const stateCookie = serialize('auth_state', state, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    const nonceCookie = serialize('auth_nonce', nonce, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    response.headers.append('Set-Cookie', stateCookie);
    response.headers.append('Set-Cookie', nonceCookie);

    return response;

    // eslint-disable-next-line
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ data: err.response?.data }, { status: err.response?.status || 500 });
  }
}
