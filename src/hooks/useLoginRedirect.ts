import { RedirectType, redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const useLoginRedirect = () => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login', RedirectType.replace);
    },
  });

  return session;
};
