import React from "react";
import { TabMenuProps } from "../interfaces/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TabMenu: React.FC<TabMenuProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex justify-center gap-2 items-center dark:text-gray-200 w-full px-4 py-2 scrollable-x">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex justify-center items-center bg-gray-300 dark:bg-gray-700 py-2 px-4 rounded-md ${
            activeTab === tab.id
              ? "bg-red-500 dark:bg-red-500 text-white"
              : "dark:hover:bg-gray-600 hover:bg-gray-400"
          } text-gray-600 dark:text-gray-200 transition-all duration-300 ease-in-out`}
          onClick={() => onTabChange(tab.id)}>
          {tab.label}
          <FontAwesomeIcon className="ml-2" icon={tab.icon} />
        </button>
      ))}
    </div>
  );
};

export default TabMenu;
