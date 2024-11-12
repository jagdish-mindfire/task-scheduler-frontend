import { NextResponse } from 'next/server';
import axios from 'axios';
import { endpoints } from '@/app/constants/endpoints';

export async function POST(request) {
  try {
    const refreshToken = request.cookies.get('refreshToken');
    console.log('Refreshing', refreshToken);
    // Make the axios POST request
    const response = await axios.post(process.env.EXTERNAL_API_URL + endpoints.TOKEN, {
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
