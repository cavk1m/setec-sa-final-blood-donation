"use client";

import { useEffect, useState } from "react";
import { Card, Form, Input, Typography, message, Spin } from "antd";
import { LockOutlined, SaveOutlined, LoadingOutlined } from "@ant-design/icons";
import AppButton from "@/src/components/ui/app-button";
import { getProfile, updateProfile } from "@/src/features/auth/profile.api";

const { Text, Title } = Typography;

const labelStyle = {
  fontSize: 10,
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.12em",
  color: "#64748b",
};

export default function AdministrativeIdentity({ onSaveSuccess }: { onSaveSuccess?: () => void }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Load profile on mount
  useEffect(() => {
    getProfile()
      .then((profile: any) => {
        // Fallback for name fields in case of naming strategy issues
        const firstName = profile.first_name || profile.firstName || "";
        const lastName = profile.last_name || profile.lastName || "";
        
        form.setFieldsValue({
          full_name: `${firstName} ${lastName}`.trim(),
          email: profile.email,
          phone: profile.phone ?? "",
        });
      })
      .catch(() => {
        message.error("Failed to load profile.");
      })
      .finally(() => setFetching(false));
  }, [form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await updateProfile({
        full_name: values.full_name,
        phone: values.phone,
      });
      message.success("Identity saved successfully.");
      if (onSaveSuccess) onSaveSuccess();
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? "Failed to save identity.";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
      </div>
    );
  }

  return (
    <Card
      id="identity"
      style={{
        borderRadius: 0,
        border: "none",
      }}
      styles={{ body: { padding: 32 } }}
    >
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <Title level={5} style={{ margin: "0 0 4px", fontWeight: 700 }}>
          Administrative Identity
        </Title>
        <Text style={{ color: "#5d5c74", fontSize: 13 }}>
          Personnel details for system auditing.
        </Text>
      </div>

      <Form form={form} layout="vertical" requiredMark={false}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginBottom: 24,
          }}
        >
          <Form.Item
            name="full_name"
            label={<Text style={labelStyle}>Full Administrative Name</Text>}
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              style={{
                borderRadius: 10,
                background: "#f1f3ff",
                border: "none",
                height: 46,
                paddingLeft: 16,
                fontWeight: 500,
              }}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={<Text style={labelStyle}>System Email Address</Text>}
          >
            <Input
              readOnly
              suffix={<LockOutlined style={{ color: "#94a3b8" }} />}
              style={{
                borderRadius: 10,
                background: "#e3e8f9",
                border: "none",
                height: 46,
                paddingLeft: 16,
                color: "#5d5c74",
                fontStyle: "italic",
                cursor: "not-allowed",
              }}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="phone"
          label={<Text style={labelStyle}>Phone Number</Text>}
        >
          <Input
            placeholder="+855 ..."
            style={{
              borderRadius: 10,
              background: "#f1f3ff",
              border: "none",
              height: 46,
              paddingLeft: 16,
              fontWeight: 500,
            }}
          />
        </Form.Item>

        <AppButton
          variant="primary"
          size="md"
          label="Save Identity"
          icon={<SaveOutlined />}
          loading={loading}
          onClick={handleSave}
          style={{
            borderRadius: 10,
            background: "#ef4444",
            borderColor: "#ef4444",
            fontWeight: 700,
            height: 44,
            paddingInline: 28,
          }}
        />
      </Form>
    </Card>
  );
}
