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
  DeleteOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import UserDetailDrawer from "./user-detail-drawer";
import CreateUserDrawer from "./create-user-drawer";
import EditUserDrawer from "./edit-user-drawer";
import { message, Popconfirm } from "antd";

import { fetchUsers, deleteUser, createUser, updateUser, updateUserRole, UserItem as ApiUser } from "@/src/features/users/users.api";
import dayjs from "dayjs";

const { Text } = Typography;

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
  role: "Admin" | "Donor" | "Organization";
  joinedDate: string;
  dateOfBirth?: string;
  locationId?: string;
  donationHistory?: { type: string; location: string; date: string }[];
  badges?: { label: string; sub: string; icon: string }[];
}

const ROLE_STYLE: Record<string, { bg: string; color: string }> = {
  Admin: { bg: "#ffdad6", color: "#ba1a1a" },
  Donor: { bg: "#dbeafe", color: "#1d4ed8" },
  Organization: { bg: "#dcfce7", color: "#15803d" },
};

const AVATAR_PALETTE = [
  { bg: "#ffdad6", color: "#ba1a1a" },
  { bg: "#e0f2fe", color: "#0369a1" },
  { bg: "#dcfce7", color: "#15803d" },
  { bg: "#ede9fe", color: "#6d28d9" },
  { bg: "#fef3c7", color: "#92400e" },
];

const mapApiToUserItem = (apiUser: ApiUser): UserItem => {
  const paletteIndex = apiUser.id.charCodeAt(0) % AVATAR_PALETTE.length;
  const palette = AVATAR_PALETTE[paletteIndex];
  
  // Map roles from backend (USER, ADMIN) to frontend labels
  const roleMap: Record<string, "Admin" | "Donor" | "Organization"> = {
    ADMIN: "Admin",
    DONOR: "Donor",
    STAFF: "Organization",
    USER: "Donor",
  };

  return {
    id: apiUser.id,
    initials: `${apiUser.first_name?.[0] || ""}${apiUser.last_name?.[0] || ""}`.toUpperCase() || "?",
    avatarBg: palette.bg,
    avatarColor: palette.color,
    fullName: `${apiUser.first_name} ${apiUser.last_name}`.trim(),
    systemId: `#US-${apiUser.id.substring(0, 4)}`.toUpperCase(),
    email: apiUser.email,
    phone: apiUser.phone,
    bloodType: apiUser.blood_type,
    role: roleMap[apiUser.role] || "Donor",
    joinedDate: dayjs(apiUser.created_at).format("MMM DD, YYYY"),
    dateOfBirth: apiUser.date_of_birth ? dayjs(apiUser.date_of_birth).format("YYYY-MM-DD") : undefined,
    locationId: apiUser.location_id,
    address: apiUser.address,
  };
};

const BLOOD_STYLE: Record<string, { bg: string; color: string }> = {
  "O_POSITIVE": { bg: "#d1fae5", color: "#047857" },
  "O_NEGATIVE": { bg: "#d1fae5", color: "#047857" },
  "A_POSITIVE": { bg: "#fee2e2", color: "#b91c1c" },
  "A_NEGATIVE": { bg: "#fee2e2", color: "#b91c1c" },
  "B_POSITIVE": { bg: "#dbeafe", color: "#1d4ed8" },
  "B_NEGATIVE": { bg: "#dbeafe", color: "#1d4ed8" },
  "AB_POSITIVE": { bg: "#ede9fe", color: "#6d28d9" },
  "AB_NEGATIVE": { bg: "#ede9fe", color: "#6d28d9" },
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

type RoleFilter = "all" | "Donor" | "Admin" | "Organization";

export default function UsersTable() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const apiUsers = await fetchUsers();
      setUsers(apiUsers.map(mapApiToUserItem));
    } catch (err) {
      message.error("Failed to load users directory.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      message.success("User deleted successfully.");
      loadUsers();
    } catch (err) {
      message.error("Failed to delete user.");
    }
  };

  const handleCreate = async (data: any) => {
    try {
      await createUser({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        address: data.address,
        blood_type: data.bloodType,
        date_of_birth: data.dateOfBirth,
        location_id: data.locationId,
        role: data.role,
      });

      message.success("User created successfully");
      setIsCreateOpen(false);
      loadUsers();
    } catch (err: any) {
      message.error(err.response?.data?.message || "Failed to create user");
    }
  };

  const handleUpdate = async (updated: UserItem) => {
    try {
      // 1. Update general info
      await updateUser(updated.id, {
        full_name: updated.fullName,
        email: updated.email,
        phone: updated.phone,
        address: updated.address,
        blood_type: updated.bloodType,
        date_of_birth: updated.dateOfBirth,
        location_id: updated.locationId,
        is_active: updated.isActive,
        email_verified: updated.emailVerified,
        phone_verified: updated.phoneVerified,
      });

      // 2. Explicitly update role using specific endpoint
      await updateUserRole(updated.id, updated.role);

      message.success("User updated successfully");
      setIsEditOpen(false);
      loadUsers();
    } catch (err: any) {
      message.error(err.response?.data?.message || "Failed to update user");
    }
  };

  const filtered = users.filter((u) => {
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
            {BLOOD_LABELS[r.bloodType] || r.bloodType}
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
        <Space size={4}>
          <Tooltip title="View details">
            <Button
              type="text"
              shape="circle"
              icon={<EyeOutlined style={{ color: "#ef4444", fontSize: 18 }} />}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedUser(r);
              }}
            />
          </Tooltip>
          <Popconfirm
            title="Delete user"
            description="Are you sure you want to delete this user? This action cannot be undone."
            onConfirm={(e) => {
              e?.stopPropagation();
              handleDelete(r.id);
            }}
            onCancel={(e) => e?.stopPropagation()}
            okText="Yes, Delete"
            cancelText="No"
            okButtonProps={{ danger: true, style: { fontWeight: 600 } }}
          >
            <Tooltip title="Delete user">
              <Button
                type="text"
                shape="circle"
                icon={<DeleteOutlined style={{ color: "#94a3b8", fontSize: 18 }} />}
                onClick={(e) => e.stopPropagation()}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
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
                  background: roleFilter === tab.key ? "#ef4444" : "#e3e8f9",
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
          onClick={() => setIsCreateOpen(true)}
          style={{
            fontWeight: 700,
            borderRadius: 999,
            background: "#ef4444",
            borderColor: "#ef4444",
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
        styles={{ body: { padding: 0 } }}
      >
        <Table
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          size="middle"
          loading={loading}
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
        open={!!selectedUser && !isEditOpen}
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onEdit={() => setIsEditOpen(true)}
      />

      <CreateUserDrawer
        open={isCreateOpen}
        onCancel={() => setIsCreateOpen(false)}
        onSave={handleCreate}
      />

      <EditUserDrawer
        open={isEditOpen}
        user={selectedUser}
        onCancel={() => setIsEditOpen(false)}
        onSave={handleUpdate}
      />
    </>
  );
}
