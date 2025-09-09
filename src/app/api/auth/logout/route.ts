import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  // Supprime le cookie
  const cookie = serialize('access_token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0, // expire immédiatement
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });

  return NextResponse.json(
    { success: true },
    {
      status: 200,
      headers: { 'Set-Cookie': cookie },
    },
  );
}
