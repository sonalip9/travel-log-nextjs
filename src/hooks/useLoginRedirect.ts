import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export const useLoginRedirect = () => {
  const router = useRouter();
  useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/login').catch((err) => console.error('Redirected:', err));
    },
  });
};
