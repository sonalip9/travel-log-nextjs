import { AxiosError } from 'axios';
import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { signIn } from '@/service/api';

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials) return null;

          const res = await signIn(credentials);

          if (res.data) {
            return {
              id: res.data.user.id,
              email: res.data.user.username,
              accessToken: res.data.accessToken,
            } as User & { accessToken: string };
          }
          return null;
        } catch (err) {
          let errorMessage = 'An error occurred';
          if (err instanceof AxiosError) {
            errorMessage = err.message;
          }
          // Redirecting to the login page with error message in the URL
          throw new Error(`${errorMessage} & email=${credentials?.username ?? ''}`);
        }
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      session.accessToken = token.accessToken as string;

      return session;
    },
    jwt({ token, user }) {
      if (user && 'accessToken' in user && user?.accessToken) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
  },
  pages: {
    // Changing the error redirect page to our custom login page
    error: '/login',
    signIn: '/login',
  },
  debug: true,
});
