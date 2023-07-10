import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';

import { signUp } from '@service/api';

export const useHandleLogin = ({
  username,
  password,
  selectedIndex,
}: {
  username?: string;
  password?: string;
  selectedIndex: number;
}) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSingIn = useCallback(() => {
    if (!username || !password) return;
    setLoading(true);
    signIn('credentials', { username, password, callbackUrl: '/' })
      .catch((err) => console.error('sign in', err))
      .finally(() => setLoading(false));
  }, [username, password]);

  const handleSignUp = useCallback(() => {
    if (!username || !password) return;
    setLoading(true);
    signUp({ username, password })
      .then(async () => await signIn('credentials', { username, password, callbackUrl: '/' }))
      .catch((err) => console.error('sign in', err))
      .finally(() => setLoading(false));
  }, [username, password]);

  const handleLogin = useCallback(() => {
    if (selectedIndex === 0) {
      handleSingIn();
    } else {
      handleSignUp();
    }
  }, [handleSignUp, handleSingIn, selectedIndex]);

  return { isLoading, handleLogin };
};
