import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify, createRemoteJWKSet } from 'jose';

const JWKS = createRemoteJWKSet(new URL(`${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`));

export async function GET() {
  try {
    // Retrieve access token from cookie first
    const cookieStore = await cookies();
    const token = cookieStore.get('id_token')?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false, error: 'No access token' }, { status: 403 });
    }

    // Assert token validation
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `${process.env.AUTH0_DOMAIN}/`,
      audience: process.env.AUTH0_CLIENT_ID,
    });

    // Return user information
    return NextResponse.json({
      authenticated: true,
      user: {
        sub: payload.sub,
        email: payload.email,
        name: payload.name,
      },
    });
  } catch (err) {
    console.error('JWT verification failed:', err);
    return NextResponse.json(
      { authenticated: false, error: 'Invalid or expired token' },
      { status: 401 },
    );
  }
}
