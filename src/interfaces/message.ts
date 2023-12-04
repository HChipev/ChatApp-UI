interface MessageProps {
  message: { fromMe: boolean; text: string };
}

interface MessagesProps {
  messages: MessageProps[];
}

interface conversationInitialState {
  currentConversation: MessageProps[];
}

export type { MessagesProps, MessageProps, conversationInitialState };
