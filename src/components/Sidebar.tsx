import React from "react";
import { SidebarProps } from "../interfaces/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { selectCurrentPicture } from "../store/slices/identitySlice";
import constants from "../constants/assets";
import Tooltip from "./Tooltip";
import ThemeToggle from "./ThemeToggle";
import { useLocation, useParams } from "react-router-dom";

const Sidebar: React.FC<SidebarProps> = ({ items, onLinkClick }) => {
  const picture = useSelector(selectCurrentPicture);
  const { conversationId } = useParams();
  const location = useLocation();

  return (
    <nav className="flex flex-col items-center justify-between dark:bg-gray-900 border-r border-red-500 p-2">
      <div className="flex flex-col gap-10">
        <img src={constants.logo} alt="Profile" className="w-9 h-9" />
        <ul className="flex flex-col gap-2">
          {items.map((item, index) => (
            <Tooltip key={index} content={item.label} position="right">
              <li
                className="flex justify-center items-center cursor-pointer dark:text-gray-100 p-2 rounded-lg"
                onClick={() => onLinkClick(item.path)}>
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`text-lg transition-all duration-300 ease-in-out ${
                    location.pathname === item.path ||
                    (conversationId && item.path === "/")
                      ? "text-red-500"
                      : ""
                  }`}
                />
              </li>
            </Tooltip>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center">
        <ThemeToggle />
        <img
          src={picture ?? undefined}
          alt="Profile"
          className="w-10 h-10 rounded-xl cursor-pointer"
        />
      </div>
    </nav>
  );
};

export default Sidebar;
