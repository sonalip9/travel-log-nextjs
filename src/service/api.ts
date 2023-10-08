import axios, { AxiosError, AxiosResponse } from 'axios';
import { getSession, signOut } from 'next-auth/react';

import { LoginPayload, UserRes } from '@defs/auth';
import { CreateJournalPayload, JournalsListRes } from '@defs/journals';
import { UserJournal } from '@defs/journals';
import { CreatePagePayload } from '@defs/pages';

const config = { baseURL: 'http://localhost:3001' };

const api = axios.create(config);

const authAPI = axios.create(config);

authAPI.interceptors.request.use(async (conf) => {
  try {
    const session = await getSession();

    if (!session || !session?.accessToken) {
      await signOut();
      return Promise.reject(Error('Unauthorized'));
    }
    conf.headers.Authorization = `Bearer ${session.accessToken}`;

    return Promise.resolve(conf);
  } catch (err) {
    console.error(err);
    return Promise.reject(Error('Error in request interceptors', { cause: err }));
  }
});

authAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      if (error instanceof AxiosError && error.config && error.response?.status === 401) {
        await signOut();
        return Promise.reject(error);
      }
      return Promise.reject(error);
    } catch (err) {
      return Promise.reject(err);
    }
  },
);

//  ======== Auth API ========
export const signIn = (credentials: LoginPayload) => api.post<UserRes>('/auth/login', credentials);

export const signUp = (credentials: LoginPayload) => api.post<UserRes>('/auth/signup', credentials);

export const refreshAuth = async (token: string) =>
  api.get<UserRes>('auth/refresh', { headers: { Authorization: `Bearer ${token}` } });

//  ======== Journals API ========
export const getAllJournals = async () => authAPI.get<JournalsListRes>('/journals/all');

export const getJournalById = async (id: string) => authAPI.get<UserJournal>(`/journals/${id}`);

export const postCreateJournal = (payload: CreateJournalPayload) =>
  authAPI.post<UserJournal, AxiosResponse<UserJournal, CreateJournalPayload>>('journals', payload);

export const patchUpdateJournal = (id: string, payload: CreateJournalPayload) =>
  authAPI.patch<UserJournal, AxiosResponse<UserJournal, CreateJournalPayload>>(
    `journals/${id}`,
    payload,
  );

export const deleteJournal = (id: string) => authAPI.delete(`journals/${id}`);

// ======== Pages API ========
export const postCreatePage = (
  journalId: string,
  payload: CreatePagePayload,
): Promise<AxiosResponse<UserJournal, CreatePagePayload>> => {
  const formData = new FormData();
  const payloadKeys = Object.keys(payload) as (keyof CreatePagePayload)[];
  payloadKeys.forEach((key) => {
    if (!payload[key]) return;
    formData.append(key, payload[key] as string | File);
  });

  return authAPI.post(`/journals/${journalId}/pages`, formData);
};

export const patchUpdatePage = (
  journalId: string,
  pageId: string,
  payload: CreatePagePayload,
): Promise<AxiosResponse<UserJournal, CreatePagePayload>> => {
  const formData = new FormData();
  const payloadKeys = Object.keys(payload) as (keyof CreatePagePayload)[];
  payloadKeys.forEach((key) => {
    if (!payload[key]) return;
    formData.append(key, payload[key] as string | File);
  });

  return authAPI.patch(`/journals/${journalId}/pages/${pageId}`, formData);
};

export const deletePage = (journalId: string, pageId: string) =>
  authAPI.delete(`/journals/${journalId}/pages/${pageId}`);
