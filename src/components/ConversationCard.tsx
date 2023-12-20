import { useNavigate, useParams } from "react-router-dom";
import { ConversationCardProps } from "../interfaces/conversation";
import { useDispatch } from "react-redux";
import { setIsOpen } from "../store/slices/menuSlice";

const ConversationCard: React.FC<ConversationCardProps> = ({
  title,
  conversationId,
}) => {
  const { conversationId: routeConversationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setIsOpen(false));
    navigate(`/${conversationId}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`text-gray-800 dark:text-gray-100 min-h-[50px] p-2 rounded-lg border border-red-500 text-xl whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer my-1 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out ${
        Number(routeConversationId) === conversationId
          ? "bg-gray-300 dark:bg-gray-700"
          : ""
      }`}>
      {title}
    </div>
  );
};

export default ConversationCard;
