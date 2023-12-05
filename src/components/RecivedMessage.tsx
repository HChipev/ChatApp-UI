import React, { useState } from "react";
import { MessageProps } from "../interfaces/message";
import { useSelector } from "react-redux";
import { selectCurrentPicture } from "../store/slices/identitySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectCurrentConversationLoading } from "../store/slices/conversationSlice";

const ReceivedMessage: React.FC<MessageProps> = ({ message }) => {
  const picture = useSelector(selectCurrentPicture);
  const loading = useSelector(selectCurrentConversationLoading);
  const [copyButtonClicked, setCopyButtonClicked] = useState<boolean>(false);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.text);
    setCopyButtonClicked(true);

    setTimeout(() => {
      setCopyButtonClicked(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col justify-center items-start-6 mb-6">
      {!loading && (
        <div className="flex flex-col max-w-fit">
          <div className="flex mb-2">
            <img
              src={picture ?? undefined}
              alt="Assistant"
              className="w-8 h-8 mr-2 rounded-full"
            />
            <div className="max-w-full min-h-[32px] text-2xl rounded-lg px-3 py-1 bg-white text-gray-700 self-start">
              {message.text}
            </div>
          </div>
          <div className="flex gap-1 w-full justify-end">
            <p
              className={`text-base flex items-center mr-1 text-gray-600 dark:text-gray-300 transition-all duration-300 ease-in-out ${
                copyButtonClicked ? "opacity-100 block" : "opacity-0 hidden"
              }`}>
              Text copied! <FontAwesomeIcon icon={["fas", "check"]} />
            </p>
            <button
              className="bg-none dark:hover:bg-gray-700 hover:bg-gray-300 flex justify-center items-center border w-8 h-8 p-2 border-gray-600 dark:border-gray-300 rounded-lg"
              onClick={handleCopyMessage}>
              <FontAwesomeIcon
                className="text-lg text-gray-600 dark:text-gray-300"
                icon={["far", "copy"]}
              />
            </button>
            {/* <button className="bg-none dark:hover:bg-gray-700 hover:bg-gray-300 flex justify-center items-center border w-8 h-8 p-2 border-gray-600 dark:border-gray-300 rounded-lg">
          <FontAwesomeIcon
            className="text-base text-gray-600 dark:text-gray-300"
            icon={["fas", "arrows-rotate"]}
          />
        </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceivedMessage;
