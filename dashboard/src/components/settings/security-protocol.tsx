"use client";

import { useState } from "react";
import { Card, Form, Input, Typography, message } from "antd";
import { SafetyOutlined, SyncOutlined } from "@ant-design/icons";
import AppButton from "@/src/components/ui/app-button";
import { changePassword } from "@/src/features/auth/profile.api";

const { Text, Title } = Typography;

const labelStyle = {
  fontSize: 10,
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.12em",
  color: "#64748b",
};

export default function SecurityProtocol({ onSaveSuccess }: { onSaveSuccess?: () => void }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      message.success("Password changed successfully.");
      form.resetFields();
      if (onSaveSuccess) onSaveSuccess();
    } catch (err: any) {
      // Validation errors are handled by antd – only handle API errors here
      if (err?.response) {
        const msg = err?.response?.data?.message ?? "Failed to change password.";
        message.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      id="security"
      style={{
        borderRadius: 0,
        border: "none",
      }}
      styles={{ body: { padding: 32 } }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "#ffdad6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <SafetyOutlined style={{ fontSize: 22, color: "#ef4444" }} />
        </div>
        <div>
          <Title level={5} style={{ margin: "0 0 2px", fontWeight: 700 }}>
            Security Protocol
          </Title>
          <Text style={{ color: "#5d5c74", fontSize: 13 }}>
            Update access credentials periodically.
          </Text>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        style={{ maxWidth: 640 }}
      >
        <Form.Item
          name="currentPassword"
          label={<Text style={labelStyle}>Current Password</Text>}
          rules={[{ required: true, message: "Please enter current password" }]}
        >
          <Input.Password
            placeholder="••••••••••••"
            style={{
              borderRadius: 10,
              background: "#f1f3ff",
              border: "none",
              height: 46,
              paddingLeft: 16,
            }}
          />
        </Form.Item>

        <div
        >
          <Form.Item
            name="newPassword"
            label={<Text style={labelStyle}>New Secure Password</Text>}
            rules={[
              { required: true, message: "Please enter new password" },
              { min: 8, message: "Min 8 characters" },
            ]}
          >
            <Input.Password
              style={{
                borderRadius: 10,
                background: "#f1f3ff",
                border: "none",
                height: 46,
                paddingLeft: 16,
              }}
            />
          </Form.Item>

          {/* <Form.Item
            name="confirmPassword"
            label={<Text style={labelStyle}>Confirm New Password</Text>}
            rules={[
              { required: true, message: "Please confirm password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value)
                    return Promise.resolve();
                  return Promise.reject("Passwords do not match");
                },
              }),
            ]}
          >
            <Input.Password
              style={{
                borderRadius: 10,
                background: "#f1f3ff",
                border: "none",
                height: 46,
                paddingLeft: 16,
              }}
            />
          </Form.Item> */}
        </div>

        <AppButton
          variant="primary"
          size="lg"
          label="Update Password"
          icon={<SyncOutlined />}
          loading={loading}
          onClick={handleSubmit}
          style={{
            borderRadius: 10,
            background: "#ef4444",
            borderColor: "#ef4444",
            fontWeight: 700,
            height: 48,
            paddingInline: 32,
            fontSize: 14,
          }}
        />
      </Form>
    </Card>
  );
}
