import { useSelector } from "react-redux";
import { useGetUserConversationQuery } from "../store/slices/api/conversationApiSlice";
import { selectCurrentId } from "../store/slices/identitySlice";
import ConversationCard from "./ConversationCard";
import { ConversationCardProps } from "../interfaces/conversation";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { selectCurrentConversationId } from "../store/slices/conversationSlice";

const Conversations = () => {
  const userId = useSelector(selectCurrentId);
  const { data, isLoading, isFetching, isError, refetch } =
    useGetUserConversationQuery(userId);
  const currentConversationId = useSelector(selectCurrentConversationId);

  useEffect(() => {
    refetch();
  }, [currentConversationId]);

  return (
    <div className="flex flex-col flex-grow overflow-y-auto scrollable-y">
      {/* <p className="text-lg font-semibold mb-2">Today</p> */}
      {isLoading ? (
        <div className="flex min-w-full min-h-full justify-center items-center">
          <CircularProgress />
        </div>
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
