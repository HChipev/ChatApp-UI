import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(location.pathname);

  const handleLinkClick = (path: string) => {
    setActivePath(path);
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
      <Sidebar
        items={sidebarItems}
        activePath={activePath}
        onLinkClick={handleLinkClick}
      />
      <Outlet />
    </div>
  );
};

export default Layout;
