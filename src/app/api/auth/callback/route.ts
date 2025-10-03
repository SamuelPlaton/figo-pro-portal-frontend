import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ROUTES } from '@/types';
import { serializeAccessCookie, serializeIdCookie, serializeRefreshCookie } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const baseRedirectUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}${ROUTES.SIGNIN}`;

  // sso based-errors
  const error = url.searchParams.get('error');
  if (error) {
    return NextResponse.redirect(`${baseRedirectUrl}?error=${error}`);
  }

  // state matching errors
  const code = url.searchParams.get('code');
  const returnedState = url.searchParams.get('state');
  const cookieStore = await cookies();
  const expectedState = cookieStore.get('auth_state')?.value;
  if (!code || returnedState !== expectedState) {
    return NextResponse.redirect(`${baseRedirectUrl}?error=INVALID_STATE`);
  }

  // Exchange code for toke ns
  const tokenRes = await fetch(`${process.env.AUTH0_DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      code,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/auth/callback`,
      audience: process.env.AUTH0_AUDIENCE,
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(`${baseRedirectUrl}?error=TOKEN_FAILED`);
  }

  const tokens = await tokenRes.json();
  const { id_token, access_token, refresh_token, expires_in } = tokens;

  // Redirect to onboarding on success
  const nextResponse = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_APP_BASE_URL}${ROUTES.SIGNUP}`,
  );

  const accessCookie = serializeAccessCookie(access_token, expires_in);
  const idCookie = serializeIdCookie(id_token, expires_in);
  const refreshCookie = serializeRefreshCookie(refresh_token);
  nextResponse.headers.append('Set-Cookie', accessCookie);
  nextResponse.headers.append('Set-Cookie', refreshCookie);
  nextResponse.headers.append('Set-Cookie', idCookie);

  return nextResponse;
}
