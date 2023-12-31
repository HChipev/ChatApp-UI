import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  selectCurrentName,
  selectCurrentPicture,
} from "../store/slices/identitySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLogOutMutation } from "../store/slices/api/identityApiSlice";
import Conversations from "./Conversations";
import { useNavigate } from "react-router-dom";
import { clearCurrentConversation } from "../store/slices/conversationSlice";
import {
  selectCurrentWindowWidth,
  selectIsOpen,
} from "../store/slices/menuSlice";

const MessageBar = () => {
  const picture = useSelector(selectCurrentPicture);
  const name = useSelector(selectCurrentName);
  const isMenuOpen = useSelector(selectIsOpen);
  const windowWidth = useSelector(selectCurrentWindowWidth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logOutApiCall] = useLogOutMutation();

  const handleLogout = async () => {
    await logOutApiCall();

    dispatch(logOut());
  };

  const handleNewChat = () => {
    dispatch(clearCurrentConversation());
    navigate("/");
  };

  return (
    <div
      className={`flex flex-col 
     dark:bg-gray-900 sm:p-4 h-full transition-all duration-300 ease-in-out ${
       windowWidth &&
       windowWidth <= 640 &&
       (isMenuOpen
         ? "p-4 min-w-[300px] absolute top-0 left-14 z-30"
         : "w-0 absolute top-0 left-14 z-30")
     } sm:min-w-[300px] max-w-[300px]`}>
      <div className="flex flex-col overflow-y-auto flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              src={picture ?? undefined}
              alt="Profile"
              className="w-10 h-10 rounded-xl mr-2"
            />
            <div>
              <p className="text-2xl font-semibold text-ellipsis">{name}</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center ml-4 text-xl bg-none p-2 w-10 h-10 rounded-md focus:outline-none transition-all">
              <FontAwesomeIcon
                className="text-gray-600 dark:text-gray-300 dark:hover:text-red-500 hover:text-red-500"
                icon={["fas", "arrow-right-from-bracket"]}
              />
            </button>
          </div>
        </div>
        <Conversations />
      </div>
      <div className="flex justify-center items-center mt-2">
        <button
          onClick={handleNewChat}
          className={`flex justify-between items-center bg-gray-300 dark:bg-gray-700 w-full text-xl whitespace-nowrap sm:p-2 ${
            isMenuOpen ? "p-2" : ""
          } rounded-md dark:hover:bg-gray-600 hover:bg-gray-400 text-gray-600 dark:text-gray-200 focus:outline-none`}>
          {isMenuOpen || (windowWidth && windowWidth > 640) ? "New Chat" : ""}
          <FontAwesomeIcon
            className="ml-2 min-w-0"
            icon={["far", "pen-to-square"]}
          />
        </button>
      </div>
    </div>
  );
};

export default MessageBar;
