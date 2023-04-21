import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    user: {
      email: string;
      id: string;
    } & DefaultUser;
  }
}
