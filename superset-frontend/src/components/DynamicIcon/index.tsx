import React from "react";
import * as Icons from "@ant-design/icons"; // Import all icons from the package

// DynamicIcon Component
const DynamicIcon: React.FC<{ type: string; style?: React.CSSProperties }> = ({
  type,
  style,
}) => {
  const IconComponent = (Icons as any)[`${type}Outlined`]; // Access the icon dynamically

  if (!IconComponent) {
    // Fallback if the icon is not found
    return <span style={{ color: "red" }}>Icon not found: {type}</span>;
  }

  return <IconComponent style={style} />;
};

export default DynamicIcon;