import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    if (accessToken) {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return NextResponse.json({ authenticated: true, user: response.data.data });
    }
    return NextResponse.json({ authenticated: false, user: null });
  } catch (err) {
    console.error('JWT verification failed:', err);
    return NextResponse.json({ authenticated: false });
  }
}
