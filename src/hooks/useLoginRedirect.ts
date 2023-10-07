import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const useLoginRedirect = () => {
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/login');
    },
  });

  return session;
};
