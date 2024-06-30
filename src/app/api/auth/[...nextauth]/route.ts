import { authOptions } from '@/middleware/auth/nextAuthConfig';
import NextAuth from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';

const auth: any = async (req: NextApiRequest, res: NextApiResponse) => {
  return await NextAuth(req, res, authOptions);
};

export { auth as GET, auth as POST };
