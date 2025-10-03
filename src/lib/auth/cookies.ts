import { serialize } from 'cookie';

export const serializeIdCookie = (idToken: string, expiresIn: number) => {
  return serialize('id_token', idToken, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: expiresIn,
  });
};

export const serializeAccessCookie = (accessToken: string, expiresIn: number) => {
  return serialize('access_token', accessToken, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: expiresIn,
  });
};

export const serializeRefreshCookie = (refreshToken: string) => {
  return serialize('refresh_token', refreshToken, {
    httpOnly: true,
    path: '/api/auth/refresh', // only accessible by the refresh route
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
};
