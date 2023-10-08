import { DefaultUser } from 'next-auth';
import { DefaultSession } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken: string;
  }
  interface User extends DefaultUser {
    authToken: string;
    expiresIn: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    accessToken: string;
    expiresAt: number;
  }
}
