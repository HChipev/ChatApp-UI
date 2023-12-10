import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ReactNode } from "react";

interface SidebarItem {
  label: string;
  path: string;
  icon: IconProp;
}

interface SidebarProps {
  items: SidebarItem[];
  activePath: string;
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

export type { SidebarProps, TooltipProps, ModalWrapperProps };
