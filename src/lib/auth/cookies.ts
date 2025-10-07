import { serialize } from 'cookie';

export const serializeAccessCookie = (accessToken: string, expiresIn: number) => {
  return serialize('access_token', accessToken, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: expiresIn,
  });
};

const ONE_MONTH = 2592000; // 30 * 24 * 60 * 60
export const serializeRefreshCookie = (refreshToken: string, maxAge: number = ONE_MONTH) => {
  return serialize('refresh_token', refreshToken, {
    httpOnly: true,
    path: '/api/auth/refresh', // only accessible by the refresh route
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: maxAge,
  });
};
