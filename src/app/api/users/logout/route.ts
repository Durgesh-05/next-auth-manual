import { connectMongoDB } from '@/db';
import { NextRequest, NextResponse } from 'next/server';

connectMongoDB();
export const GET = async (req: NextRequest) => {
  try {
    const res = NextResponse.json(
      {
        message: 'User Loggedout Successfully',
        status: 200,
      },
      { status: 200 }
    );

    res.cookies.set('token', '', {
      httpOnly: true,
      sameSite: true,
    });

    return res;
  } catch (e: any) {
    console.error('Failed to logout user Error: ', e);
    return NextResponse.json(
      {
        message: 'Something Went Wrong!',
        status: 500,
        error: e.message,
      },
      { status: 500 }
    );
  }
};
