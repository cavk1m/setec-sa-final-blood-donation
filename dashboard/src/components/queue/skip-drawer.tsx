"use client";

import { Drawer, Typography, Divider, Tag } from "antd";
import {
  FastForwardOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  CalendarOutlined,
  WarningFilled,
} from "@ant-design/icons";
import AppButton from "@/src/components/ui/app-button";
import { QueueEntry } from "@/src/types/dashboard";
import { BLOOD_TYPE_STYLE, formatQueueTime } from "@/src/utils/dashboardUtils";
// import type { QueueEntry } from '@/types/dashboard';
// import { BLOOD_TYPE_STYLE, formatQueueTime } from '@/utils/dashboardUtils';

const { Text, Title } = Typography;

interface SkipDrawerProps {
  open: boolean;
  entry: QueueEntry | null;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function SkipDrawer({
  open,
  entry,
  loading,
  onConfirm,
  onCancel,
}: SkipDrawerProps) {
  if (!entry) return null;

  const bloodStyle = BLOOD_TYPE_STYLE[entry.user.blood_type] ?? {
    bg: "#f1f5f9",
    color: "#475569",
  };

  return (
    <Drawer
      open={open}
      onClose={onCancel}
      placement="right"
      width={420}
      title={null}
      closable={false}
      styles={{
        body: { padding: 0 },
        wrapper: { boxShadow: "-4px 0 24px rgba(0,0,0,0.08)" },
      }}
    >
      {/* Amber header band */}
      <div
        style={{
          background: "#fffbeb",
          padding: "32px 28px 24px",
          borderBottom: "1px solid #fef3c7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 52,
              height: 52,
              background: "#fef3c7",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <FastForwardOutlined style={{ fontSize: 28, color: "#d97706" }} />
          </div>
          <div>
            <Title
              level={5}
              style={{ margin: 0, fontWeight: 700, color: "#78350f" }}
            >
              Skip this Donor
            </Title>
            <Text style={{ fontSize: 13, color: "#d97706" }}>
              Donor will stay in the database
            </Text>
          </div>
        </div>
      </div>

      {/* Donor summary */}
      <div style={{ padding: "24px 28px" }}>
        <Text
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#94a3b8",
            display: "block",
            marginBottom: 16,
          }}
        >
          Donor Details
        </Text>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: "#f1f3ff",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <UserOutlined style={{ color: "#5d5c74" }} />
            </div>
            <div>
              <Text
                style={{ fontSize: 11, color: "#94a3b8", display: "block" }}
              >
                Full Name
              </Text>
              <Text style={{ fontWeight: 700, fontSize: 15 }}>
                {entry.user.full_name}
              </Text>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: "#f1f3ff",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <MedicineBoxOutlined style={{ color: "#5d5c74" }} />
            </div>
            <div>
              <Text
                style={{ fontSize: 11, color: "#94a3b8", display: "block" }}
              >
                Blood Type
              </Text>
              <Tag
                style={{
                  background: bloodStyle.bg,
                  color: bloodStyle.color,
                  border: "none",
                  fontWeight: 900,
                  fontSize: 12,
                  borderRadius: 999,
                  marginTop: 2,
                }}
              >
                {entry.user.blood_type}
              </Tag>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: "#f1f3ff",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <CalendarOutlined style={{ color: "#5d5c74" }} />
            </div>
            <div>
              <Text
                style={{ fontSize: 11, color: "#94a3b8", display: "block" }}
              >
                Registered At
              </Text>
              <Text style={{ fontWeight: 600, fontSize: 14 }}>
                {formatQueueTime(entry.created_at)}
              </Text>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: "#f1f3ff",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Text style={{ fontWeight: 900, fontSize: 13, color: "#5d5c74" }}>
                Q
              </Text>
            </div>
            <div>
              <Text
                style={{ fontSize: 11, color: "#94a3b8", display: "block" }}
              >
                Queue Number
              </Text>
              <Text style={{ fontWeight: 700, fontSize: 14, color: "#b51822" }}>
                #{String(entry.queue_number).padStart(2, "0")}
              </Text>
            </div>
          </div>
        </div>

        <Divider style={{ margin: "24px 0" }} />

        {/* Warning note */}
        <div
          style={{
            background: "#fffbeb",
            border: "1px solid #fef3c7",
            borderRadius: 10,
            padding: "14px 16px",
            marginBottom: 28,
            display: "flex",
            gap: 10,
          }}
        >
          <WarningFilled
            style={{
              color: "#d97706",
              fontSize: 16,
              flexShrink: 0,
              marginTop: 1,
            }}
          />
          <Text style={{ fontSize: 13, color: "#92400e", lineHeight: 1.6 }}>
            The donor will be marked as <Text strong>skipped</Text> and remain
            in the database. They can be restored at any time from the queue.
          </Text>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12 }}>
          <AppButton
            variant="ghost"
            size="lg"
            label="Cancel"
            block
            onClick={onCancel}
            style={{
              border: "1px solid #e3e8f9",
              fontWeight: 700,
              borderRadius: 10,
              background: "#ffffff",
              color: "#475569",
            }}
          />
          <AppButton
            variant="warning"
            size="lg"
            label="Confirm Skip"
            block
            loading={loading}
            onClick={onConfirm}
            style={{
              borderRadius: 10,
              fontWeight: 700,
            }}
          />
        </div>
      </div>
    </Drawer>
  );
}
