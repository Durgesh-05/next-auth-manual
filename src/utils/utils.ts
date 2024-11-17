import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { Signup } from './types';

export const getDataFromToken = async (req: NextRequest) => {
  try {
    const payload = req.cookies.get('token')?.value || '';
    const data: any = jwt.verify(payload, process.env.JWT_TOKEN_SECRET || '');
    return data._id;
  } catch (e: any) {
    console.error('Failed to get data from Token Error: ', e);
  }
};
