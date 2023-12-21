import { useEffect, useRef } from "react";
import { MessagesProps } from "../interfaces/message";
import ChatInput from "./ChatInput";
import ReceivedMessage from "./RecivedMessage";
import SentMessage from "./SentMessage";
import { useSelector } from "react-redux";
import { selectCurrentId } from "../store/slices/identitySlice";

const Chat: React.FC<MessagesProps> = ({ conversationUserId, messages }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const userId = useSelector(selectCurrentId);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col relative h-full w-full p-4 bg-gray-100 dark:bg-gray-800">
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
      {(Number(userId) === Number(conversationUserId) ||
        conversationUserId === null) && <ChatInput />}
    </div>
  );
};

export default Chat;
