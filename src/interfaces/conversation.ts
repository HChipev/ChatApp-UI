import { MessageProps } from "./message";

interface ConversationInitialState {
  currentConversation: MessageProps[];
  currentConversationLoading: boolean;
  currentConversationId: null | number;
}

interface ConversationCardProps {
  title: string;
  conversationId: number;
  modifiedAt: Date;
}

export type { ConversationInitialState, ConversationCardProps };
