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

export interface Page {
  date: Date;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  pageId: string;
}

export interface CreateJournalPayload {
  title: string;
  description?: string;
}
