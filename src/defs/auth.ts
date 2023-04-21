export interface LoginPayload {
  username: string,
  password: string
}

export interface UserRes {
  accessToken: string;
  expiresIn: number;
  user: User;
}

interface User {
  id: string;
  username: string;
}
