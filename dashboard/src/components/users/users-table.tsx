"use client";

import React, { useState } from "react";
import {
  Card,
  Table,
  Tag,
  Typography,
  Button,
  Avatar,
  Space,
  Input,
  Tooltip,
} from "antd";
import {
  EyeOutlined,
  UserAddOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import UserDetailDrawer, { UserItem } from "./user-detail-drawer";

const { Text } = Typography;

const MOCK_USERS: UserItem[] = [
  {
    id: "1",
    initials: "SM",
    avatarBg: "#ffdad6",
    avatarColor: "#ba1a1a",
    fullName: "Sarah Mitchell",
    systemId: "#AP-4491",
    email: "sarah.m@clinicalpulse.com",
    phone: "+1 (555) 902-3481",
    address: "4521 Medical Center Blvd, Suite 200, Austin, TX",
    bloodType: "O+",
    role: "Admin",
    joinedDate: "Oct 12, 2023",
    donationHistory: [
      {
        type: "Whole Blood Donation",
        location: "St. Jude Regional Center",
        date: "Feb 24, 2024",
      },
      {
        type: "Plasma Donation",
        location: "Central Blood Bank",
        date: "Jan 12, 2024",
      },
    ],
    badges: [
      { label: "Life Saver Silver", sub: "10+ Donations", icon: "🩸" },
      { label: "Identity Verified", sub: "Clinical Check", icon: "✓" },
    ],
  },
  {
    id: "2",
    initials: "RJ",
    avatarBg: "#e0f2fe",
    avatarColor: "#0369a1",
    fullName: "Robert Jenkins",
    systemId: "#DO-8821",
    email: "r.jenkins@gmail.com",
    phone: "+1 (555) 128-4490",
    bloodType: "A-",
    role: "Donor",
    joinedDate: "Jan 05, 2024",
    donationHistory: [
      {
        type: "Whole Blood Donation",
        location: "Downtown Plaza Center",
        date: "Mar 10, 2024",
      },
    ],
    badges: [{ label: "First Donor", sub: "1 Donation", icon: "⭐" }],
  },
  {
    id: "3",
    initials: "CH",
    avatarBg: "#dcfce7",
    avatarColor: "#15803d",
    fullName: "City Hospital North",
    systemId: "#OR-1022",
    email: "contact@cityhosp.org",
    phone: "+1 (555) 880-1122",
    role: "Organization",
    joinedDate: "Mar 22, 2024",
  },
  {
    id: "4",
    initials: "AL",
    avatarBg: "#e0f2fe",
    avatarColor: "#0369a1",
    fullName: "Amanda Lee",
    systemId: "#DO-9923",
    email: "a.lee@yahoo.com",
    phone: "+1 (555) 332-9012",
    bloodType: "B+",
    role: "Donor",
    joinedDate: "Apr 15, 2024",
  },
  {
    id: "5",
    initials: "TC",
    avatarBg: "#e0f2fe",
    avatarColor: "#0369a1",
    fullName: "Thomas Chen",
    systemId: "#DO-7741",
    email: "t.chen88@outlook.com",
    phone: "+1 (555) 776-5541",
    bloodType: "AB+",
    role: "Donor",
    joinedDate: "Feb 28, 2024",
  },
];

const ROLE_STYLE: Record<string, { bg: string; color: string }> = {
  Admin: { bg: "#ffdad6", color: "#ba1a1a" },
  Donor: { bg: "#dbeafe", color: "#1d4ed8" },
  Organization: { bg: "#dcfce7", color: "#15803d" },
};

const BLOOD_STYLE: Record<string, { bg: string; color: string }> = {
  "O+": { bg: "#d1fae5", color: "#047857" },
  "O-": { bg: "#d1fae5", color: "#047857" },
  "A+": { bg: "#fee2e2", color: "#b91c1c" },
  "A-": { bg: "#fee2e2", color: "#b91c1c" },
  "B+": { bg: "#dbeafe", color: "#1d4ed8" },
  "B-": { bg: "#dbeafe", color: "#1d4ed8" },
  "AB+": { bg: "#ede9fe", color: "#6d28d9" },
  "AB-": { bg: "#ede9fe", color: "#6d28d9" },
};

type RoleFilter = "all" | "Donor" | "Admin" | "Organization";

export default function UsersTable() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);

  const filtered = MOCK_USERS.filter((u) => {
    const matchSearch =
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const columns: ColumnsType<UserItem> = [
    {
      key: "avatar",
      width: 60,
      render: (_, r) => (
        <Avatar
          size={40}
          style={{
            background: r.avatarBg,
            color: r.avatarColor,
            fontWeight: 700,
            fontSize: 13,
            borderRadius: 12,
          }}
        >
          {r.initials}
        </Avatar>
      ),
    },
    {
      title: "Full Name",
      key: "fullName",
      render: (_, r) => (
        <div>
          <Text style={{ fontWeight: 700, fontSize: 14, display: "block" }}>
            {r.fullName}
          </Text>
          <Text style={{ fontSize: 10, color: "#94a3b8" }}>
            System ID: {r.systemId}
          </Text>
        </div>
      ),
    },
    {
      title: "Contact Details",
      key: "contact",
      render: (_, r) => (
        <div>
          <Text style={{ fontSize: 13, fontWeight: 500, display: "block" }}>
            {r.email}
          </Text>
          <Text style={{ fontSize: 12, color: "#64748b" }}>{r.phone}</Text>
        </div>
      ),
    },
    {
      title: "Blood Type",
      key: "bloodType",
      align: "center",
      width: 110,
      render: (_, r) => {
        if (!r.bloodType)
          return (
            <Text
              style={{ fontSize: 11, color: "#94a3b8", fontStyle: "italic" }}
            >
              N/A
            </Text>
          );
        const s = BLOOD_STYLE[r.bloodType] ?? {
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
            }}
          >
            {r.bloodType}
          </Tag>
        );
      },
    },
    {
      title: "Role",
      key: "role",
      width: 130,
      render: (_, r) => {
        const s = ROLE_STYLE[r.role] ?? { bg: "#f1f5f9", color: "#475569" };
        return (
          <Tag
            style={{
              background: s.bg,
              color: s.color,
              border: "none",
              fontWeight: 700,
              fontSize: 10,
              borderRadius: 6,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {r.role}
          </Tag>
        );
      },
    },
    {
      title: "Joined Date",
      dataIndex: "joinedDate",
      key: "joinedDate",
      render: (val) => (
        <Text style={{ fontSize: 13, color: "#64748b" }}>{val}</Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: (_, r) => (
        <Tooltip title="View details">
          <Button
            type="text"
            shape="circle"
            icon={<EyeOutlined style={{ color: "#b51822", fontSize: 18 }} />}
            onClick={() => setSelectedUser(r)}
          />
        </Tooltip>
      ),
    },
  ];

  const ROLE_TABS: { key: RoleFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "Donor", label: "Donor" },
    { key: "Admin", label: "Admin" },
    { key: "Organization", label: "Organization" },
  ];

  return (
    <>
      {/* Filter + search + add */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 20,
        }}
      >
        <div>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#94a3b8",
              display: "block",
              marginBottom: 10,
            }}
          >
            Filter by Role
          </Text>
          <Space size={8}>
            {ROLE_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setRoleFilter(tab.key)}
                style={{
                  padding: "8px 20px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  background: roleFilter === tab.key ? "#b51822" : "#e3e8f9",
                  color: roleFilter === tab.key ? "#fff" : "#5d5c74",
                  boxShadow:
                    roleFilter === tab.key
                      ? "0 4px 12px rgba(181,24,34,0.25)"
                      : "none",
                  transition: "all 0.15s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </Space>
        </div>

        <Button
          type="primary"
          icon={<UserAddOutlined />}
          style={{
            fontWeight: 700,
            borderRadius: 999,
            background: "#b51822",
            borderColor: "#b51822",
            height: 40,
            paddingInline: 24,
            boxShadow: "0 4px 12px rgba(181,24,34,0.25)",
          }}
        >
          Add New User
        </Button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 16 }}>
        <Input
          prefix={<SearchOutlined style={{ color: "#94a3b8" }} />}
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            borderRadius: 999,
            background: "#f1f3ff",
            border: "none",
            height: 42,
            maxWidth: 380,
          }}
        />
      </div>

      {/* Table */}
      <Card
        style={{
          borderRadius: 20,
          border: "1px solid #e3e8f9",
          overflow: "hidden",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Table
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          size="middle"
          pagination={{
            pageSize: 10,
            showTotal: (total, range) => (
              <Text
                style={{
                  fontSize: 12,
                  color: "#64748b",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Showing {range[1]} of {total} users
              </Text>
            ),
          }}
          onRow={(r) => ({
            onClick: () => setSelectedUser(r),
            style: { cursor: "pointer" },
          })}
        />
      </Card>

      <UserDetailDrawer
        open={!!selectedUser}
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </>
  );
}
