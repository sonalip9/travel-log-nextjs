export const STATES = {
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
};

export type State = (typeof STATES)[keyof typeof STATES];
