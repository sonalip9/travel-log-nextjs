import { AxiosError } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { signIn } from '@/service/api';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  let authToken = '';
  let expiresAt = 0;

  return (await NextAuth(req, res, {
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
              authToken = response.data.accessToken;
              expiresAt = Date.now() + response.data.expiresIn * 1000;
              return {
                id: response.data.user.id,
                email: response.data.user.username,
              };
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
      jwt({ token }) {
        if (req.url?.endsWith('session?update')) {
          const { access_token, expires_in } = req.headers;
          token.accessToken = access_token as string;
          token.expiresAt = Date.now() + Number(expires_in) * 1000;
        }
        if (authToken) {
          token.accessToken = authToken;
          token.expiresAt = expiresAt;
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
  })) as Promise<ReturnType<typeof NextAuth>>;
}
