import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { serialize } from 'cookie';

// todo: !!! auth0 verified email guard
// todo: !!! SSO Onboarding flow + guard onboarding not done, see for global guards (GUARDS SCHEME)
export async function GET(req: NextRequest) {
  try {
    const domain = process.env.AUTH0_DOMAIN;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const redirectUri = 'http://localhost:3000/api/auth/callback';
    const state = randomBytes(16).toString('hex');
    const nonce = randomBytes(16).toString('hex');

    const params = new URLSearchParams({
      client_id: clientId!,
      response_type: 'code',
      scope: 'openid profile email offline_access',
      redirect_uri: redirectUri,
      state,
      nonce,
      connection: 'google-oauth2', //'google-oauth2',
      audience: process.env.AUTH0_AUDIENCE!,
    });

    const authUrl = `${domain}/authorize?${params.toString()}`;
    console.log('AUTH URL', authUrl);
    const nextResponse = NextResponse.redirect(authUrl);

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
    nextResponse.headers.append('Set-Cookie', stateCookie);
    nextResponse.headers.append('Set-Cookie', nonceCookie);

    return NextResponse.redirect(authUrl);

    // eslint-disable-next-line
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ data: err.response?.data }, { status: err.response?.status || 500 });
  }
}
