import React from "react";
import { MessageProps } from "../interfaces/message";
import { useSelector } from "react-redux";
import { selectCurrentPicture } from "../store/slices/identitySlice";

const SentMessage: React.FC<MessageProps> = ({ message }) => {
  const photo = useSelector(selectCurrentPicture);

  return (
    <div className="flex justify-end items-center mb-6">
      <div className="flex max-w-fit">
        <div className="max-w-full min-h-[32px] text-2xl rounded-lg px-3 py-1 bg-red-500 text-white self-end">
          {message.text}
        </div>
        <img
          src={photo ?? undefined}
          alt="User"
          className="w-8 h-8 ml-2 rounded-full"
        />
      </div>
    </div>
  );
};

export default SentMessage;
