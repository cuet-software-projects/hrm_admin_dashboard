export type FileType = {
  document_name: string;
  mime_type: string;
  size: number;
  file_path: string;
};

export type IDocument = FileType & {
  id: string;
  created_at: string;
};
