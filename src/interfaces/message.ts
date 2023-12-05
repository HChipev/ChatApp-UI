interface MessageProps {
  message: {
    fromMe: boolean;
    text: string;
    currentMessageLoading: boolean;
  };
}

interface MessagesProps {
  messages: MessageProps[];
}

interface conversationInitialState {
  currentConversation: MessageProps[];
  currentConversationLoading: boolean;
}

export type { MessagesProps, MessageProps, conversationInitialState };
