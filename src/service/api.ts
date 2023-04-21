import axios from 'axios';
import { LoginPayload, UserRes } from '@defs/auth';

export const signIn = (credentials: LoginPayload) => api.post<UserRes>('/auth/login', credentials);
