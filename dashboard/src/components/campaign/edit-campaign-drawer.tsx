"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  Form,
  Input,
  Select,
  Button,
  Typography,
  Divider,
  InputNumber,
  message,
} from "antd";
import { CloseOutlined, SaveOutlined, EditOutlined } from "@ant-design/icons";
import { CampaignItem } from "./campaign-card";
import { createCampaign, updateCampaign } from "@/src/features/campaign/campaign.api";

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
  onSave: () => void;
}

export default function EditCampaignDrawer({
  open,
  campaign,
  onCancel,
  onSave,
}: EditCampaignDrawerProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (campaign) {
        form.setFieldsValue({
          name: campaign.name,
          description: campaign.description,
          raised: campaign.raised,
          goal: campaign.goal,
          status: campaign.status,
          createdAt: campaign.createdAt,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          status: 'active',
          raised: 0,
        });
      }
    }
  }, [open, campaign, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const payload = {
        title: values.name,
        description: values.description,
        target_amount: values.goal,
        image_url: "", // Can add upload later
        campaign_type: "blood", // Default
      };

      if (campaign?.id) {
        await updateCampaign(campaign.id, payload);
        message.success("Campaign updated successfully");
      } else {
        await createCampaign(payload);
        message.success("Campaign created successfully");
      }

      onSave();
    } catch (error: any) {
      console.error("Failed to save campaign:", error);
      message.error(error.response?.data?.message || "Failed to save campaign");
    } finally {
      setLoading(false);
    }
  };

  const raisedValue = Form.useWatch("raised", form);
  const goalValue = Form.useWatch("goal", form);

  const currentRaised = raisedValue || 0;
  const currentGoal = goalValue || 1;
  const pct = Math.min(Math.round((currentRaised / currentGoal) * 100), 100);

  return (
    <Drawer
      open={open}
      onClose={onCancel}
      placement="right"
      width={480}
      title={null}
      closable={false}
      destroyOnClose={true}
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
            <EditOutlined style={{ color: "#ef4444", fontSize: 18 }} />
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
          <Text style={{ fontSize: 12, fontWeight: 700, color: "#ef4444" }}>
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
              background: "#ef4444",
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
            ${(campaign?.raised || 0).toLocaleString()} raised
          </Text>
          <Text style={{ fontSize: 11, color: "#94a3b8" }}>
            ${(campaign?.goal || 0).toLocaleString()} goal
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
          loading={loading}
          icon={<SaveOutlined />}
          onClick={handleSave}
          style={{
            fontWeight: 700,
            borderRadius: 999,
            background: "#ef4444",
            borderColor: "#ef4444",
          }}
        >
          {campaign ? "Save Changes" : "Create Campaign"}
        </Button>
      </div>
    </Drawer>
  );
}
