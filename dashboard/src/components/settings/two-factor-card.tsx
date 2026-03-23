"use client";

import { Typography } from "antd";
import { RightOutlined, LockOutlined } from "@ant-design/icons";
import AppButton from "@/src/components/ui/app-button";

const { Text, Title } = Typography;

export default function TwoFactorCard() {
  return (
    <div
      style={{
        borderRadius: 20,
        background: "#1a1a2e",
        padding: 40,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Glow blob */}
      <div
        style={{
          position: "absolute",
          right: -80,
          bottom: -80,
          width: 260,
          height: 260,
          background: "rgba(181,24,34,0.2)",
          borderRadius: "50%",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Text side */}
        <div style={{ flex: 1 }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(181,24,34,0.2)",
              border: "1px solid rgba(181,24,34,0.3)",
              color: "#ffb3ad",
              fontSize: 9,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              padding: "4px 12px",
              borderRadius: 999,
              marginBottom: 16,
            }}
          >
            Recommended Security
          </span>

          <Title
            level={3}
            style={{
              color: "#fff",
              fontWeight: 700,
              margin: "0 0 12px",
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
            }}
          >
            Two-Factor Authentication (2FA)
          </Title>

          <Text
            style={{
              color: "#64748b",
              fontSize: 14,
              lineHeight: 1.7,
              display: "block",
              maxWidth: 480,
              marginBottom: 24,
            }}
          >
            Add an extra layer of security to your administrative account. Once
            enabled, you'll be required to provide a unique code from your
            mobile device to sign in.
          </Text>

          <AppButton
            variant="secondary"
            size="md"
            label="Enable 2FA Protection"
            icon={<RightOutlined />}
            iconPosition="right"
            style={{
              borderRadius: 10,
              background: "#fff",
              borderColor: "#fff",
              color: "#1a1a2e",
              fontWeight: 700,
              height: 44,
              paddingInline: 24,
              fontSize: 14,
            }}
          />
        </div>

        {/* Phone illustration */}
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: 24,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <LockOutlined
              style={{
                fontSize: 48,
                color: "#b51822",
                display: "block",
                marginBottom: 8,
              }}
            />
            <Text style={{ color: "#64748b", fontSize: 11, fontWeight: 600 }}>
              2FA
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
