import { AxiosError } from 'axios';
import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { refreshAuth, signIn } from '@/service/api';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const auth = NextAuth({
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

          const response = await signIn(credentials);

          if (response.data) {
            return {
              id: response.data.user.id,
              email: response.data.user.username,
              authToken: response.data.accessToken,
              expiresIn: response.data.expiresIn,
            } as User;
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
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.authToken;
        token.expiresAt = user.expiresIn * 1000 + Date.now();
        return token;
      }

      if (token.accessToken && token.expiresAt && token.expiresAt > Date.now() + 10 * 1000) {
        return token;
      }

      const res = await refreshAuth(token.accessToken);
      token.accessToken = res.data.accessToken;
      token.expiresAt = res.data.expiresIn * 1000 + Date.now();

      return token;
    },
  },
  pages: {
    // Changing the error redirect page to our custom login page
    error: '/login',
    signIn: '/login',
    signOut: '/login',
    newUser: '/login',
  },
  debug: process.env.NODE_ENV !== 'production',
});

export { auth as GET, auth as POST };
