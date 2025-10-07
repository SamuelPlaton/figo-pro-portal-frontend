import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { serializeAccessCookie, serializeRefreshCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users`, body);

    const { access_token, refresh_token, expires_in } = response.data.data;

    const nextResponse = NextResponse.json(
      { access_token: access_token },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const accessCookie = serializeAccessCookie(access_token, expires_in);
    const refreshCookie = serializeRefreshCookie(refresh_token);
    nextResponse.headers.append('Set-Cookie', accessCookie);
    nextResponse.headers.append('Set-Cookie', refreshCookie);

    return nextResponse;
    // eslint-disable-next-line
  } catch (err: any) {
    return NextResponse.json({ data: err.response?.data }, { status: err.response?.status || 500 });
  }
}
