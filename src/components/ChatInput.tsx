import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useAskQuestionMutation } from "../store/slices/api/conversationApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewEntry,
  selectCurrentConversationLoading,
} from "../store/slices/conversationSlice";
import { CircularProgress } from "@mui/material";

const ChatInput = () => {
  const [sendMessageClick, setSendMessageClick] = useState<boolean>(false);
  const loading = useSelector(selectCurrentConversationLoading);
  const [message, setMessage] = useState("");
  const [askQuestion] = useAskQuestionMutation();
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    e.target.style.height = "1px";
    e.target.style.height = `${e.target.scrollHeight - 4}px`;
  };

  const handleSendMessage = () => {
    setSendMessageClick(true);
    dispatch(
      addNewEntry({
        message: { fromMe: true, text: message },
      })
    );
    askQuestion({ Question: message });
    setMessage("");

    setTimeout(() => {
      setSendMessageClick(false);
    }, 1000);
  };

  return (
    <div className="flex items-center border-t border-gray-300 dark:border-gray-600 pt-4 px-10 transition-all">
      <div className="flex p-1 w-full items-end bg-none rounded-lg border border-red-500">
        <textarea
          value={message}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && loading !== true) {
              e.preventDefault();
              return handleSendMessage();
            }
          }}
          placeholder="Type your message..."
          className="flex-1 p-2 text-xl min-h-[40px] h-10 max-h-[200px] rounded-md bg-transparent outline-none focus:outline-none resize-none"
        />
        <button
          disabled={loading}
          onClick={handleSendMessage}
          className="flex items-center justify-center ml-4 text-xl bg-none p-2 w-10 h-10 rounded-md focus:outline-none transition-all duration-150 ease-in-out">
          {loading ? (
            <CircularProgress style={{ width: "25px", height: "25px" }} />
          ) : (
            <FontAwesomeIcon
              className="text-gray-600 dark:text-gray-30 dark:hover:text-red-500 hover:text-red-500 transition-all duration-150 ease-in-out"
              icon={["far", "paper-plane"]}
              bounce={sendMessageClick}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
