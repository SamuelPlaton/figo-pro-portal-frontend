import { NextRequest } from 'next/server';
import axios from 'axios';
import { serializeAccessCookie, serializeRefreshCookie } from '@/lib/auth';
import { NextApiResponse } from 'next';

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const body = await req.json();
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, body);
    const { access_token, refresh_token, expires_in } = response.data.data;
    res.setHeader('Set-Cookie', serializeRefreshCookie(refresh_token));
    res.setHeader('Set-Cookie', serializeAccessCookie(access_token, expires_in));
    res.status(200).json({ access_token: access_token });
    // eslint-disable-next-line
  } catch (err: any) {
    res.status(err.response?.status || 500).json({ error: err.response?.data || err.message });
  }
}
