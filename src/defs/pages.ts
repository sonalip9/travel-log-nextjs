export interface Page {
  date: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  pageId: string;
}

export interface CreatePagePayload {
  title: string;
  description?: string;
  date: string;
}
