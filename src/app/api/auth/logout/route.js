import { NextResponse } from 'next/server';
import axios from 'axios';
import { endpoints } from '@/app/constants/endpoints';

export async function POST(request) {
  try {
    // Get the refresh token from cookies
    const refreshToken = request.cookies.get('refreshToken');

    if (!refreshToken) {
      return NextResponse.json(
        { message: 'No refresh token found' },
        { status: 400 }
      );
    }

    // Call the external server's logout endpoint to invalidate the refresh token
   await axios.post(
      process.env.EXTERNAL_API_URL + endpoints.LOGOUT,
      { refresh_token: refreshToken.value },
      { headers: { 'Content-Type': 'application/json' } }
    );


    // Clear the refreshToken from cookies
    const res = NextResponse.json({ message: 'Logout successful' });
    res.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0, // Expire the cookie immediately
      path: '/',
    });

    return res;
  } catch (error) {
    console.error('Error in logout route:', error);
    const status = error.response ? error.response.status : 500;
    const message = error.response?.data?.message || 'Internal Server Error';
    return NextResponse.json({ message }, { status });
  }
}
