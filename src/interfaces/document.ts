interface Document {
  name: string;
  type?: number;
  bytes: string;
}

interface Documents {
  documents: Document[];
}

interface DocumentSimple {
  id: number;
  name: string;
  bytes: string;
  isDeleted: boolean;
}

interface DocumentsSimple {
  documents: DocumentSimple[];
}

export type { Document, Documents, DocumentSimple, DocumentsSimple };
