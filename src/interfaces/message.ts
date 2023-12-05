interface MessageProps {
  message: { fromMe: boolean; text: string };
}

interface MessagesProps {
  messages: MessageProps[];
}

interface conversationInitialState {
  currentConversation: MessageProps[];
  currentConversationLoading: boolean;
}

export type { MessagesProps, MessageProps, conversationInitialState };
