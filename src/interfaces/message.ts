interface MessageProps {
  message: { fromMe: boolean; text: string };
}

interface MessagesProps {
  messages: MessageProps[];
}

export type { MessagesProps, MessageProps };
