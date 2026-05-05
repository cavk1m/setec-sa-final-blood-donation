"use client";

import { Drawer, Typography, Avatar, Tag, Space } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CloseOutlined,
  EditOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import AppButton from "@/src/components/ui/app-button";
import CircleButton from "@/src/components/ui/circle-button";
import ActionButton from "@/src/components/ui/action-button";

const { Text, Title } = Typography;

export interface UserItem {
  id: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  fullName: string;
  systemId: string;
  email: string;
  phone: string;
  address?: string;
  bloodType?: string;
  role: "ADMIN" | "DONOR" | "RECIPIENT" | "STAFF" | "USER";
  joinedDate: string;
  dateOfBirth?: string;
  locationId?: string;
  isActive?: boolean;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  donationHistory?: { type: string; location: string; date: string }[];
  badges?: { label: string; sub: string; icon: string }[];
}

const ROLE_STYLE: Record<string, { bg: string; color: string }> = {
  Admin: { bg: "#ffdad6", color: "#ba1a1a" },
  Donor: { bg: "#dbeafe", color: "#1d4ed8" },
  Organization: { bg: "#dcfce7", color: "#15803d" },
};

const BLOOD_LABELS: Record<string, string> = {
  "O_POSITIVE": "O+",
  "O_NEGATIVE": "O-",
  "A_POSITIVE": "A+",
  "A_NEGATIVE": "A-",
  "B_POSITIVE": "B+",
  "B_NEGATIVE": "B-",
  "AB_POSITIVE": "AB+",
  "AB_NEGATIVE": "AB-",
};

interface UserDetailDrawerProps {
  open: boolean;
  user: UserItem | null;
  onClose: () => void;
  onEdit?: () => void;
}

