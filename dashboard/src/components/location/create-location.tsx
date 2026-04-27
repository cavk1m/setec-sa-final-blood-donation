"use client";

import React, { useState, useRef } from "react";
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
  CloudUploadOutlined,
  PlusCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { LocationItem } from "./location-card";
// import type { LocationItem } from './LocationCard';

const { Text, Title } = Typography;

interface AddLocationDrawerProps {
  open: boolean;
  onCancel: () => void;
  onSave: (data: Omit<LocationItem, "id">) => void;
}

export default function AddLocationDrawer({
  open,
  onCancel,
  onSave,
}: AddLocationDrawerProps) {
  const [form] = Form.useForm();
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setFileName(file.name);
    }
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSave({
        name: values.locationName,
        address: values.address,
        donationType: values.donationType,
        queueCount: 0,
        hasQR: !!fileName,
      });
      form.resetFields();
      setFileName(null);
      onCancel();
    });
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
            Add New Location
          </Title>
          <Text style={{ fontSize: 13, color: "#94a3b8" }}>
            Fill in the details below
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
                { value: "WHOLE BLOOD", label: "Whole Blood" },
                { value: "PLASMA ONLY", label: "Plasma Only" },
                { value: "PLATELETS", label: "Platelets" },
              ]}
            />
          </Form.Item>

          {/* QR Upload */}
          <Form.Item
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
                Payment QR Image
              </Text>
            }
          >
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const file = e.dataTransfer.files[0];
                if (file) handleFileSelect(file);
              }}
              style={{
                border: `2px dashed ${dragOver ? "#ef4444" : "#e3e8f9"}`,
                borderRadius: 16,
                padding: "32px 24px",
                textAlign: "center",
                background: dragOver ? "#fff1f2" : "#f8fafc",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  background: "#f1f3ff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px",
                }}
              >
                <CloudUploadOutlined
                  style={{ fontSize: 22, color: "#5d5c74" }}
                />
              </div>
              {fileName ? (
                <Text
                  style={{ fontWeight: 600, color: "#16a34a", fontSize: 14 }}
                >
                  {fileName}
                </Text>
              ) : (
                <>
                  <Text
                    style={{
                      fontWeight: 600,
                      fontSize: 14,
                      display: "block",
                      color: "#161c27",
                    }}
                  >
                    Drag & drop or click to upload
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#94a3b8",
                      marginTop: 4,
                      display: "block",
                    }}
                  >
                    Supports JPG, PNG (Max 5MB)
                  </Text>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
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
