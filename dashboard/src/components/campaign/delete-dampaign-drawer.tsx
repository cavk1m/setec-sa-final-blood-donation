"use client";

import { useState } from "react";
import { Drawer, Typography, Input, Space, Divider } from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  WarningFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { CampaignItem } from "./campaign-card";
import AppButton from "@/src/components/ui/app-button";
import CircleButton from "@/src/components/ui/circle-button";

const { Text, Title } = Typography;

interface DeleteCampaignDrawerProps {
  open: boolean;
  campaign: CampaignItem | null;
  loading?: boolean;
  onConfirm: (id: string) => void;
  onCancel: () => void;
}

export default function DeleteCampaignDrawer({
  open,
  campaign,
  loading,
  onConfirm,
  onCancel,
}: DeleteCampaignDrawerProps) {
  const [confirmText, setConfirmText] = useState("");

  if (!campaign) return null;

  const isConfirmed = confirmText === campaign.name;
  const pct = Math.min(
    Math.round((campaign.raised / campaign.goal) * 100),
    100,
  );

  const handleClose = () => {
    setConfirmText("");
    onCancel();
  };

  const handleConfirm = () => {
    if (!isConfirmed) return;
    onConfirm(campaign.id);
    setConfirmText("");
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      placement="right"
      width={440}
      title={null}
      closable={false}
      styles={{
        body: { padding: 0 },
        wrapper: { boxShadow: "-4px 0 24px rgba(0,0,0,0.1)" },
      }}
    >
      {/* Header band — red warning */}
      <div
        style={{
          background: "#fff1f2",
          padding: "28px 28px 24px",
          borderBottom: "1px solid #ffdad7",
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
            <div
              style={{
                width: 48,
                height: 48,
                background: "#ffdad6",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DeleteOutlined style={{ color: "#ef4444", fontSize: 22 }} />
            </div>
            <div>
              <Title
                level={5}
                style={{ margin: 0, fontWeight: 700, color: "#ef4444" }}
              >
                Delete Campaign
              </Title>
              <Text style={{ fontSize: 12, color: "#dc2626" }}>
                This action cannot be undone
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
      </div>

      {/* Body */}
      <div
        style={{
          padding: "24px 28px",
          overflowY: "auto",
          height: "calc(100vh - 160px)",
        }}
      >
        {/* Campaign summary card */}
        <div
          style={{
            background: "#f8fafc",
            borderRadius: 14,
            padding: "18px 20px",
            border: "1px solid #f1f3ff",
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontWeight: 700,
              fontSize: 16,
              display: "block",
              marginBottom: 4,
            }}
          >
            {campaign.name}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: "#64748b",
              display: "block",
              marginBottom: 16,
            }}
          >
            {campaign.description}
          </Text>

          {/* Mini progress */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <Text style={{ fontSize: 12, color: "#94a3b8" }}>Progress</Text>
            <Text style={{ fontSize: 12, fontWeight: 700, color: "#ef4444" }}>
              {pct}%
            </Text>
          </div>
          <div
            style={{
              background: "#e3e8f9",
              borderRadius: 999,
              height: 5,
              overflow: "hidden",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${pct}%`,
                background: "#ef4444",
                borderRadius: 999,
              }}
            />
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            {[
              {
                label: "Raised",
                value: `$${campaign.raised.toLocaleString()}`,
              },
              { label: "Goal", value: `$${campaign.goal.toLocaleString()}` },
              { label: "Donors", value: campaign.donorCount.toString() },
              {
                label: "Status",
                value: campaign.status === "completed" ? "Completed" : "Active",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  padding: "10px 12px",
                  border: "1px solid #f1f3ff",
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    color: "#94a3b8",
                    display: "block",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {item.label}
                </Text>
                <Text style={{ fontSize: 14, fontWeight: 700 }}>
                  {item.value}
                </Text>
              </div>
            ))}
          </div>
        </div>

        {/* Warning boxes */}
        <Space
          orientation="vertical"
          size={10}
          style={{ width: "100%", marginBottom: 24 }}
        >
          {[
            "All campaign data and donor records will be permanently deleted",
            "Generated certificates linked to this campaign will be unaffected",
            "This action cannot be reversed or recovered",
          ].map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "12px 16px",
                background: i === 2 ? "#fff1f2" : "#fffbeb",
                border: `1px solid ${i === 2 ? "#ffdad7" : "#fef3c7"}`,
                borderRadius: 10,
              }}
            >
              {i === 2 ? (
                <ExclamationCircleFilled
                  style={{
                    color: "#ef4444",
                    fontSize: 15,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                />
              ) : (
                <WarningFilled
                  style={{
                    color: "#d97706",
                    fontSize: 15,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                />
              )}
              <Text
                style={{
                  fontSize: 13,
                  color: i === 2 ? "#92400e" : "#78350f",
                  lineHeight: 1.5,
                }}
              >
                {msg}
              </Text>
            </div>
          ))}
        </Space>

        <Divider style={{ margin: "20px 0" }} />

        {/* Confirm by typing name */}
        <div style={{ marginBottom: 8 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#64748b",
              display: "block",
              marginBottom: 6,
            }}
          >
            Type the campaign name to confirm:
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#ef4444",
              background: "#fff1f2",
              padding: "4px 10px",
              borderRadius: 6,
              display: "inline-block",
              marginBottom: 12,
            }}
          >
            {campaign.name}
          </Text>
          <Input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Type campaign name here..."
            style={{
              borderRadius: 10,
              height: 44,
              paddingLeft: 14,
              border:
                confirmText && !isConfirmed
                  ? "1px solid #fca5a5"
                  : confirmText && isConfirmed
                    ? "1px solid #86efac"
                    : "1px solid #e3e8f9",
              background: confirmText && isConfirmed ? "#f0fdf4" : "#f8fafc",
            }}
          />
          {confirmText && !isConfirmed && (
            <Text
              style={{
                fontSize: 11,
                color: "#dc2626",
                marginTop: 4,
                display: "block",
              }}
            >
              Name does not match
            </Text>
          )}
          {isConfirmed && (
            <Text
              style={{
                fontSize: 11,
                color: "#16a34a",
                marginTop: 4,
                display: "block",
              }}
            >
              ✓ Confirmed — you may proceed
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
          variant="danger"
          label="Delete Campaign"
          loading={loading}
          disabled={!isConfirmed}
          onClick={handleConfirm}
          style={{
            fontWeight: 700,
            borderRadius: 999,
            background: isConfirmed ? "#ef4444" : "#f1f3ff",
            borderColor: isConfirmed ? "#ef4444" : "#f1f3ff",
            color: isConfirmed ? "#fff" : "#94a3b8",
            transition: "all 0.2s",
          }}
        />
      </div>
    </Drawer>
  );
}
