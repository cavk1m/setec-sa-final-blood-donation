"use client";

import { useState } from "react";
import { Drawer, Form, Input, Select, Typography, Avatar } from "antd";
import { CloseOutlined, UserAddOutlined } from "@ant-design/icons";
import AppButton from "@/src/components/ui/app-button";
import CircleButton from "@/src/components/ui/circle-button";

const { Text, Title } = Typography;

const labelStyle = {
  fontSize: 10,
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.12em",
  color: "#64748b",
};

const AVATAR_PRESETS = [
  { bg: "#ffdad6", color: "#ba1a1a" },
  { bg: "#dbeafe", color: "#1d4ed8" },
  { bg: "#dcfce7", color: "#15803d" },
  { bg: "#ede9fe", color: "#6d28d9" },
  { bg: "#fef9c3", color: "#92400e" },
  { bg: "#e0f2fe", color: "#0369a1" },
];

interface CreateUserDrawerProps {
  open: boolean;
  onCancel: () => void;
  onSave: (data: any) => void;
}

export default function CreateUserDrawer({
  open,
  onCancel,
  onSave,
}: CreateUserDrawerProps) {
  const [form] = Form.useForm();
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [nameValue, setNameValue] = useState("");

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "BC";

  const handleSave = () => {
    form.validateFields().then((values) => {
      const preset = AVATAR_PRESETS[selectedAvatar];
      onSave({
        ...values,
        initials: getInitials(values.fullName),
        avatarBg: preset.bg,
        avatarColor: preset.color,
        systemId: `#${values.role === "Admin" ? "AP" : values.role === "Organization" ? "OR" : "DO"}-${Math.floor(Math.random() * 9000 + 1000)}`,
        joinedDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      form.resetFields();
      setNameValue("");
      setSelectedAvatar(0);
      onCancel();
    });
  };

  const handleClose = () => {
    form.resetFields();
    setNameValue("");
    onCancel();
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
          background: "#f0fdf4",
          padding: "28px 28px 24px",
          borderBottom: "1px solid #dcfce7",
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
                background: "#dcfce7",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UserAddOutlined style={{ color: "#15803d", fontSize: 22 }} />
            </div>
            <div>
              <Title
                level={5}
                style={{ margin: 0, fontWeight: 700, color: "#14532d" }}
              >
                Create New User
              </Title>
              <Text style={{ fontSize: 12, color: "#16a34a" }}>
                Add a new user to the system
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

      {/* Avatar picker */}
      <div style={{ padding: "24px 28px 0" }}>
        <Text style={{ ...labelStyle, display: "block", marginBottom: 12 }}>
          Choose Avatar Color
        </Text>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 4,
          }}
        >
          <Avatar
            size={56}
            style={{
              background: AVATAR_PRESETS[selectedAvatar].bg,
              color: AVATAR_PRESETS[selectedAvatar].color,
              fontWeight: 800,
              fontSize: 18,
              borderRadius: 14,
              flexShrink: 0,
              border: "2px solid #e3e8f9",
            }}
          >
            {getInitials(nameValue)}
          </Avatar>
          <div style={{ display: "flex", gap: 8 }}>
            {AVATAR_PRESETS.map((preset, i) => (
              <button
                key={i}
                onClick={() => setSelectedAvatar(i)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: preset.bg,
                  border:
                    selectedAvatar === i
                      ? `3px solid ${preset.color}`
                      : "2px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  outline: "none",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div
        style={{
          padding: "16px 28px",
          overflowY: "auto",
          height: "calc(100vh - 300px)",
        }}
      >
        <Form form={form} layout="vertical" requiredMark={false}>
          {/* Full name */}
          <Form.Item
            name="fullName"
            label={<Text style={labelStyle}>Full Name</Text>}
            rules={[{ required: true, message: "Required" }]}
          >
            <Input
              placeholder="e.g. Dr. Jane Smith"
              onChange={(e) => setNameValue(e.target.value)}
              style={{
                borderRadius: 999,
                background: "#f8fafc",
                border: "1px solid #e3e8f9",
                height: 44,
                paddingLeft: 18,
              }}
            />
          </Form.Item>

          {/* Email + Phone */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <Form.Item
              name="email"
              label={<Text style={labelStyle}>Email Address</Text>}
              rules={[
                { required: true, message: "Required" },
                { type: "email", message: "Invalid email" },
              ]}
            >
              <Input
                placeholder="user@example.com"
                style={{
                  borderRadius: 999,
                  background: "#f8fafc",
                  border: "1px solid #e3e8f9",
                  height: 44,
                  paddingLeft: 18,
                }}
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label={<Text style={labelStyle}>Phone Number</Text>}
              rules={[{ required: true, message: "Required" }]}
            >
              <Input
                placeholder="+1 (555) 000-0000"
                style={{
                  borderRadius: 999,
                  background: "#f8fafc",
                  border: "1px solid #e3e8f9",
                  height: 44,
                  paddingLeft: 18,
                }}
              />
            </Form.Item>
          </div>

          {/* Role + Blood Type */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <Form.Item
              name="role"
              label={<Text style={labelStyle}>Role</Text>}
              rules={[{ required: true, message: "Required" }]}
            >
              <Select
                placeholder="Select role"
                options={[
                  { value: "Donor", label: "Donor" },
                  { value: "Admin", label: "Admin" },
                  { value: "Organization", label: "Organization" },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="bloodType"
              label={<Text style={labelStyle}>Blood Type</Text>}
            >
              <Select
                placeholder="Select type"
                allowClear
                options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                  (t) => ({ value: t, label: t }),
                )}
              />
            </Form.Item>
          </div>

          {/* Address */}
          <Form.Item
            name="address"
            label={<Text style={labelStyle}>Residential Address</Text>}
          >
            <Input.TextArea
              placeholder="Enter full address"
              rows={2}
              style={{
                borderRadius: 16,
                background: "#f8fafc",
                border: "1px solid #e3e8f9",
                paddingLeft: 18,
                paddingTop: 12,
                resize: "none",
              }}
            />
          </Form.Item>

          {/* Password */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <Form.Item
              name="password"
              label={<Text style={labelStyle}>Password</Text>}
              rules={[
                { required: true, message: "Required" },
                { min: 8, message: "Min 8 chars" },
              ]}
            >
              <Input.Password
                style={{
                  borderRadius: 999,
                  background: "#f8fafc",
                  border: "1px solid #e3e8f9",
                  height: 44,
                  paddingLeft: 18,
                }}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={<Text style={labelStyle}>Confirm Password</Text>}
              rules={[
                { required: true, message: "Required" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value)
                      return Promise.resolve();
                    return Promise.reject("Passwords do not match");
                  },
                }),
              ]}
            >
              <Input.Password
                style={{
                  borderRadius: 999,
                  background: "#f8fafc",
                  border: "1px solid #e3e8f9",
                  height: 44,
                  paddingLeft: 18,
                }}
              />
            </Form.Item>
          </div>
        </Form>
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
          variant="success"
          label="Create User"
          icon={<UserAddOutlined />}
          onClick={handleSave}
          style={{
            fontWeight: 700,
            borderRadius: 999,
            background: "#16a34a",
            borderColor: "#16a34a",
          }}
        />
      </div>
    </Drawer>
  );
}
