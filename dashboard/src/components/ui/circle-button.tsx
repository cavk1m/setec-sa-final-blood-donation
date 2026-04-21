"use client";

// Icon-only round button — used in top bars, card headers, floating actions.
import React from "react";
import { Button, Tooltip, Badge } from "antd";
import type { ButtonProps } from "antd";

type CircleVariant =
  | "default"
  | "primary"
  | "danger"
  | "success"
  | "ghost"
  | "dark";

type CircleSize = "sm" | "md" | "lg" | "xl";

const VARIANT_STYLE: Record<
  CircleVariant,
  {
    color: string;
    bg: string;
    border: string;
    shadow?: string;
  }
> = {
  default: { color: "#475569", bg: "#f1f3ff", border: "#e3e8f9" },
  primary: {
    color: "#ffffff",
    bg: "#b51822",
    border: "#b51822",
    shadow: "0 4px 14px rgba(181,24,34,0.3)",
  },
  danger: {
    color: "#ffffff",
    bg: "#dc2626",
    border: "#dc2626",
    shadow: "0 4px 14px rgba(220,38,38,0.3)",
  },
  success: {
    color: "#ffffff",
    bg: "#16a34a",
    border: "#16a34a",
    shadow: "0 4px 14px rgba(22,163,74,0.3)",
  },
  ghost: { color: "#64748b", bg: "transparent", border: "transparent" },
  dark: {
    color: "#ffffff",
    bg: "#1a1a2e",
    border: "#1a1a2e",
    shadow: "0 4px 14px rgba(0,0,0,0.2)",
  },
};

const SIZE_DIM: Record<CircleSize, number> = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

const ICON_SIZE: Record<CircleSize, number> = {
  sm: 14,
  md: 18,
  lg: 22,
  xl: 26,
};

interface CircleButtonProps extends Omit<
  ButtonProps,
  "type" | "size" | "shape"
> {
  icon: React.ReactNode;
  variant?: CircleVariant;
  size?: CircleSize;
  tooltip?: string;
  badge?: boolean;
  badgeColor?: string;
}

export default function CircleButton({
  icon,
  variant = "default",
  size = "md",
  tooltip,
  badge = false,
  badgeColor = "#b51822",
  onClick,
  loading,
  disabled,
  style,
  ...rest
}: CircleButtonProps) {
  const v = VARIANT_STYLE[variant];
  const dim = SIZE_DIM[size];
  const iconSz = ICON_SIZE[size];

  const btn = (
    <Button
      shape="circle"
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      {...rest}
      style={{
        width: dim,
        height: dim,
        minWidth: dim,
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        color: v.color,
        background: v.bg,
        border: `1.5px solid ${v.border}`,
        boxShadow: v.shadow ?? "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.2s",
        fontSize: iconSz,
        ...style,
      }}
      icon={
        <span
          style={{ fontSize: iconSz, display: "inline-flex", lineHeight: 1 }}
        >
          {icon}
        </span>
      }
    />
  );

  const withBadge = badge ? (
    <Badge dot color={badgeColor} offset={[-4, 4]}>
      {btn}
    </Badge>
  ) : (
    btn
  );

  if (tooltip) return <Tooltip title={tooltip}>{withBadge}</Tooltip>;
  return withBadge;
}
