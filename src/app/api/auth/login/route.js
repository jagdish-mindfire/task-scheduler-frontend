import { NextResponse } from 'next/server';
import axios from 'axios';
import { endpoints } from '@/app/constants/endpoints';

export async function POST(request) {
  try {
    const bodyData = await request.json();

    // Make the axios POST request
    const response = await axios.post(
      process.env.EXTERNAL_API_URL + endpoints.LOGIN,
      {
        email: bodyData?.email,
        password: bodyData?.password,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const data = response.data;

    // Extract the refresh token from the response data
    const { refresh_token } = data;

    // Save refresh token in an HTTP-only cookie
    const res = NextResponse.json({ message: 'Login successful' });
    res.cookies.set('refreshToken', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: process.env.REFRESH_TOKEN_EXPIRY * 24 * 60 * 60, // Max-Age in seconds
      path: '/',
    });

    return res;
  } catch (error) {
    console.log('Error in login route:', error);
    // Handle different error responses
    const status = error.response ? error.response.status : 500;
    const message = error.response?.data?.message || 'Internal Server Error';
    return NextResponse.json({ message }, { status });
  }
}
