import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { serialize } from 'cookie';
import { jwtVerify, createRemoteJWKSet } from 'jose';

export async function GET(req: NextRequest) {
  console.log('CALLBACK CALLED');
  const url = new URL(req.url);
  const error = url.searchParams.get('error');
  if (error) {
    const code = url.searchParams.get('error_description');
    return NextResponse.redirect(`http://localhost:3000/sign-in?error=${code}`);
  }
  const code = url.searchParams.get('code');
  const returnedState = url.searchParams.get('state');

  // Vérification du state
  const cookieStore = await cookies();
  const expectedState = cookieStore.get('auth_state')?.value;

  if (!code || returnedState !== expectedState) {
    return new NextResponse('Invalid state or missing code', { status: 400 });
  }

  // Échange du code contre des tokens
  const tokenRes = await fetch(`${process.env.AUTH0_DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      code,
      redirect_uri: 'http://localhost:3000/api/auth/callback',
      audience: process.env.AUTH0_AUDIENCE,
    }),
  });
  console.log('TOKEN RES', tokenRes);

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    return new NextResponse(`Token exchange failed: ${err}`, { status: 400 });
  }

  const tokens = await tokenRes.json(); // contient access_token, id_token, refresh_token
  let { id_token, access_token, refresh_token, expires_in } = tokens;

  const JWKS = createRemoteJWKSet(new URL(`${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`));
  const { payload: idPayload } = await jwtVerify(tokens.id_token, JWKS, {
    issuer: `${process.env.AUTH0_DOMAIN}/`,
    audience: process.env.AUTH0_CLIENT_ID,
  });
  console.log('ID PAYLOAD', idPayload);
  if (idPayload['https://figo.fr/needs_refresh']) {
    console.log('GO REFRESH');
    const refreshRes = await fetch(`${process.env.AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'refresh_token',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        refresh_token: refresh_token,
        audience: process.env.AUTH0_AUDIENCE,
      }),
    });
    const refreshedTokens = await refreshRes.json();
    id_token = refreshedTokens.id_token;
    access_token = refreshedTokens.access_token;
    console.log('access', access_token);
    refresh_token = refreshedTokens.refresh_token;
    expires_in = refreshedTokens.expires_in;
  }
  console.log('FINAL TOKENS!!!', { id_token, access_token, refresh_token, expires_in });

  const accessCookie = serialize('access_token', access_token, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: expires_in, // in seconds
  });
  const idCookie = serialize('id_token', id_token, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: expires_in, // one hour
  });
  const refreshCookie = serialize('refresh_token', refresh_token, {
    httpOnly: true,
    path: '/api/auth/refresh', // only accessible by the refresh route
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
  // 👉 Ici tu peux vérifier l’id_token (JWT) avec la lib `jose` pour plus de sécurité
  // const claims = decodeJwt(id_token);

  // Tu peux créer ta session (setCookie avec access_token/id_token)
  const nextResponse = NextResponse.redirect('http://localhost:3000/sign-up');
  nextResponse.headers.append('Set-Cookie', accessCookie);
  nextResponse.headers.append('Set-Cookie', refreshCookie);
  nextResponse.headers.append('Set-Cookie', idCookie);

  return nextResponse;
}
