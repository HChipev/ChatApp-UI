import React, { useState } from "react";
import { TooltipProps } from "../interfaces/navigation";

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className={`relative inline-block z-50`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {children}
      {showTooltip && (
        <div
          className={`absolute bg-gray-300 dark:bg-gray-600 dark:text-gray-200 px-2 py-1 rounded-md text-lg`}
          style={{
            top:
              position === "bottom"
                ? "100%"
                : position === "top"
                ? "-2.5em"
                : "50%",
            left:
              position === "right"
                ? "100%"
                : position === "left"
                ? "-8em"
                : "50%",
            transform:
              position === "left" || position === "right"
                ? "translateY(-50%)"
                : "translateX(-50%)",
          }}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
