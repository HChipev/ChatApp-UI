import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { SidebarItem } from "../interfaces/navigation";

const Layout = () => {
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  const sidebarItems: SidebarItem[] = [
    {
      label: "Home",
      path: "/",
      icon: { prefix: "far", iconName: "message" } as IconProp,
      requiredRoles: ["User"],
    },
    {
      label: "Documents",
      path: "/documents",
      icon: { prefix: "far", iconName: "folder-open" } as IconProp,
      requiredRoles: ["Admin"],
    },
    {
      label: "Admin",
      path: "/admin",
      icon: { prefix: "far", iconName: "user" } as IconProp,
      requiredRoles: ["Admin"],
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
