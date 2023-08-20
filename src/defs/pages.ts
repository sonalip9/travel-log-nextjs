export interface Page {
  date: string;
  title: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
  pageId: string;
}

export interface CreatePagePayload {
  title: string;
  content?: string;
  date: string;
  photo?: File;
}
