interface Document {
  name: string;
  type?: number;
  bytes: string;
}

interface Documents {
  documents: Document[];
}

export type { Document, Documents };
