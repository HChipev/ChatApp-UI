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

interface DocumentTableProps {
  isRefetchTriggered: boolean;
}

export type {
  Document,
  Documents,
  DocumentSimple,
  DocumentsSimple,
  DocumentTableProps,
};
