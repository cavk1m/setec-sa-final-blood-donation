"use client";

import React from "react";
import { Typography } from "antd";
import {
  GlobalOutlined,
  IdcardOutlined,
  SafetyOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

type SettingsSection = "website" | "identity" | "security";

const NAV_ITEMS: {
  key: SettingsSection;
  label: string;
  icon: React.ReactNode;
}[] = [
  { key: "website", label: "Website", icon: <GlobalOutlined /> },
  {
    key: "identity",
    label: "Administrative Identity",
    icon: <IdcardOutlined />,
  },
  { key: "security", label: "Security Protocol", icon: <SafetyOutlined /> },
];

interface SettingsSideNavProps {
  active: SettingsSection;
  onChange: (key: SettingsSection) => void;
}

export default function SettingsSideNav({
  active,
  onChange,
}: SettingsSideNavProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {NAV_ITEMS.map((item) => {
        const isActive = item.key === active;
        return (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderRadius: 12,
              border: "none",
              cursor: "pointer",
              background: isActive ? "#fff" : "transparent",
              borderLeft: isActive
                ? "4px solid #ef4444"
                : "4px solid transparent",
              boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
              color: isActive ? "#ef4444" : "#5d5c74",
              fontWeight: isActive ? 700 : 500,
              fontSize: 14,
              transition: "all 0.15s",
              textAlign: "left",
              width: "100%",
            }}
          >
            <span
              style={{ fontSize: 18, color: isActive ? "#ef4444" : "#94a3b8" }}
            >
              {item.icon}
            </span>
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
