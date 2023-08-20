export interface Photo {
  fieldname: string;
  originalname: string;
  mimetype: string;
  buffer: string;
}
export interface Page {
  date: string;
  title: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
  pageId: string;
  photo?: Photo;
}

export interface CreatePagePayload {
  title: string;
  content?: string;
  date: string;
  photo?: File;
}
