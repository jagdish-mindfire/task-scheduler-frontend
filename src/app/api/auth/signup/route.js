import { NextResponse } from 'next/server';
import axios from 'axios';
export async function POST(request) {
  try {
    const { email, password,name } = await request.json();
    
    // Proxy the signup request to the external server
    const response = await axios.post(`${process.env.EXTERNAL_API_URL}/auth/signup`, { email, password,name },{
        headers: { 'Content-Type': 'application/json' },
    });

    const data =  response.data;


    const { message } = data;

    // Save refresh token in an HTTP-only cookie
    const res = NextResponse.json({ message });
    return res;
  } catch (error) {
    console.log("Error in login route:", error);
    // Handle different error responses
    const status = error.response ? error.response.status : 500;
    const message = error.response?.data?.message || 'Internal Server Error';
    return NextResponse.json({ message }, { status });
  }
}
