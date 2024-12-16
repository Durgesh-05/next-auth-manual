import { connectMongoDB } from '@/db';
import { User } from '@/models/user.model';
import { Signin } from '@/utils/types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

connectMongoDB();
export const POST = async (req: NextRequest) => {
  try {
    const { email, password }: Signin = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          message: 'Email not Found',
          status: 400,
        },
        { status: 400 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        {
          message: 'Incorrect Password',
          status: 400,
        },
        { status: 400 }
      );
    }

    const token = generateAcessToken(user._id, user.email, user.username);
    const res = NextResponse.json(
      {
        message: 'User LoggedIn Successfully',
        status: 200,
        success: true,
        token: token,
      },
      { status: 200 }
    );

    res.cookies.set('token', token, {
      httpOnly: true,
      sameSite: true,
    });

    return res;
  } catch (e: any) {
    console.error('Failed to login user Error: ', e);
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

const generateAcessToken = (
  _id: string,
  email: string,
  username: string
): string => {
  return jwt.sign(
    { _id, username, email },
    process.env.JWT_TOKEN_SECRET || '',
    {
      expiresIn: '1d',
    }
  );
};
