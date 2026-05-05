"use client";

import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  Input,
  Select,
  Form,
  Row,
  Col,
  Space,
} from "antd";
import {
  LinkOutlined,
  PlusCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { createLocation, updateLocation, LocationData } from "@/src/features/location/location.api";
import { message } from "antd";

const { Text, Title } = Typography;

interface AddLocationDrawerProps {
  open: boolean;
  initialData?: LocationData | null;
  onCancel: () => void;
  onSave: () => void;
}

export default function AddLocationDrawer({
  open,
  initialData,
  onCancel,
  onSave,
}: AddLocationDrawerProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [qrUrlPreview, setQrUrlPreview] = useState<string | null>(null);

  React.useEffect(() => {
    if (open && initialData) {
      form.setFieldsValue({
        locationName: initialData.name,
        address: initialData.address,
        latitude: initialData.latitude,
        longitude: initialData.longitude,
        donationType: initialData.donation_type,
        status: initialData.status || 'OPERATIONAL',
        payment_qr_url: initialData.payment_qr_url,
      });
      setQrUrlPreview(initialData.payment_qr_url || null);
    } else if (open) {
      form.resetFields();
      setQrUrlPreview(null);
    }
  }, [open, initialData, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const lat = values.latitude ? parseFloat(values.latitude.toString().replace(',', '.')) : null;
      const lng = values.longitude ? parseFloat(values.longitude.toString().replace(',', '.')) : null;

      const payload = {
        name: values.locationName,
        address: values.address,
        latitude: isNaN(lat as number) ? null : lat,
        longitude: isNaN(lng as number) ? null : lng,
        donation_type: values.donationType,
        status: values.status,
        payment_qr_url: values.payment_qr_url, // Just the URL string
      };

      if (initialData?.id) {
        await updateLocation(initialData.id, payload);
        message.success("Location updated successfully");
      } else {
        await createLocation(payload);
        message.success("Location created successfully");
      }
      
      form.resetFields();
      setQrUrlPreview(null);
      onSave();
    } catch (error: any) {
      console.error("Failed to save location:", error);
      const errorMsg = error.response?.data?.message || error.message || "Failed to save location";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      open={open}
      onClose={onCancel}
      placement="right"
      title={null}
      closable={false}
      styles={{
        body: { padding: 0 },
        wrapper: { width: 480, boxShadow: "-4px 0 24px rgba(0,0,0,0.1)" },
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "28px 32px 24px",
          borderBottom: "1px solid #f1f3ff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Title level={5} style={{ margin: 0, fontWeight: 700 }}>
            {initialData ? "Edit Location" : "Add New Location"}
          </Title>
          <Text style={{ fontSize: 13, color: "#94a3b8" }}>
            {initialData ? "Modify existing center details" : "Fill in the details below"}
          </Text>
        </div>
        <Button
          type="text"
          shape="circle"
          icon={<CloseOutlined style={{ color: "#64748b" }} />}
          onClick={onCancel}
        />
      </div>

      {/* Form body */}
      <div
        style={{
          padding: "28px 32px",
          overflowY: "auto",
          height: "calc(100vh - 160px)",
        }}
      >
        <Form form={form} layout="vertical" requiredMark={false}>
          {/* Location Name */}
          <Form.Item
            name="locationName"
            label={
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#64748b",
                }}
              >
                Location Name
              </Text>
            }
            rules={[{ required: true, message: "Please enter location name" }]}
          >
            <Input
              placeholder="e.g. St. Jude Clinic"
              style={{
                borderRadius: 999,
                background: "#f8fafc",
                border: "1px solid #e3e8f9",
                height: 44,
                paddingLeft: 18,
              }}
            />
          </Form.Item>

          {/* Full Address */}
          <Form.Item
            name="address"
            label={
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#64748b",
                }}
              >
                Full Address
              </Text>
            }
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input.TextArea
              placeholder="Enter full street address"
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

          {/* Lat + Long */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="latitude"
                label={
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "#64748b",
                    }}
                  >
                    Latitude
                  </Text>
                }
              >
                <Input
                  placeholder="0.0000"
                  style={{
                    borderRadius: 999,
                    background: "#f8fafc",
                    border: "1px solid #e3e8f9",
                    height: 44,
                    paddingLeft: 18,
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="longitude"
                label={
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "#64748b",
                    }}
                  >
                    Longitude
                  </Text>
                }
              >
                <Input
                  placeholder="0.0000"
                  style={{
                    borderRadius: 999,
                    background: "#f8fafc",
                    border: "1px solid #e3e8f9",
                    height: 44,
                    paddingLeft: 18,
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Donation Type */}
          <Form.Item
            name="donationType"
            label={
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#64748b",
                }}
              >
                Donation Type
              </Text>
            }
            rules={[{ required: true, message: "Please select donation type" }]}
          >
            <Select
              placeholder="Select Donation Type"
              style={{ borderRadius: 999 }}
              options={[
                { value: "BLOOD", label: "Blood Donation" },
                { value: "MONEY", label: "Money Donation" },
                { value: "BOTH", label: "Both (Blood & Money)" },
              ]}
            />
          </Form.Item>

          {/* Status */}
          <Form.Item
            name="status"
            label={
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#64748b",
                }}
              >
                Operational Status
              </Text>
            }
            initialValue="OPERATIONAL"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select
              placeholder="Select Status"
              style={{ borderRadius: 999 }}
              options={[
                { value: "OPERATIONAL", label: "Operational" },
                { value: "MAINTENANCE", label: "Under Maintenance" },
                { value: "CLOSED", label: "Temporarily Closed" },
              ]}
            />
          </Form.Item>

          {/* QR URL Input */}
          <Form.Item
            name="payment_qr_url"
            label={
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#64748b",
                }}
              >
                Payment QR Image URL
              </Text>
            }
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Input
                placeholder="Paste Image URL here (e.g. https://...)"
                prefix={<LinkOutlined style={{ color: '#94a3b8' }} />}
                onChange={(e) => setQrUrlPreview(e.target.value)}
                style={{
                  borderRadius: 999,
                  background: "#f8fafc",
                  border: "1px solid #e3e8f9",
                  height: 44,
                  paddingLeft: 18,
                }}
              />
              {qrUrlPreview && (
                <div style={{ marginTop: 12, textAlign: 'center', background: '#f8fafc', padding: 16, borderRadius: 12, border: '1px solid #e3e8f9' }}>
                  <Text style={{ display: 'block', fontSize: 10, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase' }}>Preview</Text>
                  <img 
                    src={qrUrlPreview} 
                    alt="QR Preview" 
                    style={{ maxWidth: '100%', maxHeight: 150, borderRadius: 8 }} 
                    onError={() => setQrUrlPreview(null)}
                  />
                </div>
              )}
            </Space>
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
          padding: "16px 32px",
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
          style={{
            fontWeight: 700,
            borderRadius: 999,
            borderColor: "#e3e8f9",
            color: "#475569",
          }}
        >
          Cancel
        </Button>
        <Button
          block
          size="large"
          type="primary"
          loading={loading}
          icon={<PlusCircleOutlined />}
          onClick={handleSubmit}
          style={{
            fontWeight: 700,
            borderRadius: 999,
            background: "#ef4444",
            borderColor: "#ef4444",
          }}
        >
          Save Location
        </Button>
      </div>
    </Drawer>
  );
}
