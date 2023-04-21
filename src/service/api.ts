import axios from 'axios';
import { LoginPayload, UserRes } from '@defs/auth';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    accept: `*//*`,
    'Content-Type': 'application/json',
  },
});

export const signIn = (credentials: LoginPayload) => api.post<UserRes>('/auth/login', credentials);

export const signUp = (credentials: LoginPayload) => api.post<UserRes>('/auth/signup', credentials);
