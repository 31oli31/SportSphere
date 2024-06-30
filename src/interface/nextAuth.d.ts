import NextAuth from 'next-auth';
import { SessionUser } from '@/interface/user';

declare module 'next-auth' {
  interface User extends SessionUser {
    id: number;
  }
  interface Session {
    user: SessionUser;
  }
}
