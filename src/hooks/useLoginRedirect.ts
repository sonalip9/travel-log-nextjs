import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const useLoginRedirect = () => {
  const router = useRouter();
  const { status, data } = useSession();

  useEffect(() => {
    if (!data?.user.email && status === 'unauthenticated') {
      router.replace('/login').catch((err) => console.error('Redirected:', err));
    }
  }, [data?.user, router, status]);
};
