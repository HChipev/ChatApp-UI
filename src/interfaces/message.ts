interface MessageProps {
  message: {
    isFromUser: boolean;
    text: string;
    currentMessageLoading: boolean;
  };
}

interface MessagesProps {
  messages: MessageProps[];
}

export type { MessagesProps, MessageProps };
