import { signIn as signInAPI } from 'next-auth/react';

import { signUp as signUpAPI } from '@service/api';

const signIn = (username?: string, password?: string) => {
  if (!username || !password) return Promise.reject();

  return signInAPI('credentials', { username, password, callbackUrl: '/' }).catch((err) =>
    console.error('sign in', err),
  );
};

const signUp = (username?: string, password?: string) => {
  if (!username || !password) return Promise.reject();
  return signUpAPI({ username, password })
    .then(async () => await signInAPI('credentials', { username, password, callbackUrl: '/' }))
    .catch((err) => console.error('sign up', err));
};

export const login = (selectedIndex: number, username?: string, password?: string) => {
  if (selectedIndex === 0) {
    return signIn(username, password);
  } else {
    return signUp(username, password);
  }
};