export default function UserDetailDrawer({
  open,
  user,
  onClose,
  onEdit,
}: UserDetailDrawerProps) {
  if (!user) return null;

  const roleStyle = ROLE_STYLE[user.role] ?? {
    bg: "#f1f5f9",
    color: "#475569",
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      width={440}
      title={null}
      closable={false}
      styles={{
        body: { padding: 0 },
        wrapper: { boxShadow: "-4px 0 24px rgba(0,0,0,0.1)" },
      }}
    >
      {/* Header */}
      <div
        style={{ padding: "28px 28px 20px", borderBottom: "1px solid #f1f3ff" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Space size={14} align="center">
            <Avatar
              size={52}
              style={{
                background: user.avatarBg,
                color: user.avatarColor,
                fontWeight: 800,
                fontSize: 18,
                borderRadius: 14,
                flexShrink: 0,
              }}
            >
              {user.initials}
            </Avatar>
            <div>
              <Title level={5} style={{ margin: "0 0 4px", fontWeight: 700 }}>
                {user.fullName}
              </Title>
              <Tag
                style={{
                  background: roleStyle.bg,
                  color: roleStyle.color,
                  border: "none",
                  fontWeight: 700,
                  fontSize: 10,
                  borderRadius: 4,
                }}
              >
                {user.role.toUpperCase()}
              </Tag>
            </div>
          </Space>
          <CircleButton
            variant="ghost"
            size="sm"
            tooltip="Close"
            icon={<CloseOutlined style={{ color: "#64748b" }} />}
            onClick={onClose}
          />
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "20px 28px",
          overflowY: "auto",
          height: "calc(100vh - 160px)",
        }}
      >
        {/* Contact Info */}
        <Text
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#94a3b8",
            display: "block",
            marginBottom: 14,
          }}
        >
          Contact Information
        </Text>

        <Space
          orientation="vertical"
          size={10}
          style={{ width: "100%", marginBottom: 24 }}
        >
          {[
            {
              icon: <MailOutlined style={{ color: "#5d5c74" }} />,
              label: "Email Address",
              value: user.email,
            },
            {
              icon: <PhoneOutlined style={{ color: "#5d5c74" }} />,
              label: "Phone Number",
              value: user.phone,
            },
            ...(user.address
              ? [
                  {
                    icon: <EnvironmentOutlined style={{ color: "#5d5c74" }} />,
                    label: "Residential Address",
                    value: user.address,
                  },
                ]
              : []),
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: "#f8fafc",
                borderRadius: 12,
                padding: "12px 16px",
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "#fff",
                  borderRadius: 8,
                  border: "1px solid #e3e8f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#94a3b8",
                    display: "block",
                    marginBottom: 2,
                  }}
                >
                  {item.label}
                </Text>
                <Text style={{ fontSize: 13, fontWeight: 600 }}>
                  {item.value}
                </Text>
              </div>
            </div>
          ))}
        </Space>

        {/* Health Info */}
        <Text
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#94a3b8",
            display: "block",
            marginBottom: 14,
          }}
        >
          Health Information
        </Text>

        <div
          style={{
            background: "#f8fafc",
            borderRadius: 12,
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
            border: "1px solid #f1f3ff",
          }}
        >
          <Space size={12}>
            <div
              style={{
                width: 32,
                height: 32,
                background: "#fee2e2",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
              }}
            >
              🩸
            </div>
            <div>
              <Text style={{ fontSize: 10, color: "#94a3b8", display: "block" }}>
                Blood Type
              </Text>
              <Text style={{ fontSize: 13, fontWeight: 700, color: "#ef4444" }}>
                {user.bloodType ? (BLOOD_LABELS[user.bloodType] || user.bloodType) : "Not Specified"}
              </Text>
            </div>
          </Space>
          {user.dateOfBirth && (
            <div>
              <Text
                style={{
                  fontSize: 10,
                  color: "#94a3b8",
                  display: "block",
                  textAlign: "right",
                }}
              >
                Birth Date
              </Text>
              <Text
                style={{ fontSize: 13, fontWeight: 600, display: "block" }}
              >
                {user.dateOfBirth}
              </Text>
            </div>
          )}
        </div>

        {/* Donation History */}
        {user.donationHistory && user.donationHistory.length > 0 && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#94a3b8",
                }}
              >
                Donation History
              </Text>
              <ActionButton
                variant="custom"
                size="sm"
                label="View All"
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  height: "auto",
                  boxShadow: "none",
                  color: "#ef4444",
                  fontWeight: 700,
                }}
              />
            </div>

            <Space
              orientation="vertical"
              size={10}
              style={{ width: "100%", marginBottom: 24 }}
            >
              {user.donationHistory.map((d, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px",
                    background: "#f8fafc",
                    borderRadius: 12,
                  }}
                >
                  <Space size={12} align="center">
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        background: "#fff1f2",
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                      }}
                    >
                      🩸
                    </div>
                    <div>
                      <Text
                        style={{
                          fontWeight: 600,
                          fontSize: 13,
                          display: "block",
                        }}
                      >
                        {d.type}
                      </Text>
                      <Text style={{ fontSize: 11, color: "#94a3b8" }}>
                        {d.location}
                      </Text>
                    </div>
                  </Space>
                  <div style={{ textAlign: "right" }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#64748b",
                        display: "block",
                      }}
                    >
                      {d.date}
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#16a34a",
                        textTransform: "uppercase",
                      }}
                    >
                      Completed
                    </Text>
                  </div>
                </div>
              ))}
            </Space>
          </>
        )}

        {/* Certificates & Badges */}
        {user.badges && user.badges.length > 0 && (
          <>
            <Text
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#94a3b8",
                display: "block",
                marginBottom: 14,
              }}
            >
              Certificates & Badges
            </Text>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                marginBottom: 24,
              }}
            >
              {user.badges.map((b, i) => (
                <div
                  key={i}
                  style={{
                    background: "#f8fafc",
                    borderRadius: 12,
                    padding: "16px",
                    textAlign: "center",
                    border: "1px solid #f1f3ff",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: i === 0 ? "#ef4444" : "#475569",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 10px",
                      fontSize: 22,
                    }}
                  >
                    {b.icon}
                  </div>
                  <Text
                    style={{ fontWeight: 700, fontSize: 12, display: "block" }}
                  >
                    {b.label}
                  </Text>
                  <Text style={{ fontSize: 11, color: "#94a3b8" }}>
                    {b.sub}
                  </Text>
                </div>
              ))}
            </div>
          </>
        )}
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
          label="Edit Details"
          icon={<EditOutlined />}
          onClick={onEdit}
          style={{
            fontWeight: 700,
            borderRadius: 999,
            borderColor: "#e3e8f9",
            background: "#fff",
            color: "#475569",
          }}
        />
        <AppButton
          block
          size="lg"
          variant="primary"
          label="Send Message"
          icon={<MessageOutlined />}
          style={{
            fontWeight: 700,
            borderRadius: 999,
            background: "#ef4444",
            borderColor: "#ef4444",
          }}
        />
      </div>
    </Drawer>
  );
}
