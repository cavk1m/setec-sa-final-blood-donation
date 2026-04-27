"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Drawer, Typography, Avatar, Input, Tag } from "antd";
import AppButton from "@/src/components/ui/app-button";
import CircleButton from "@/src/components/ui/circle-button";
import {
  CloseOutlined,
  SendOutlined,
  MessageOutlined,
  MailOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import type { UserItem } from "./user-detail-drawer";

const { Text, Title } = Typography;
const { TextArea: AntTextArea } = Input;

type MessageChannel = "in-app" | "email" | "sms";

const CHANNEL_CONFIG: Record<
  MessageChannel,
  {
    label: string;
    icon: ReactNode;
    color: string;
    bg: string;
    border: string;
  }
> = {
  "in-app": {
    label: "In-App",
    icon: <MessageOutlined />,
    color: "#ef4444",
    bg: "#fff1f2",
    border: "#ffdad7",
  },
  email: {
    label: "Email",
    icon: <MailOutlined />,
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
  },
  sms: {
    label: "SMS",
    icon: <MobileOutlined />,
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
  },
};

const QUICK_TEMPLATES = [
  {
    label: "Appointment Reminder",
    text: "Hi {name}, this is a reminder about your upcoming blood donation appointment. Please arrive 10 minutes early.",
  },
  {
    label: "Thank You",
    text: "Dear {name}, thank you for your generous blood donation. Your contribution saves lives and we truly appreciate it.",
  },
  {
    label: "Certificate Ready",
    text: "Hi {name}, your blood donation certificate is ready. You can download it from your dashboard at any time.",
  },
  {
    label: "Urgent Request",
    text: "Dear {name}, we have an urgent need for your blood type. Please consider visiting your nearest donation center as soon as possible.",
  },
];

interface SendMessageDrawerProps {
  open: boolean;
  user: UserItem | null;
  onClose: () => void;
}

export default function SendMessageDrawer({
  open,
  user,
  onClose,
}: SendMessageDrawerProps) {
  const [channel, setChannel] = useState<MessageChannel>("in-app");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (!user) return null;

  const charLimit = channel === "sms" ? 160 : 1000;

  const applyTemplate = (text: string) => {
    setMessage(text.replace("{name}", user.fullName.split(" ")[0]));
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSent(false);
    setMessage("");
    setSubject("");
    onClose();
  };

  const handleClose = () => {
    setMessage("");
    setSubject("");
    setSent(false);
    onClose();
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      placement="right"
      width={480}
      title={null}
      closable={false}
      styles={{
        body: { padding: 0 },
        wrapper: { boxShadow: "-4px 0 24px rgba(0,0,0,0.1)" },
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#f0f9ff",
          padding: "28px 28px 24px",
          borderBottom: "1px solid #e0f2fe",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar
              size={48}
              style={{
                background: user.avatarBg,
                color: user.avatarColor,
                fontWeight: 800,
                fontSize: 16,
                borderRadius: 12,
                flexShrink: 0,
              }}
            >
              {user.initials}
            </Avatar>
            <div>
              <Title level={5} style={{ margin: 0, fontWeight: 700 }}>
                Send Message
              </Title>
              <Text style={{ fontSize: 12, color: "#0369a1" }}>
                to {user.fullName}
              </Text>
            </div>
          </div>
          <CircleButton
            variant="ghost"
            size="sm"
            tooltip="Close"
            icon={<CloseOutlined style={{ color: "#64748b" }} />}
            onClick={handleClose}
          />
        </div>

        {/* Recipient info */}
        <div
          style={{
            marginTop: 16,
            padding: "10px 14px",
            background: "#fff",
            borderRadius: 10,
            border: "1px solid #e0f2fe",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 16 }}>
            <div>
              <Text
                style={{ fontSize: 10, color: "#94a3b8", display: "block" }}
              >
                Email
              </Text>
              <Text style={{ fontSize: 12, fontWeight: 600 }}>
                {user.email}
              </Text>
            </div>
            <div>
              <Text
                style={{ fontSize: 10, color: "#94a3b8", display: "block" }}
              >
                Phone
              </Text>
              <Text style={{ fontSize: 12, fontWeight: 600 }}>
                {user.phone}
              </Text>
            </div>
          </div>
          <Tag
            style={{
              background: CHANNEL_CONFIG[channel].bg,
              color: CHANNEL_CONFIG[channel].color,
              border: "none",
              fontWeight: 700,
              fontSize: 10,
              borderRadius: 999,
            }}
          >
            {user.role}
          </Tag>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "20px 28px",
          overflowY: "auto",
          height: "calc(100vh - 200px)",
        }}
      >
        {/* Channel selector */}
        <Text
          style={{
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "#64748b",
            display: "block",
            marginBottom: 10,
          }}
        >
          Send Via
        </Text>
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {(Object.keys(CHANNEL_CONFIG) as MessageChannel[]).map((ch) => {
            const cfg = CHANNEL_CONFIG[ch];
            const isActive = channel === ch;
            return (
              <button
                key={ch}
                onClick={() => setChannel(ch)}
                style={{
                  flex: 1,
                  padding: "10px 8px",
                  borderRadius: 12,
                  border: `1.5px solid ${isActive ? cfg.border : "#e3e8f9"}`,
                  background: isActive ? cfg.bg : "#f8fafc",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  transition: "all 0.15s",
                  outline: "none",
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    color: isActive ? cfg.color : "#94a3b8",
                  }}
                >
                  {cfg.icon}
                </span>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: isActive ? cfg.color : "#94a3b8",
                  }}
                >
                  {cfg.label}
                </Text>
              </button>
            );
          })}
        </div>

        {/* Subject (email only) */}
        {channel === "email" && (
          <div style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#64748b",
                display: "block",
                marginBottom: 8,
              }}
            >
              Subject
            </Text>
            <Input
              placeholder="Enter email subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{
                borderRadius: 999,
                background: "#f8fafc",
                border: "1px solid #e3e8f9",
                height: 44,
                paddingLeft: 18,
              }}
            />
          </div>
        )}

        {/* Quick templates */}
        <div style={{ marginBottom: 16 }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#64748b",
              display: "block",
              marginBottom: 8,
            }}
          >
            Quick Templates
          </Text>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {QUICK_TEMPLATES.map((t, i) => (
              <button
                key={i}
                onClick={() => applyTemplate(t.text)}
                style={{
                  padding: "5px 12px",
                  borderRadius: 999,
                  border: "1px solid #e3e8f9",
                  background: "#f8fafc",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#475569",
                  transition: "all 0.15s",
                  outline: "none",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Message body */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#64748b",
              }}
            >
              Message
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: message.length > charLimit ? "#dc2626" : "#94a3b8",
              }}
            >
              {message.length} / {charLimit}
            </Text>
          </div>
          <AntTextArea
            placeholder={`Write your ${channel === "sms" ? "SMS (160 chars max)" : "message"} here...`}
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, charLimit))}
            rows={channel === "sms" ? 4 : 6}
            style={{
              borderRadius: 16,
              background: "#f8fafc",
              border: `1px solid ${message.length > charLimit * 0.9 ? "#fca5a5" : "#e3e8f9"}`,
              paddingLeft: 16,
              paddingTop: 12,
              resize: "none",
              fontSize: 14,
            }}
          />
          {channel === "sms" && message.length > 140 && (
            <Text
              style={{
                fontSize: 11,
                color: "#d97706",
                display: "block",
                marginTop: 4,
              }}
            >
              ⚠ Approaching SMS character limit
            </Text>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px 28px",
          borderTop: "1px solid #f1f3ff",
          background: "#fff",
          display: "flex",
          gap: 12,
        }}
      >
        <AppButton
          block
          size="lg"
          variant="ghost"
          label="Cancel"
          onClick={handleClose}
          style={{ fontWeight: 700, borderRadius: 999, borderColor: "#e3e8f9" }}
        />
        <AppButton
          block
          size="lg"
          variant="primary"
          label={
            sent
              ? "✓ Sent!"
              : sending
                ? "Sending..."
                : `Send via ${CHANNEL_CONFIG[channel].label}`
          }
          icon={sent ? undefined : <SendOutlined />}
          loading={sending}
          disabled={!message.trim()}
          onClick={handleSend}
          style={{
            fontWeight: 700,
            borderRadius: 999,
            background: sent ? "#16a34a" : CHANNEL_CONFIG[channel].color,
            borderColor: sent ? "#16a34a" : CHANNEL_CONFIG[channel].color,
            transition: "all 0.3s",
          }}
        />
      </div>
    </Drawer>
  );
}
