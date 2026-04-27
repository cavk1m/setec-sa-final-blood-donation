"use client";

import { useRef, useState } from "react";
import { Card, Typography, Space } from "antd";
import {
  CloudUploadOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AppButton from "@/src/components/ui/app-button";

const { Text, Title } = Typography;

export default function WebsiteBranding() {
  const bannerRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [bannerFile, setBannerFile] = useState<string | null>(null);

  return (
    <Card
      id="website"
      style={{
        borderRadius: 20,
        border: "1px solid #e3e8f9",
        marginBottom: 24,
      }}
      styles={{ body: { padding: 32 } }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 28,
        }}
      >
        <div>
          <Title level={5} style={{ margin: "0 0 4px", fontWeight: 700 }}>
            Website Branding
          </Title>
          <Text style={{ color: "#5d5c74", fontSize: 13 }}>
            Manage public-facing corporate identifiers.
          </Text>
        </div>
        <span style={{ fontSize: 32, color: "#dde2f3" }}>🎨</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {/* Hero Banner */}
        <div>
          <Text
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#161c27",
              display: "block",
              marginBottom: 12,
            }}
          >
            Hero Banner Background
          </Text>
          <div
            onClick={() => bannerRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const file = e.dataTransfer.files[0];
              if (file) setBannerFile(file.name);
            }}
            style={{
              height: 192,
              borderRadius: 12,
              border: `2px dashed ${dragOver ? "#ef4444" : "#e4beba"}`,
              background: dragOver ? "#fff1f2" : "#ffdad720",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <CloudUploadOutlined style={{ fontSize: 28, color: "#ef4444" }} />
            {bannerFile ? (
              <Text style={{ fontWeight: 600, color: "#16a34a", fontSize: 13 }}>
                {bannerFile}
              </Text>
            ) : (
              <>
                <Text
                  style={{ fontWeight: 600, fontSize: 13, color: "#5d5c74" }}
                >
                  Click or drag to update banner
                </Text>
                <Text style={{ fontSize: 11, color: "#94a3b8" }}>
                  Recommended: 1920×480px (PNG, JPG)
                </Text>
              </>
            )}
          </div>
          <input
            ref={bannerRef}
            type="file"
            accept=".png,.jpg,.jpeg"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files?.[0]) setBannerFile(e.target.files[0].name);
            }}
          />
        </div>

        {/* Corporate Logo */}
        <div>
          <Text
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#161c27",
              display: "block",
              marginBottom: 12,
            }}
          >
            Corporate Logo
          </Text>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: 12,
                background: "#fff",
                border: "1px solid #e3e8f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.04)",
              }}
            >
              <span style={{ fontSize: 40, color: "#ef4444" }}>🩸</span>
            </div>
            <Space direction="vertical" size={10} style={{ flex: 1 }}>
              <AppButton
                block
                icon={<UploadOutlined />}
                label="Change Logo"
                onClick={() => logoRef.current?.click()}
                style={{
                  borderRadius: 8,
                  fontWeight: 600,
                  borderColor: "#e3e8f9",
                  fontSize: 13,
                }}
                variant="secondary"
                size="md"
              />
              <AppButton
                block
                icon={<DeleteOutlined />}
                label="Remove Identity"
                style={{
                  borderRadius: 8,
                  fontWeight: 600,
                  color: "#ef4444",
                  borderColor: "#ffdad7",
                  background: "#fff1f2",
                  fontSize: 13,
                }}
                variant="ghost"
                size="md"
              />
            </Space>
          </div>
          <input
            ref={logoRef}
            type="file"
            accept=".png,.jpg,.svg"
            style={{ display: "none" }}
          />
        </div>
      </div>
    </Card>
  );
}
