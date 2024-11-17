import { connectMongoDB } from '@/db';
import { User } from '@/models/user.model';
import { NextRequest, NextResponse } from 'next/server';

connectMongoDB();

export const POST = async (req: NextRequest) => {
  try {
    const { token }: { token: string } = await req.json();

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({
        message: 'Invalid or Expired Token',
        status: 400,
      });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();
    return NextResponse.json({
      message: 'Email Verification Successfull',
      status: 200,
      success: true,
    });
  } catch (e: any) {
    console.error('Failed to handle email verification Error: ', e);
    return NextResponse.json({
      message: 'Something went wrong!',
      status: 500,
      error: e.message,
    });
  }
};
