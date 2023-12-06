import { useSelector } from "react-redux";
import { useGetUserConversationQuery } from "../store/slices/api/conversationApiSlice";
import { selectCurrentId } from "../store/slices/identitySlice";
import ConversationCard from "./ConversationCard";
import { ConversationCardProps } from "../interfaces/conversation";
import { CircularProgress } from "@mui/material";

const Conversations = () => {
  const userId = useSelector(selectCurrentId);
  const { data, isLoading, isFetching, isError } =
    useGetUserConversationQuery(userId);
  return (
    <div className="flex flex-col overflow-y-auto scrollable-y">
      {/* <p className="text-lg font-semibold mb-2">Today</p> */}
      {isLoading ? (
        <CircularProgress />
      ) : (
        data.conversations.map((conversation: ConversationCardProps) => (
          <ConversationCard
            key={conversation.conversationId}
            title={conversation.title}
            modifiedAt={conversation.modifiedAt}
            conversationId={conversation.conversationId}
          />
        ))
      )}
    </div>
  );
};

export default Conversations;
