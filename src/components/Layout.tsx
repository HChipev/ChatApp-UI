import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const Layout = () => {
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  const sidebarItems = [
    {
      label: "Home",
      path: "/",
      icon: { prefix: "far", iconName: "message" } as IconProp,
    },
    {
      label: "Upload documents",
      path: "/documents",
      icon: { prefix: "far", iconName: "folder-open" } as IconProp,
    },
    {
      label: "Admin panel",
      path: "/admin",
      icon: { prefix: "far", iconName: "user" } as IconProp,
    },
  ];

  return (
    <div className="flex w-screen h-screen">
      <Sidebar items={sidebarItems} onLinkClick={handleLinkClick} />
      <Outlet />
    </div>
  );
};

export default Layout;
