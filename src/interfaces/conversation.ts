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

interface GenerateAnswer {
  Question: string;
  UserId: number | null | undefined;
  ConversationId: number | null;
  Sid: string | null;
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

interface GetConversationMessages {
  messages: Message[];
}
interface Message {
  text: string;
  isFromUser: boolean;
  currentMessageLoading: boolean;
}

export type {
  ConversationInitialState,
  ConversationCardProps,
  Conversation,
  Conversations,
  GroupedConversations,
  GenerateAnswer,
  GetConversationMessages,
  Message,
};
