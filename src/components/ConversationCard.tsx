import { ConversationCardProps } from "../interfaces/conversation";

const ConversationCard: React.FC<ConversationCardProps> = ({
  title,
  modifiedAt,
  conversationId,
}) => {
  return (
    <div className="text-gray-800 dark:text-gray-100 min-h-[50px] p-2 rounded-lg border border-red-500 text-xl overflow-hidden text-ellipsis cursor-pointer my-1 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out">
      {title}
    </div>
  );
};

export default ConversationCard;
