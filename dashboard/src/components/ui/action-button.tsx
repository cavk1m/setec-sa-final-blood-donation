"use client";

// Action buttons are for table/card row actions — compact, icon-led, contextual color.

import React from "react";
import { Button, Tooltip } from "antd";
import type { ButtonProps } from "antd";

type ActionVariant =
  | "view"
  | "edit"
  | "delete"
  | "complete"
  | "skip"
  | "restore"
  | "download"
  | "print"
  | "message"
  | "custom";

const VARIANT_STYLE: Record<
  ActionVariant,
  {
    color: string;
    bg: string;
    border: string;
    hoverBg: string;
  }
> = {
  view: {
    color: "#b51822",
    bg: "#fff1f2",
    border: "#ffdad7",
    hoverBg: "#ffdad7",
  },
  edit: {
    color: "#5d5c74",
    bg: "#f1f3ff",
    border: "#e3e8f9",
    hoverBg: "#e3e8f9",
  },
  delete: {
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
    hoverBg: "#fecaca",
  },
  complete: {
    color: "#ffffff",
    bg: "#16a34a",
    border: "#16a34a",
    hoverBg: "#15803d",
  },
  skip: {
    color: "#1e293b",
    bg: "#fbc02d",
    border: "#fbc02d",
    hoverBg: "#f9a825",
  },
  restore: {
    color: "#5d5c74",
    bg: "transparent",
    border: "transparent",
    hoverBg: "#f1f3ff",
  },
  download: {
    color: "#4f5d70",
    bg: "#f1f3ff",
    border: "#e3e8f9",
    hoverBg: "#e3e8f9",
  },
  print: {
    color: "#5d5c74",
    bg: "#f1f3ff",
    border: "#e3e8f9",
    hoverBg: "#e3e8f9",
  },
  message: {
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
    hoverBg: "#dbeafe",
  },
  custom: {
    color: "#161c27",
    bg: "#f8fafc",
    border: "#e3e8f9",
    hoverBg: "#f1f3ff",
  },
};

interface ActionButtonProps extends Omit<ButtonProps, "type" | "size"> {
  variant?: ActionVariant;
  label?: string;
  tooltip?: string;
  icon?: React.ReactNode;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export default function ActionButton({
  variant = "custom",
  label,
  tooltip,
  icon,
  showLabel = true,
  size = "sm",
  onClick,
  loading,
  disabled,
  style,
  ...rest
}: ActionButtonProps) {
  const s = VARIANT_STYLE[variant];

  const btn = (
    <Button
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      icon={icon}
      {...rest}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: icon && showLabel && label ? 6 : 0,
        height: size === "sm" ? 32 : 38,
        padding:
          showLabel && label
            ? `0 ${size === "sm" ? 12 : 16}px`
            : `0 ${size === "sm" ? 8 : 12}px`,
        borderRadius: 8,
        fontWeight: 700,
        fontSize: size === "sm" ? 12 : 13,
        color: s.color,
        background: s.bg,
        border: `1px solid ${s.border}`,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.15s",
        boxShadow: "none",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {showLabel && label}
    </Button>
  );

  if (tooltip) {
    return <Tooltip title={tooltip}>{btn}</Tooltip>;
  }

  return btn;
}
