import { connectMongoDB } from '@/db';
import { User } from '@/models/user.model';
import { getDataFromToken } from '@/utils/utils';
import { NextRequest, NextResponse } from 'next/server';

connectMongoDB();
export const GET = async (req: NextRequest) => {
  const _id = await getDataFromToken(req);
  const user = await User.findById(_id).select(
    '-password -verifyToken -verifyTokenExpiry -forgotPasswordToken -forgotPasswordTokenExpiry'
  );

  if (!user) {
    return NextResponse.json({ message: 'User not Found', status: 401 });
  }

  return NextResponse.json({
    message: 'User Data Fetched Successfully',
    status: 200,
    success: true,
    user,
  });
};
