import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useAskQuestionMutation } from "../store/slices/api/conversationApiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewEntry,
  selectCurrentConversationId,
  selectCurrentConversationLoading,
} from "../store/slices/conversationSlice";
import { CircularProgress } from "@mui/material";
import { selectCurrentId } from "../store/slices/identitySlice";
import { useNavigate, useParams } from "react-router-dom";
import { addNotification } from "../store/slices/notificationSlice";

const ChatInput = () => {
  const [sendMessageClick, setSendMessageClick] = useState<boolean>(false);
  const loading = useSelector(selectCurrentConversationLoading);
  const userId = useSelector(selectCurrentId);
  const conversationId = useSelector(selectCurrentConversationId);
  const [message, setMessage] = useState("");
  const [askQuestion] = useAskQuestionMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { conversationId: paramsConversationId } = useParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    e.target.style.height = "1px";
    e.target.style.height = `${e.target.scrollHeight - 4}px`;
  };

  const handleSendMessage = async () => {
    try {
      if (message === "") {
        return;
      }

      setSendMessageClick(true);
      const question = message;
      setMessage("");

      const { conversationId: dbConversationId } = await askQuestion({
        Question: question,
        UserId: userId,
        ConversationId: conversationId,
      }).unwrap();

      if (Number(paramsConversationId) !== dbConversationId) {
        navigate(`/${dbConversationId}`);
      } else {
        dispatch(
          addNewEntry({
            message: { isFromUser: true, text: question },
          })
        );
      }
    } catch (error) {
      dispatch(
        addNotification({
          id: Date.now(),
          type: "error",
          message: String((error as { data: any }).data),
        })
      );
    } finally {
      setTimeout(() => {
        setSendMessageClick(false);
      }, 1000);
    }
  };

  return (
    <div className="flex items-center border-t border-gray-300 dark:border-gray-600 pt-4 px-10 transition-all">
      <div className="flex p-1 w-full items-end bg-none rounded-lg border border-red-500">
        <textarea
          value={message}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && loading !== true && !e.shiftKey) {
              e.preventDefault();
              const chatInput = document.getElementById("chat-input");
              if (chatInput) {
                chatInput.style.height = "1px";
              }

              return handleSendMessage();
            }
          }}
          placeholder="Type your message..."
          id="chat-input"
          className="flex-1 p-2 text-xl min-h-[44px] h-10 max-h-[200px] rounded-md bg-transparent outline-none focus:outline-none resize-none"
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
