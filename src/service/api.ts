import axios, { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';

import { LoginPayload, UserRes } from '@defs/auth';
import { JournalsListRes } from '@defs/journals';
import { UserJournal } from '@defs/journals';

const config = { baseURL: 'http://localhost:3001' };

const api = axios.create(config);

const authAPI = axios.create(config);

authAPI.interceptors.request.use(async (conf) => {
  try {
    const session = await getSession();

    if (session?.accessToken) {
      conf.headers.Authorization = `Bearer ${session?.accessToken}`;
    }
    return Promise.resolve(conf);
  } catch (err) {
    return Promise.reject(Error('Error in request interceptors', { cause: err }));
  }
});

authAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      if (error instanceof AxiosError && error.config && error.response?.status === 401) {
        if (error.config.url?.endsWith('refresh')) {
          return Promise.reject(error);
        }
        const res = await refreshAuth();

        if (res.status === 200) {
          await axios.get('/api/auth/session?update', {
            headers: { accessToken: res.data.accessToken },
          });

          error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;

          return authAPI.request(error.config);
        }
      }
    } catch (err) {
      return Promise.reject(err);
    }
  },
);

//  ======== Auth API ========
export const signIn = (credentials: LoginPayload) => api.post<UserRes>('/auth/login', credentials);

export const signUp = (credentials: LoginPayload) => api.post<UserRes>('/auth/signup', credentials);

const refreshAuth = async () => authAPI.get<UserRes>('auth/refresh');

//  ======== Journals API ========
export const getAllJournals = async () => authAPI.get<JournalsListRes>('/journals/all');

export const getJournalById = async (id: string) => authAPI.get<UserJournal>(`/journals/${id}`);
