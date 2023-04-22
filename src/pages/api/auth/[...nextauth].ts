import { AxiosError } from 'axios';
import { NextApiResponse, NextApiRequest } from 'next';
import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { signIn } from '@/service/api';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await NextAuth(req, res, {
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
                accessToken: response.data.accessToken,
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
        if (req.url?.endsWith('session?update')) {
          const { accessToken } = req.headers;
          token.accessToken = accessToken;
        }
        if (user && 'accessToken' in user && user.accessToken) {
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
}
