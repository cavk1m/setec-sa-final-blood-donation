"use client";

import { Card, Form, Input, Typography } from "antd";
import { LockOutlined, SaveOutlined } from "@ant-design/icons";
import AppButton from "@/src/components/ui/app-button";

const { Text, Title } = Typography;

const labelStyle = {
  fontSize: 10,
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.12em",
  color: "#64748b",
};

export default function AdministrativeIdentity() {
  const [form] = Form.useForm();

  return (
    <Card
      id="identity"
      style={{
        borderRadius: 20,
        border: "1px solid #e3e8f9",
        marginBottom: 24,
      }}
      bodyStyle={{ padding: 32 }}
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

      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        initialValues={{
          fullName: "Dr. Adrian Vance",
          email: "a.vance@bloodconnect.clinical",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginBottom: 24,
          }}
        >
          <Form.Item
            name="fullName"
            label={<Text style={labelStyle}>Full Administrative Name</Text>}
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

        <AppButton
          variant="primary"
          size="md"
          label="Save Identity"
          icon={<SaveOutlined />}
          style={{
            borderRadius: 10,
            background: "#b51822",
            borderColor: "#b51822",
            fontWeight: 700,
            height: 44,
            paddingInline: 28,
          }}
        />
      </Form>
    </Card>
  );
}
