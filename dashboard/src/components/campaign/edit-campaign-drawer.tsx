"use client";

import React, { useEffect } from "react";
import {
  Drawer,
  Form,
  Input,
  Select,
  Button,
  Typography,
  Divider,
  InputNumber,
} from "antd";
import { CloseOutlined, SaveOutlined, EditOutlined } from "@ant-design/icons";
import { CampaignItem } from "./campaign-card";

const { Text, Title } = Typography;
const { TextArea } = Input;

const labelStyle = {
  fontSize: 10,
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.12em",
  color: "#64748b",
};

interface EditCampaignDrawerProps {
  open: boolean;
  campaign: CampaignItem | null;
  onCancel: () => void;
  onSave: (updated: CampaignItem) => void;
}

export default function EditCampaignDrawer({
  open,
  campaign,
  onCancel,
  onSave,
}: EditCampaignDrawerProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (campaign) {
      form.setFieldsValue({
        name: campaign.name,
        description: campaign.description,
        raised: campaign.raised,
        goal: campaign.goal,
        status: campaign.status,
        createdAt: campaign.createdAt,
      });
    }
  }, [campaign, form]);

  if (!campaign) return null;

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave({ ...campaign, ...values });
      onCancel();
    });
  };

  const pct = Math.min(
    Math.round((campaign.raised / campaign.goal) * 100),
    100,
  );

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
          padding: "28px 28px 20px",
          borderBottom: "1px solid #f1f3ff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              background: "#fff1f2",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <EditOutlined style={{ color: "#b51822", fontSize: 18 }} />
          </div>
          <div>
            <Title level={5} style={{ margin: 0, fontWeight: 700 }}>
              Edit Campaign
            </Title>
            <Text style={{ fontSize: 12, color: "#94a3b8" }}>
              Update campaign details
            </Text>
          </div>
        </div>
        <Button
          type="text"
          shape="circle"
          icon={<CloseOutlined style={{ color: "#64748b" }} />}
          onClick={onCancel}
        />
      </div>

      {/* Current progress snapshot */}
      <div
        style={{
          margin: "20px 28px 0",
          padding: "16px 20px",
          background: "#f8fafc",
          borderRadius: 12,
          border: "1px solid #f1f3ff",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <Text style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>
            Current Progress
          </Text>
          <Text style={{ fontSize: 12, fontWeight: 700, color: "#b51822" }}>
            {pct}%
          </Text>
        </div>
        <div
          style={{
            background: "#e3e8f9",
            borderRadius: 999,
            height: 6,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background: "#b51822",
              borderRadius: 999,
              transition: "width 0.3s",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 6,
          }}
        >
          <Text style={{ fontSize: 11, color: "#94a3b8" }}>
            ${campaign.raised.toLocaleString()} raised
          </Text>
          <Text style={{ fontSize: 11, color: "#94a3b8" }}>
            ${campaign.goal.toLocaleString()} goal
          </Text>
        </div>
      </div>

      {/* Form */}
      <div
        style={{
          padding: "20px 28px",
          overflowY: "auto",
          height: "calc(100vh - 280px)",
        }}
      >
        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item
            name="name"
            label={<Text style={labelStyle}>Campaign Name</Text>}
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

          <Form.Item
            name="description"
            label={<Text style={labelStyle}>Description</Text>}
          >
            <TextArea
              rows={3}
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

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <Form.Item
              name="raised"
              label={<Text style={labelStyle}>Amount Raised ($)</Text>}
            >
              <InputNumber
                min={0}
                style={{ width: "100%", borderRadius: 999, height: 44 }}
                controls={false}
              />
            </Form.Item>

            <Form.Item
              name="goal"
              label={<Text style={labelStyle}>Goal Amount ($)</Text>}
              rules={[{ required: true, message: "Required" }]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%", borderRadius: 999, height: 44 }}
                controls={false}
              />
            </Form.Item>
          </div>

          <Form.Item
            name="status"
            label={<Text style={labelStyle}>Status</Text>}
          >
            <Select
              style={{ borderRadius: 999 }}
              options={[
                { value: "active", label: "Active" },
                { value: "completed", label: "Completed" },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="createdAt"
            label={<Text style={labelStyle}>Date</Text>}
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
        <Button
          block
          size="large"
          onClick={onCancel}
          style={{ fontWeight: 700, borderRadius: 999, borderColor: "#e3e8f9" }}
        >
          Cancel
        </Button>
        <Button
          block
          size="large"
          type="primary"
          icon={<SaveOutlined />}
          onClick={handleSave}
          style={{
            fontWeight: 700,
            borderRadius: 999,
            background: "#b51822",
            borderColor: "#b51822",
          }}
        >
          Save Changes
        </Button>
      </div>
    </Drawer>
  );
}
