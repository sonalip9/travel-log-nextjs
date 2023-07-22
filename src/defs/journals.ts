import { Page } from './pages';

export interface JournalsListRes {
  userJournals: UserJournal[];
}

export interface UserJournal {
  title: string;
  description: string;
  userId: string;
  pages: Page[];
  createdAt: Date;
  updatedAt: Date;
  journalId: string;
}

export interface CreateJournalPayload {
  title: string;
  description?: string;
}
