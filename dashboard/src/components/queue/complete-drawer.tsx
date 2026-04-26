"use client";

import { Drawer, Typography, Divider, Tag, Space } from "antd";
import {
  CheckCircleFilled,
  UserOutlined,
  MedicineBoxOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import AppButton from "@/src/components/ui/app-button";
import { QueueEntry } from "@/src/types/dashboard";
import { BLOOD_TYPE_STYLE, formatQueueTime } from "@/src/utils/dashboardUtils";

const { Text, Title } = Typography;

interface CompleteDrawerProps {
  open: boolean;
  entry: QueueEntry | null;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function CompleteDrawer({
  open,
  entry,
  loading,
  onConfirm,
  onCancel,
}: CompleteDrawerProps) {
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
      size="default"
      title={null}
      closable={false}
      styles={{
        body: { padding: 0 },
        wrapper: { boxShadow: "-4px 0 24px rgba(0,0,0,0.08)" },
      }}
    >
      {/* Green header band */}
      <div
        style={{
          background: "#f0fdf4",
          padding: "32px 28px 24px",
          borderBottom: "1px solid #dcfce7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 52,
              height: 52,
              background: "#dcfce7",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <CheckCircleFilled style={{ fontSize: 28, color: "#16a34a" }} />
          </div>
          <div>
            <Title
              level={5}
              style={{ margin: 0, fontWeight: 700, color: "#14532d" }}
            >
              Mark as Completed
            </Title>
            <Text style={{ fontSize: 13, color: "#16a34a" }}>
              This action will generate a certificate
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

        {/* What happens next */}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: 10,
            padding: "14px 16px",
            marginBottom: 28,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#94a3b8",
              display: "block",
              marginBottom: 10,
            }}
          >
            What happens next
          </Text>
          <Space direction="vertical" size={8} style={{ width: "100%" }}>
            {[
              "Donor status set to Completed",
              "Blood donation record created",
              "Certificate auto-generated & issued",
            ].map((item, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#dcfce7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Text
                    style={{ fontSize: 10, fontWeight: 800, color: "#16a34a" }}
                  >
                    {i + 1}
                  </Text>
                </div>
                <Text style={{ fontSize: 13, color: "#475569" }}>{item}</Text>
              </div>
            ))}
          </Space>
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
              borderRadius: 10,
              background: "#ffffff",
              color: "#475569",
              fontWeight: 700,
            }}
          />
          <AppButton
            variant="success"
            size="lg"
            label="Confirm Complete"
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
