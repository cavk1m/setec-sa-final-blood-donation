"use client";

import { useEffect } from "react";
import { Drawer, Form, Input, Select, Typography, Avatar } from "antd";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import type { UserItem } from "./user-detail-drawer";
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

interface EditUserDrawerProps {
  open: boolean;
  user: UserItem | null;
  onCancel: () => void;
  onSave: (updated: UserItem) => void;
}

export default function EditUserDrawer({
  open,
  user,
  onCancel,
  onSave,
}: EditUserDrawerProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address ?? "",
        role: user.role,
        bloodType: user.bloodType ?? undefined,
      });
    }
  }, [user, form]);

  if (!user) return null;

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave({
        ...user,
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        address: values.address,
        role: values.role,
        bloodType: values.bloodType,
        initials: values.fullName
          .split(" ")
          .map((n: string) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2),
      });
      onCancel();
    });
  };

  return (
    <Drawer
      open={open}
      onClose={onCancel}
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
          padding: "28px 28px 24px",
          borderBottom: "1px solid #f1f3ff",
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
            {/* User avatar preview */}
            <Avatar
              size={48}
              style={{
                background: user.avatarBg,
                color: user.avatarColor,
                fontWeight: 800,
                fontSize: 16,
                borderRadius: 12,
                flexShrink: 0,
              }}
            >
              {user.initials}
            </Avatar>
            <div>
              <Title level={5} style={{ margin: 0, fontWeight: 700 }}>
                Edit User
              </Title>
              <Text style={{ fontSize: 12, color: "#94a3b8" }}>
                {user.systemId}
              </Text>
            </div>
          </div>
          <CircleButton
            variant="ghost"
            size="sm"
            tooltip="Close"
            icon={<CloseOutlined style={{ color: "#64748b" }} />}
            onClick={onCancel}
          />
        </div>
      </div>

      {/* Form */}
      <div
        style={{
          padding: "24px 28px",
          overflowY: "auto",
          height: "calc(100vh - 160px)",
        }}
      >
        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item
            name="fullName"
            label={<Text style={labelStyle}>Full Name</Text>}
            rules={[{ required: true, message: "Required" }]}
          >
            <Input
              style={{
                borderRadius: 999,
                background: "#f8fafc",
                border: "1px solid #e3e8f9",
                height: 44,
                paddingLeft: 18,
              }}
            />
          </Form.Item>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <Form.Item
              name="email"
              label={<Text style={labelStyle}>Email Address</Text>}
              rules={[
                { required: true },
                { type: "email", message: "Invalid email" },
              ]}
            >
              <Input
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

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <Form.Item
              name="role"
              label={<Text style={labelStyle}>Role</Text>}
              rules={[{ required: true, message: "Required" }]}
            >
              <Select
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
                placeholder="N/A"
                allowClear
                options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                  (t) => ({ value: t, label: t }),
                )}
              />
            </Form.Item>
          </div>

          <Form.Item
            name="address"
            label={<Text style={labelStyle}>Residential Address</Text>}
          >
            <Input.TextArea
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

          {/* Read-only system info */}
          <div
            style={{
              background: "#f8fafc",
              borderRadius: 12,
              padding: "14px 18px",
              border: "1px solid #f1f3ff",
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
              System Info (Read Only)
            </Text>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {[
                { label: "System ID", value: user.systemId },
                { label: "Joined Date", value: user.joinedDate },
              ].map((item, i) => (
                <div key={i}>
                  <Text
                    style={{ fontSize: 10, color: "#94a3b8", display: "block" }}
                  >
                    {item.label}
                  </Text>
                  <Text
                    style={{ fontSize: 13, fontWeight: 600, color: "#475569" }}
                  >
                    {item.value}
                  </Text>
                </div>
              ))}
            </div>
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
          onClick={onCancel}
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
          icon={<SaveOutlined />}
          label="Save Changes"
          onClick={handleSave}
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
