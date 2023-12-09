import { useEffect, useRef } from "react";
import { MessagesProps } from "../interfaces/message";
import ChatInput from "./ChatInput";
import ReceivedMessage from "./RecivedMessage";
import SentMessage from "./SentMessage";

const Chat: React.FC<MessagesProps> = ({ messages }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col relative h-screen w-full p-4 bg-gray-100 dark:bg-gray-800">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-2 scrollable-y">
        {messages.map((entry, index) =>
          entry.message.isFromUser ? (
            <SentMessage key={index} message={entry.message} />
          ) : (
            <ReceivedMessage key={index} message={entry.message} />
          )
        )}
      </div>
      <ChatInput />
    </div>
  );
};

export default Chat;
