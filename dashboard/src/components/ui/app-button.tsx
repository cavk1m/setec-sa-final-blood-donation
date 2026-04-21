"use client";

// The main call-to-action button — used for forms, headers, page-level actions.

import React from "react";
import { Button, Tooltip } from "antd";
import type { ButtonProps } from "antd";

type AppButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "ghost"
  | "outline";

type AppButtonSize = "sm" | "md" | "lg";

const VARIANT_STYLE: Record<
  AppButtonVariant,
  {
    color: string;
    bg: string;
    border: string;
    shadow?: string;
  }
> = {
  primary: {
    color: "#ffffff",
    bg: "#b51822",
    border: "#b51822",
    shadow: "0 4px 12px rgba(181,24,34,0.25)",
  },
  secondary: { color: "#161c27", bg: "#f1f3ff", border: "#e3e8f9" },
  danger: {
    color: "#ffffff",
    bg: "#dc2626",
    border: "#dc2626",
    shadow: "0 4px 12px rgba(220,38,38,0.25)",
  },
  success: {
    color: "#ffffff",
    bg: "#16a34a",
    border: "#16a34a",
    shadow: "0 4px 12px rgba(22,163,74,0.25)",
  },
  warning: {
    color: "#1e293b",
    bg: "#fbc02d",
    border: "#fbc02d",
    shadow: "0 4px 12px rgba(251,192,45,0.25)",
  },
  ghost: { color: "#b51822", bg: "transparent", border: "transparent" },
  outline: { color: "#b51822", bg: "transparent", border: "#b51822" },
};

const SIZE_STYLE: Record<
  AppButtonSize,
  {
    height: number;
    padding: string;
    fontSize: number;
    borderRadius: number;
  }
> = {
  sm: { height: 36, padding: "0 16px", fontSize: 12, borderRadius: 999 },
  md: { height: 44, padding: "0 24px", fontSize: 14, borderRadius: 999 },
  lg: { height: 52, padding: "0 32px", fontSize: 15, borderRadius: 999 },
};

interface AppButtonProps extends Omit<ButtonProps, "type" | "size" | "danger"> {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  label: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  tooltip?: string;
  block?: boolean;
}

export default function AppButton({
  variant = "primary",
  size = "md",
  label,
  icon,
  iconPosition = "left",
  tooltip,
  block = false,
  onClick,
  loading,
  disabled,
  style,
  ...rest
}: AppButtonProps) {
  const v = VARIANT_STYLE[variant];
  const s = SIZE_STYLE[size];

  const btn = (
    <Button
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      block={block}
      icon={iconPosition === "left" ? icon : undefined}
      {...rest}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: icon ? 8 : 0,
        height: s.height,
        padding: s.padding,
        borderRadius: s.borderRadius,
        fontWeight: 700,
        fontSize: s.fontSize,
        color: v.color,
        background: v.bg,
        border: `1.5px solid ${v.border}`,
        boxShadow: v.shadow ?? "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.2s",
        letterSpacing: size === "sm" ? "0.01em" : "0.02em",
        width: block ? "100%" : undefined,
        ...style,
      }}
    >
      {label}
      {iconPosition === "right" && icon && (
        <span style={{ marginLeft: 6, display: "inline-flex" }}>{icon}</span>
      )}
    </Button>
  );

  if (tooltip) return <Tooltip title={tooltip}>{btn}</Tooltip>;
  return btn;
}
