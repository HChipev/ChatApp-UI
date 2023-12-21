interface MessageProps {
  message: {
    isFromUser: boolean;
    text: string;
    currentMessageLoading: boolean;
  };
}

interface MessagesProps {
  messages: MessageProps[];
  conversationUserId: null | number;
}

export type { MessagesProps, MessageProps };
