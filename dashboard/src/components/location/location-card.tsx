"use client";

import type { ReactNode } from "react";
import { Card, Typography, Tag, Space } from "antd";
import {
  EnvironmentOutlined,
  EditOutlined,
  DeleteOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import ActionButton from "@/src/components/ui/action-button";

const { Text, Title } = Typography;

export interface LocationItem {
  id: string;
  name: string;
  address: string;
  donationType: "WHOLE BLOOD" | "PLASMA ONLY" | "PLATELETS";
  queueCount: number;
  hasQR: boolean;
}

const DONATION_TYPE_STYLE: Record<string, { color: string; bg: string }> = {
  "WHOLE BLOOD": { color: "#ef4444", bg: "#fff1f2" },
  "PLASMA ONLY": { color: "#2563eb", bg: "#eff6ff" },
  PLATELETS: { color: "#7c3aed", bg: "#f5f3ff" },
};

const TYPE_ICON: Record<string, ReactNode> = {
  "WHOLE BLOOD": (
    <div
      style={{
        width: 44,
        height: 44,
        background: "#fff1f2",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ fontSize: 22 }}>🩸</span>
    </div>
  ),
  "PLASMA ONLY": (
    <div
      style={{
        width: 44,
        height: 44,
        background: "#eff6ff",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ fontSize: 22, color: "#2563eb", fontWeight: 900 }}>✦</span>
    </div>
  ),
  PLATELETS: (
    <div
      style={{
        width: 44,
        height: 44,
        background: "#f5f3ff",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ fontSize: 22 }}>✳️</span>
    </div>
  ),
};

interface LocationCardProps {
  data: LocationItem;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function LocationCard({
  data,
  onEdit,
  onDelete,
}: LocationCardProps) {
  const typeStyle = DONATION_TYPE_STYLE[data.donationType] ?? {
    color: "#475569",
    bg: "#f1f5f9",
  };

  return (
    <Card
      style={{
        borderRadius: 16,
        border: "1px solid #e3e8f9",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}
      styles={{ body: { padding: 24 } }}
      hoverable
    >
      {/* Top row — icon + type badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 16,
        }}
      >
        {TYPE_ICON[data.donationType]}
        <Tag
          style={{
            background: typeStyle.bg,
            color: typeStyle.color,
            border: "none",
            fontWeight: 700,
            fontSize: 10,
            borderRadius: 999,
            padding: "3px 10px",
            letterSpacing: "0.06em",
          }}
        >
          {data.donationType}
        </Tag>
      </div>

      {/* Name + address */}
      <Title
        level={5}
        style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 16 }}
      >
        {data.name}
      </Title>
      <Space size={4} align="center" style={{ marginBottom: 20 }}>
        <EnvironmentOutlined style={{ fontSize: 12, color: "#94a3b8" }} />
        <Text style={{ fontSize: 12, color: "#94a3b8" }}>{data.address}</Text>
      </Space>

      {/* QR + Queue info box */}
      <div
        style={{
          background: "#f8fafc",
          borderRadius: 10,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          border: "1px solid #f1f3ff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              background: "#fff",
              borderRadius: 8,
              border: "1px solid #e3e8f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <QrcodeOutlined
              style={{
                fontSize: 18,
                color: data.hasQR ? "#161c27" : "#94a3b8",
              }}
            />
          </div>
          <div>
            <Text
              style={{
                fontSize: 9,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#94a3b8",
                display: "block",
              }}
            >
              Payment QR
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: data.hasQR ? "#16a34a" : "#94a3b8",
              }}
            >
              {data.hasQR ? "Active Terminal" : "Not Configured"}
            </Text>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <Text
            style={{
              fontSize: 9,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#94a3b8",
              display: "block",
            }}
          >
            Queue
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 900,
              color: "#ef4444",
              lineHeight: 1,
            }}
          >
            {data.queueCount}
          </Text>
          <Text style={{ fontSize: 10, color: "#64748b", display: "block" }}>
            waiting
          </Text>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10 }}>
        <ActionButton
          variant="edit"
          size="sm"
          icon={<EditOutlined />}
          label="Edit"
          onClick={() => onEdit?.(data.id)}
          style={{
            display: "flex",
            width: "100%",
            flex: 1,
            justifyContent: "center",
            borderRadius: 999,
            fontWeight: 600,
          }}
        />
        <ActionButton
          variant="delete"
          size="sm"
          icon={<DeleteOutlined />}
          label="Delete"
          onClick={() => onDelete?.(data.id)}
          style={{
            display: "flex",
            width: "100%",
            flex: 1,
            justifyContent: "center",
            borderRadius: 999,
            fontWeight: 600,
          }}
        />
      </div>
    </Card>
  );
}
