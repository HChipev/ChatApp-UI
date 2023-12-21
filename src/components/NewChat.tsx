import Chat from "../components/Chat";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentConversation,
  selectCurrentConversation,
  selectCurrentConversationUserId,
} from "../store/slices/conversationSlice";
import { useEffect } from "react";

const NewChat = () => {
  const messages = useSelector(selectCurrentConversation);
  const conversationUserId = useSelector(selectCurrentConversationUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCurrentConversation());
  }, []);

  return <Chat conversationUserId={conversationUserId} messages={messages} />;
};
export default NewChat;
