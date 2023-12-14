import React, { useState } from "react";
import TabMenu from "../components/TabMenu";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import UserTable from "../components/UserTable";
import RoleTable from "../components/RoleTable";

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("users");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const tabs = [
    {
      id: "users",
      element: <UserTable />,
      label: "Users",
      icon: ["fas", "user"] as IconProp,
    },
    {
      id: "roles",
      element: <RoleTable />,
      label: "Roles",
      icon: ["fas", "sitemap"] as IconProp,
    },
  ];

  return (
    <div className="flex flex-col p-4 items-center w-[calc(100%-56px)] h-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      <TabMenu
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`justify-center w-full h-full p-4 ${
            activeTab === tab.id ? "flex" : "hidden"
          }`}>
          {tab.element}
        </div>
      ))}
    </div>
  );
};

export default Admin;
