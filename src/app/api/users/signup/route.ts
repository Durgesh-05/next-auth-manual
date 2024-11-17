import { connectMongoDB } from '@/db';
import { User } from '@/models/user.model';
import { sendEmail } from '@/utils/mail';
import { EmailType, Signup } from '@/utils/types';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

connectMongoDB();
export const POST = async (req: NextRequest) => {
  try {
    const { email, password, username }: Signup = await req.json();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({
        message: 'User Registered Already',
        status: 400,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      username,
      password: hashPassword,
    });

    const hashToken = await bcrypt.hash(user._id.toString(), 10);

    user.verifyToken = hashToken;

    user.verifyTokenExpiry = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    await sendEmail({
      username: username,
      email: email,
      emailType: EmailType.Verify,
      link: `${process.env.DOMAIN}/api/users/verify/${hashToken}`,
    });

    return NextResponse.json({
      message: 'Verification Email Sent',
      status: 200,
      success: true,
      user: {
        id: user._id,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (e: any) {
    console.error('Failed to handle user registration Error: ', e);
    return NextResponse.json({
      message: 'Something Went Wrong!',
      status: 500,
      error: e.message,
    });
  }
};
