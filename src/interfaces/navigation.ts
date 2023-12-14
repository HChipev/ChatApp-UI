import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ReactNode } from "react";

interface SidebarItem {
  label: string;
  path: string;
  icon: IconProp;
  requiredRoles: string[];
}

interface SidebarProps {
  items: SidebarItem[];
  onLinkClick: (path: string) => void;
}

interface ModalWrapperProps {
  isOpen: boolean;
  closeModal: () => void;
  children: ReactNode;
}

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "right" | "bottom" | "left";
}

interface Tab {
  id: string;
  label: string;
  icon: IconProp;
}

interface TabMenuProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export type {
  SidebarItem,
  SidebarProps,
  TooltipProps,
  ModalWrapperProps,
  TabMenuProps,
};
