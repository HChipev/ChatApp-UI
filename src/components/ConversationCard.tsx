import { useNavigate, useParams } from "react-router-dom";
import { ConversationCardProps } from "../interfaces/conversation";
import { useDispatch } from "react-redux";
import { setIsOpen } from "../store/slices/menuSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useDeleteConversationMutation,
  useShareConversationMutation,
} from "../store/slices/api/conversationApiSlice";
import { addNotification } from "../store/slices/notificationSlice";
import { useState } from "react";

const ConversationCard: React.FC<ConversationCardProps> = ({
  title,
  conversationId,
}) => {
  const { conversationId: routeConversationId } = useParams();
  const [isTextCopied, setIsTextCopied] = useState(false);
  const [deleteConversation] = useDeleteConversationMutation();
  const [shareConversation] = useShareConversationMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setIsOpen(false));
    navigate(`/${conversationId}`);
  };

  const handleDeleteConversation = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    try {
      const res = await deleteConversation(String(conversationId)).unwrap();

      navigate("/");

      dispatch(
        addNotification({
          id: Date.now(),
          type: "success",
          message: res.message,
        })
      );
    } catch (error) {
      dispatch(
        addNotification({
          id: Date.now(),
          type: "error",
          message: String(
            (error as { data: any }).data ?? "An error occurred!"
          ),
        })
      );
    }
  };

  const handleShareConversation = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    try {
      const res = await shareConversation(String(conversationId)).unwrap();

      navigator.clipboard.writeText(res.link);
      setIsTextCopied(true);

      setTimeout(() => {
        setIsTextCopied(false);
      }, 1000);
    } catch (error) {
      dispatch(
        addNotification({
          id: Date.now(),
          type: "error",
          message: String(
            (error as { data: any }).data ?? "An error occurred!"
          ),
        })
      );
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`text-gray-800 dark:text-gray-100 min-h-[50px] p-2 rounded-lg border border-red-500 text-xl overflow-hidden cursor-pointer my-1 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out ${
        Number(routeConversationId) === conversationId
          ? "bg-gray-300 dark:bg-gray-700"
          : ""
      }`}>
      <div className="flex items-center justify-between">
        <p className="whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </p>
        <div className="flex item items-center justify-center gap-3 text-base">
          <p
            className={`text-base flex items-center text-gray-600 dark:text-gray-300 transition-all duration-300 ease-in-out whitespace-nowrap ${
              isTextCopied ? "opacity-100 block" : "opacity-0 hidden"
            }`}>
            Link copied!
            <FontAwesomeIcon icon={["fas", "check"]} />
          </p>
          <FontAwesomeIcon
            onClick={handleShareConversation}
            className="hover:text-red-500 transition-all duration-300 ease-in-out"
            icon={["fas", "share"]}
          />
          <FontAwesomeIcon
            onClick={handleDeleteConversation}
            className="hover:text-red-500 transition-all duration-300 ease-in-out"
            icon={["fas", "trash"]}
          />
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;
