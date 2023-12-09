import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentConversation,
  setCurrentConversation,
} from "../store/slices/conversationSlice";
import { useGetConversationMutation } from "../store/slices/api/conversationApiSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const CurrentConversation = () => {
  const conversation = useSelector(selectCurrentConversation);
  const { conversationId } = useParams();
  const [getConversation, { isLoading }] = useGetConversationMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const messages = await getConversation(conversationId).unwrap();

        dispatch(
          setCurrentConversation({
            conversation: messages,
            conversationId: conversationId,
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchConversation();
  }, [conversationId]);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      <Sidebar />
      {isLoading ? (
        <div className="flex flex-grow justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <Chat messages={conversation} />
      )}
    </div>
  );
};

export default CurrentConversation;
