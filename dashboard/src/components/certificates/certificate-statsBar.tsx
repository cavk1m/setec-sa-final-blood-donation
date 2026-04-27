"use client";

import React from "react";
import { Row, Col, Card, Typography, Progress, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

interface CertificateStatsBarProps {
  onSearch?: (value: string) => void;
}

export default function CertificateStatsBar({
  onSearch,
}: CertificateStatsBarProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      {/* Stats row */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {/* Total Issued */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            styles={{ body: { padding: "20px 24px" } }}
            style={{
              borderRadius: 16,
              border: "1px solid #e3e8f9",
              height: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#64748b",
                display: "block",
                marginBottom: 12,
              }}
            >
              Total Issued
            </Text>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <Title
                level={2}
                style={{
                  margin: 0,
                  fontWeight: 900,
                  letterSpacing: "-1.5px",
                  lineHeight: 1,
                }}
              >
                1,482
              </Title>
              <span
                style={{
                  background: "#ffdad7",
                  color: "#ef4444",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: 999,
                }}
              >
                +12%
              </span>
            </div>
          </Card>
        </Col>

        {/* Pending Print */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            styles={{ body: { padding: "20px 24px" } }}
            style={{
              borderRadius: 16,
              border: "1px solid #e3e8f9",
              height: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#64748b",
                display: "block",
                marginBottom: 12,
              }}
            >
              Pending Print
            </Text>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <Title
                level={2}
                style={{
                  margin: 0,
                  fontWeight: 900,
                  letterSpacing: "-1.5px",
                  lineHeight: 1,
                }}
              >
                24
              </Title>
              <span
                style={{
                  background: "#dbeafe",
                  color: "#1d4ed8",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: 999,
                }}
              >
                Active
              </span>
            </div>
          </Card>
        </Col>

        {/* Top Location */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            styles={{ body: { padding: "20px 24px" } }}
            style={{
              borderRadius: 16,
              border: "1px solid #e3e8f9",
              height: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#64748b",
                display: "block",
                marginBottom: 12,
              }}
            >
              Top Location
            </Text>
            <Title
              level={5}
              style={{
                margin: "0 0 2px",
                fontWeight: 700,
                letterSpacing: "-0.3px",
              }}
            >
              Central Metro
            </Title>
            <Text style={{ fontSize: 12, color: "#94a3b8" }}>
              342 Certificates
            </Text>
          </Card>
        </Col>

        {/* Storage Usage */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            styles={{ body: { padding: "20px 24px" } }}
            style={{
              borderRadius: 16,
              border: "none",
              background: "#ef4444",
              height: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.7)",
                display: "block",
                marginBottom: 16,
              }}
            >
              Storage Usage
            </Text>
            <Progress
              percent={65}
              showInfo={false}
              strokeColor="#ffffff"
              railColor="rgba(255,255,255,0.25)"
              size={["100%", 6]}
              style={{ marginBottom: 8 }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                2.4 GB / 5 GB
              </Text>
              <Text style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>
                65%
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Search — sits under stats */}
      <Input
        prefix={<SearchOutlined style={{ color: "#94a3b8", fontSize: 15 }} />}
        placeholder="Search by certificate # or donor..."
        onChange={(e) => onSearch?.(e.target.value)}
        style={{
          borderRadius: 999,
          background: "#f1f3ff",
          border: "none",
          height: 44,
          paddingLeft: 4,
          fontSize: 14,
          maxWidth: 440,
        }}
      />
    </div>
  );
}
