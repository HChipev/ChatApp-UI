import Chat from "../components/Chat";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentConversation,
  setCurrentConversation,
} from "../store/slices/conversationSlice";
import { useGetConversationMutation } from "../store/slices/api/conversationApiSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { addNotification } from "../store/slices/notificationSlice";

const OldChat = () => {
  const conversation = useSelector(selectCurrentConversation);
  const { conversationId } = useParams();
  const [getConversation, { isLoading }] = useGetConversationMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const data = await getConversation(conversationId).unwrap();

        dispatch(
          setCurrentConversation({
            conversation: data.messages,
            conversationId: conversationId,
          })
        );
      } catch (error) {
        dispatch(
          addNotification({
            id: Date.now(),
            type: "error",
            message: String((error as { data: any }).data),
          })
        );
        navigate("/", { replace: true });
      }
    };

    fetchConversation();
  }, [conversationId]);

  return (
    <>
      {isLoading ? (
        <div className="flex flex-grow justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <Chat messages={conversation} />
      )}
    </>
  );
};

export default OldChat;
