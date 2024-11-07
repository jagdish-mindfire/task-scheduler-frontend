import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const refreshToken = request.cookies.get('refreshToken');

    // Make the axios POST request
    const response = await axios.post(`${process.env.EXTERNAL_API_URL}/auth/token`, {
     refresh_token: refreshToken.value
    }, {
      headers: { 'Content-Type': 'application/json' },
    });

    const data = response.data;

    // Extract the refresh token from the response data
    const { access_token } = data;
  
    // Save refresh token in an HTTP-only cookie
    const res = NextResponse.json({ access_token });

    return res;
  } catch (error) {
    console.log("Error in login route:", error);
    // Handle different error responses
    const status = error.response ? error.response.status : 500;
    const message = error.response?.data?.message || 'Internal Server Error';
    return NextResponse.json({ message }, { status });
  }
}
