import React, { useEffect } from "react";
import { SidebarProps } from "../interfaces/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentPicture,
  selectCurrentRoles,
} from "../store/slices/identitySlice";
import constants from "../constants/assets";
import Tooltip from "./Tooltip";
import ThemeToggle from "./ThemeToggle";
import { useLocation, useParams } from "react-router-dom";
import {
  selectCurrentWindowWidth,
  selectIsOpen,
  setIsOpen,
  setWindowWidth,
} from "../store/slices/menuSlice";

const Sidebar: React.FC<SidebarProps> = ({ items, onLinkClick }) => {
  const picture = useSelector(selectCurrentPicture);
  const roles = useSelector(selectCurrentRoles);
  const isMenuOpen = useSelector(selectIsOpen);
  const windowWidth = useSelector(selectCurrentWindowWidth);
  const dispatch = useDispatch();
  const { conversationId } = useParams();
  const location = useLocation();

  useEffect(() => {
    dispatch(setWindowWidth(window.innerWidth));

    const handleResize = () => {
      dispatch(setWindowWidth(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth && windowWidth > 640) {
      dispatch(setIsOpen(false));
    }
  }, [windowWidth]);

  const handleOpenMenu = () => {
    dispatch(setIsOpen(!isMenuOpen));
  };

  return (
    <nav className="flex flex-col items-center justify-between w-14 dark:bg-gray-900 border-r border-red-500 p-2">
      <div className="flex flex-col gap-10">
        <img src={constants.logo} alt="Profile" className="w-9 h-9" />
        <div className="flex flex-col justify-center items-center gap-1">
          {windowWidth && windowWidth <= 640 && (
            <Tooltip content="Menu" position="right">
              <button
                onClick={handleOpenMenu}
                className="flex justify-center items-center dark:text-gray-100 p-2 rounded-lg">
                <FontAwesomeIcon
                  icon={isMenuOpen ? ["fas", "xmark"] : ["fas", "bars"]}
                  className={`text-xl ${
                    isMenuOpen ? "rotate-90" : "rotate-0"
                  } transition-transform duration-150 ease-linear`}
                />
              </button>
            </Tooltip>
          )}
          <ul className="flex flex-col gap-2">
            {items.map(
              (item, index) =>
                item.requiredRoles.every((role) => roles?.includes(role)) && (
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
                )
            )}
          </ul>
        </div>
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
