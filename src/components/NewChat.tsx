import Chat from "../components/Chat";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentConversation,
  selectCurrentConversation,
} from "../store/slices/conversationSlice";
import { useEffect } from "react";

const NewChat = () => {
  const messages = useSelector(selectCurrentConversation);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCurrentConversation());
  }, []);

  return <Chat messages={messages} />;
};
export default NewChat;
