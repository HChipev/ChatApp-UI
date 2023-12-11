import { MessageProps } from "./message";

interface ConversationInitialState {
  currentConversation: MessageProps[];
  currentConversationLoading: boolean;
  currentConversationId: null | number;
}

interface ConversationCardProps {
  title: string;
  conversationId: number;
}

interface Conversation {
  title: string;
  conversationId: number;
  modifiedAtUtc: Date;
}

interface Conversations {
  conversations: Conversation[];
}

interface GroupedConversations {
  [key: string]: Conversation[];
}

export type {
  ConversationInitialState,
  ConversationCardProps,
  Conversation,
  Conversations,
  GroupedConversations,
};
