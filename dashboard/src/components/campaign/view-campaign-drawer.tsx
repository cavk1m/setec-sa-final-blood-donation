"use client";

import React from "react";
import {
  Drawer,
  Button,
  Typography,
  Progress,
  Divider,
  Space,
  Tag,
} from "antd";
import {
  CloseOutlined,
  EyeOutlined,
  TeamOutlined,
  CalendarOutlined,
  TrophyOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { CampaignItem } from "./campaign-card";

const { Text, Title } = Typography;

interface ViewCampaignDrawerProps {
  open: boolean;
  campaign: CampaignItem | null;
  onClose: () => void;
  onEdit?: (id: string) => void;
}

export default function ViewCampaignDrawer({
  open,
  campaign,
  onClose,
  onEdit,
}: ViewCampaignDrawerProps) {
  if (!campaign) return null;

  const pct = Math.min(
    Math.round((campaign.raised / campaign.goal) * 100),
    100,
  );
  const isComplete = campaign.status === "completed";
  const remaining = Math.max(campaign.goal - campaign.raised, 0);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      width={480}
      title={null}
      closable={false}
      styles={{
        body: { padding: 0 },
        wrapper: { boxShadow: "-4px 0 24px rgba(0,0,0,0.1)" },
      }}
    >
      {/* Header band */}
      <div
        style={{
          background: isComplete ? "#f8fafc" : "#fff1f2",
          padding: "28px 28px 24px",
          borderBottom: `1px solid ${isComplete ? "#f1f3ff" : "#ffdad7"}`,
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
                width: 44,
                height: 44,
                background: isComplete ? "#e3e8f9" : "#ffdad7",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EyeOutlined
                style={{
                  color: isComplete ? "#5d5c74" : "#ef4444",
                  fontSize: 20,
                }}
              />
            </div>
            <div>
              <Title
                level={5}
                style={{
                  margin: 0,
                  fontWeight: 700,
                  color: isComplete ? "#161c27" : "#ef4444",
                }}
              >
                Campaign Details
              </Title>
              <Text style={{ fontSize: 12, color: "#94a3b8" }}>
                Read-only overview
              </Text>
            </div>
          </div>
          <Button
            type="text"
            shape="circle"
            icon={<CloseOutlined style={{ color: "#64748b" }} />}
            onClick={onClose}
          />
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: "24px 28px",
          overflowY: "auto",
          height: "calc(100vh - 160px)",
        }}
      >
        {/* Title + status */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 8,
            }}
          >
            <Title
              level={4}
              style={{
                margin: 0,
                fontWeight: 800,
                letterSpacing: "-0.3px",
                maxWidth: "75%",
              }}
            >
              {campaign.name}
            </Title>
            <Tag
              style={{
                background: isComplete ? "#d4e4fa" : "#ffdad7",
                color: isComplete ? "#39485a" : "#ef4444",
                border: "none",
                fontWeight: 700,
                fontSize: 11,
                borderRadius: 999,
                padding: "3px 12px",
              }}
            >
              {isComplete ? "Completed" : "Active"}
            </Tag>
          </div>
          <Text style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>
            {campaign.description}
          </Text>
        </div>

        <Divider style={{ margin: "20px 0" }} />

        {/* Progress */}
        <div style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#94a3b8",
              display: "block",
              marginBottom: 12,
            }}
          >
            Fundraising Progress
          </Text>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text style={{ fontWeight: 700, fontSize: 22, color: "#ef4444" }}>
              ${campaign.raised.toLocaleString()}
            </Text>
            <Text
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: "#94a3b8",
                alignSelf: "flex-end",
              }}
            >
              of ${campaign.goal.toLocaleString()}
            </Text>
          </div>
          <Progress
            percent={pct}
            showInfo={false}
            strokeColor={isComplete ? "#677689" : "#ef4444"}
            railColor="#f1f3ff"
            size={["100%", 10]}
            style={{ margin: "0 0 8px" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: isComplete ? "#16a34a" : "#ef4444",
              }}
            >
              {pct}% achieved
            </Text>
            {!isComplete && (
              <Text style={{ fontSize: 12, color: "#94a3b8" }}>
                ${remaining.toLocaleString()} remaining
              </Text>
            )}
          </div>
        </div>

        <Divider style={{ margin: "20px 0" }} />

        {/* Stats grid */}
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
          Campaign Statistics
        </Text>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 24,
          }}
        >
          {[
            {
              icon: <TeamOutlined style={{ color: "#2563eb", fontSize: 18 }} />,
              bg: "#eff6ff",
              label: "Total Donors",
              value: campaign.donorCount.toLocaleString(),
            },
            {
              icon: (
                <DollarOutlined style={{ color: "#16a34a", fontSize: 18 }} />
              ),
              bg: "#f0fdf4",
              label: "Amount Raised",
              value: `$${campaign.raised.toLocaleString()}`,
            },
            {
              icon: (
                <TrophyOutlined style={{ color: "#d97706", fontSize: 18 }} />
              ),
              bg: "#fffbeb",
              label: "Goal Amount",
              value: `$${campaign.goal.toLocaleString()}`,
            },
            {
              icon: (
                <CalendarOutlined style={{ color: "#7c3aed", fontSize: 18 }} />
              ),
              bg: "#f5f3ff",
              label: isComplete ? "Ended" : "Created",
              value: campaign.createdAt,
            },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: "#f8fafc",
                borderRadius: 12,
                padding: "14px 16px",
                border: "1px solid #f1f3ff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    background: stat.bg,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {stat.icon}
                </div>
                <Text
                  style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}
                >
                  {stat.label}
                </Text>
              </div>
              <Text style={{ fontSize: 16, fontWeight: 800, display: "block" }}>
                {stat.value}
              </Text>
            </div>
          ))}
        </div>

        {/* Status note */}
        {isComplete && (
          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #dcfce7",
              borderRadius: 12,
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TrophyOutlined
              style={{ color: "#16a34a", fontSize: 18, flexShrink: 0 }}
            />
            <Text style={{ fontSize: 13, color: "#15803d", fontWeight: 600 }}>
              This campaign has been successfully completed and archived.
            </Text>
          </div>
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
        <Button
          block
          size="large"
          onClick={onClose}
          style={{ fontWeight: 700, borderRadius: 999, borderColor: "#e3e8f9" }}
        >
          Close
        </Button>
        {!isComplete && (
          <Button
            block
            size="large"
            type="primary"
            onClick={() => {
              onClose();
              onEdit?.(campaign.id);
            }}
            style={{
              fontWeight: 700,
              borderRadius: 999,
              background: "#ef4444",
              borderColor: "#ef4444",
            }}
          >
            Edit Campaign
          </Button>
        )}
      </div>
    </Drawer>
  );
}
