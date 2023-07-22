export interface Page {
  date: Date;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  pageId: string;
}

export interface CreatePagePayload {
  title: string;
  description?: string;
  date: Date;
}
