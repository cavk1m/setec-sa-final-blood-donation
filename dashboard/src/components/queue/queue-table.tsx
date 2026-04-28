"use client";

import { useState } from "react";
import {
  Card,
  Table,
  Tag,
  Typography,
  Avatar,
  Space,
  Input,
  Select,
} from "antd";
import {
  CheckCircleOutlined,
  FastForwardOutlined,
  ReloadOutlined,
  FilterOutlined,
  StarFilled,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import CompleteDrawer from "./complete-drawer";
import SkipDrawer from "./skip-drawer";
import { QueueEntry } from "@/src/types/dashboard";
import {
  BLOOD_TYPE_STYLE,
  formatQueueTime,
  getSurveyColor,
} from "@/src/utils/dashboardUtils";
import ActionButton from "@/src/components/ui/action-button";
import CircleButton from "@/src/components/ui/circle-button";

const { Text } = Typography;

const AVATAR_COLORS = [
  { bg: "#e2e0fc", color: "#4338ca" },
  { bg: "#dbeafe", color: "#1d4ed8" },
  { bg: "#d1fae5", color: "#047857" },
  { bg: "#ede9fe", color: "#6d28d9" },
  { bg: "#fee2e2", color: "#b91c1c" },
  { bg: "#fef9c3", color: "#92400e" },
];

const getAvatarColor = (name: string) =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const STATUS_BADGE: Record<
  string,
  { label: string; color: string; bg: string; dot: string }
> = {
  waiting: { label: "Waiting", color: "#d97706", bg: "#fffbeb", dot: "#f59e0b" },
  "in-progress": { label: "In Process", color: "#2563eb", bg: "#eff6ff", dot: "#3b82f6" },
  completed: { label: "Completed", color: "#16a34a", bg: "#f0fdf4", dot: "#22c55e" },
  skip: { label: "Skipped", color: "#dc2626", bg: "#fef2f2", dot: "#ef4444" },
};

interface QueueTableProps {
  data: QueueEntry[];
  loading?: boolean;
  onComplete?: (id: string) => void;
  onSkip?: (id: string) => void;
}

export default function QueueTable({
  data,
  loading,
  onComplete,
  onSkip,
}: QueueTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [completeTarget, setCompleteTarget] = useState<QueueEntry | null>(null);
  const [skipTarget, setSkipTarget] = useState<QueueEntry | null>(null);

  const filtered = data.filter((r) => {
    const matchSearch = r.user.full_name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const columns: ColumnsType<QueueEntry> = [
    {
      title: "QUEUE #",
      key: "queue_number",
      width: 90,
      render: (_, r) => (
        <Text
          style={{
            fontWeight: 800,
            fontSize: 18,
            color: r.status === 'waiting' ? "#ef4444" : "rgba(0,0,0,0.25)",
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '-1px'
          }}
        >
          {String(r.queue_number).padStart(2, "0")}
        </Text>
      ),
    },
    {
      title: "DONOR NAME",
      key: "full_name",
      render: (_, r) => {
        const av = getAvatarColor(r.user.full_name);
        return (
          <Space size={12} align="center">
            <Avatar
              size={36}
              style={{
                background: av.bg,
                color: av.color,
                fontWeight: 700,
                fontSize: 12,
                flexShrink: 0,
                borderRadius: 10
              }}
            >
              {getInitials(r.user.full_name)}
            </Avatar>
            <div>
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  display: "block",
                  opacity: r.status !== "waiting" ? 0.5 : 1,
                  color: '#0f172a'
                }}
              >
                {r.user.full_name}
              </Text>
              <Text style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>
                ID: #BC-{r.id.slice(-5).toUpperCase()}
              </Text>
            </div>
          </Space>
        );
      },
    },
    {
      title: "BLOOD TYPE",
      key: "blood_type",
      width: 120,
      render: (_, r) => {
        const s = BLOOD_TYPE_STYLE[r.user.blood_type] ?? {
          bg: "#f1f5f9",
          color: "#475569",
        };
        return (
          <Tag
            style={{
              background: s.bg,
              color: s.color,
              border: "none",
              fontWeight: 900,
              fontSize: 11,
              borderRadius: 6,
              padding: "3px 12px",
              opacity: r.status !== "waiting" ? 0.5 : 1,
            }}
          >
            {r.user.blood_type}
          </Tag>
        );
      },
    },
    {
      title: "SURVEY SCORE",
      key: "survey_score",
      width: 140,
      render: (_, r) => (
        <Space
          size={4}
          align="center"
          style={{ opacity: r.status !== "waiting" ? 0.5 : 1 }}
        >
          <StarFilled style={{ color: "#f59e0b", fontSize: 13 }} />
          <Text
            style={{
              fontWeight: 800,
              fontSize: 13,
              color: getSurveyColor(r.survey_score),
            }}
          >
            {r.survey_score}.0
          </Text>
          <Text style={{ fontSize: 11, color: "#94a3b8", fontWeight: 800 }}>/ 5</Text>
        </Space>
      ),
    },
    {
      title: "REGISTERED AT",
      key: "created_at",
      render: (_, r) => (
        <Text
          style={{
            fontSize: 13,
            color: "#64748b",
            fontWeight: 500,
            opacity: r.status !== "waiting" ? 0.5 : 1,
          }}
        >
          {formatQueueTime(r.created_at)}
        </Text>
      ),
    },
    {
      title: "STATUS",
      key: "status",
      width: 130,
      render: (_, r) => {
        const s = STATUS_BADGE[r.status];
        return (
          <div
            style={{
              background: s.bg,
              color: s.color,
              fontSize: 11,
              fontWeight: 800,
              padding: "4px 14px",
              borderRadius: 8,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot }} />
            {s.label}
          </div>
        );
      },
    },
    {
      title: "ACTIONS",
      key: "actions",
      width: 200,
      align: "right",
      render: (_, r) => {
        if (r.status === "completed") {
          return (
            <Text style={{ fontSize: 11, color: "#94a3b8", fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Recorded
            </Text>
          );
        }
        if (r.status === "skip") {
          return (
            <ActionButton
              variant="restore"
              size="sm"
              label="Restore"
              style={{ borderRadius: 8, fontWeight: 700 }}
              onClick={() => onComplete?.(r.id)}
            />
          );
        }
        return (
          <Space size={8}>
            <ActionButton
              variant="complete"
              size="sm"
              label="Complete"
              tooltip="Mark as completed"
              icon={<CheckCircleOutlined />}
              style={{ borderRadius: 8, fontWeight: 700 }}
              onClick={() => setCompleteTarget(r)}
            />
            <ActionButton
              variant="skip"
              size="sm"
              label="Skip"
              tooltip="Skip donor"
              icon={<FastForwardOutlined />}
              style={{ borderRadius: 8, fontWeight: 700 }}
              onClick={() => setSkipTarget(r)}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Card
        style={{
          borderRadius: 24,
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.02)",
          background: "#fff",
          overflow: "hidden"
        }}
        styles={{ body: { padding: 0 } }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(0,0,0,0.04)",
            background: "rgba(248, 250, 252, 0.5)"
          }}
        >
          <Space size={12} align="center">
            <Text style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.01em' }}>
              Real-time Donor Queue
            </Text>
            <span
              style={{
                background: "#fee2e2",
                color: "#ef4444",
                fontSize: 10,
                fontWeight: 900,
                padding: "2px 10px",
                borderRadius: 6,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              LIVE
            </span>
          </Space>
          <Space size={8}>
            <CircleButton
              variant="ghost"
              size="sm"
              tooltip="Filter"
              icon={<FilterOutlined style={{ color: "#64748b" }} />}
            />
            <CircleButton
              variant="ghost"
              size="sm"
              tooltip="Refresh"
              icon={<ReloadOutlined style={{ color: "#64748b" }} />}
            />
          </Space>
        </div>

        {/* Filters */}
        <div
          style={{
            padding: "20px 32px",
            borderBottom: "1px solid rgba(0,0,0,0.04)",
            display: "flex",
            gap: 16,
            alignItems: 'center'
          }}
        >
          <Input
            placeholder="Search by donor name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              maxWidth: 320,
              borderRadius: 12,
              background: "#f8fafc",
              border: "1px solid rgba(0,0,0,0.04)",
              height: 44,
              paddingInline: 16,
              fontSize: 14,
              fontWeight: 500
            }}
          />
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: 180 }}
            className="premium-select"
            options={[
              { value: "all", label: "STATUS: ALL" },
              { value: "waiting", label: "STATUS: WAITING" },
              { value: "completed", label: "STATUS: COMPLETED" },
              { value: "skip", label: "STATUS: SKIP" },
            ]}
          />
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          loading={loading}
          size="middle"
          pagination={{
            pageSize: 10,
            style: { padding: '16px 32px', margin: 0, borderTop: '1px solid rgba(0,0,0,0.04)' },
            showTotal: (total, range) => (
              <Text style={{ fontSize: 11, color: "#94a3b8", fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Showing {range[0]}-{range[1]} of {total} records
              </Text>
            ),
          }}
        />

        <style jsx global>{`
          .ant-table-thead > tr > th {
            background: #f8fafc !important;
            color: #64748b !important;
            font-size: 11px !important;
            font-weight: 800 !important;
            text-transform: uppercase !important;
            letter-spacing: 0.1em !important;
            border-bottom: 1px solid rgba(0,0,0,0.04) !important;
            padding: 20px 32px !important;
          }
          .ant-table-tbody > tr > td {
            border-bottom: 1px solid rgba(0,0,0,0.04) !important;
            padding: 18px 32px !important;
          }
          .ant-table-tbody > tr:hover > td {
            background: rgba(0,0,0,0.01) !important;
          }
          .premium-select .ant-select-selector {
            border-radius: 12px !important;
            background: #f8fafc !important;
            border: 1px solid rgba(0,0,0,0.04) !important;
            height: 44px !important;
            display: flex !important;
            alignItems: center !important;
            font-size: 11px !important;
            font-weight: 800 !important;
            letter-spacing: 0.05em !important;
          }
        `}</style>
      </Card>

      <CompleteDrawer
        open={!!completeTarget}
        entry={completeTarget}
        onCancel={() => setCompleteTarget(null)}
        onConfirm={() => {
          if (completeTarget) onComplete?.(completeTarget.id);
          setCompleteTarget(null);
        }}
      />

      <SkipDrawer
        open={!!skipTarget}
        entry={skipTarget}
        onCancel={() => setSkipTarget(null)}
        onConfirm={() => {
          if (skipTarget) onSkip?.(skipTarget.id);
          setSkipTarget(null);
        }}
      />
    </>
  );
}
