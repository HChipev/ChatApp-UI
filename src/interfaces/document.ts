import { UseQueryHookResult } from "@reduxjs/toolkit/dist/query/react/buildHooks";

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
}

interface DocumentsSimple {
  documents: DocumentSimple[];
}

export type { Document, Documents, DocumentSimple, DocumentsSimple };
