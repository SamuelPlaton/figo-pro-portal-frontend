import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return axios
      .post(`${process.env.AUTH0_DOMAIN}/dbconnections/signup`, {
        client_id: process.env.AUTH0_CLIENT_ID,
        connection: 'Username-Password-Authentication',
        ...body,
      })
      .then(response => {
        return NextResponse.json(response.data);
      })
      .catch((err: AxiosError) => {
        console.log('ERR', err.response?.data);
        return NextResponse.json(
          { error: err.response?.data || err.message },
          { status: err.response?.status || 500 },
        );
      });
    // eslint-disable-next-line
  } catch (err: any) {
    console.log('ERR 2', err);
    return NextResponse.json(
      { error: err.response?.data || err.message },
      { status: err.response?.status || 500 },
    );
  }
}
