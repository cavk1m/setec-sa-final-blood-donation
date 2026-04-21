"use client";

import React from "react";
import { Row, Col, Card, Typography, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

interface CampaignStatsBarProps {
  onSearch?: (value: string) => void;
}

export default function CampaignStatsBar({ onSearch }: CampaignStatsBarProps) {
  return (
    <div style={{ marginBottom: 32 }}>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {/* Total Active */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            bodyStyle={{ padding: "20px 24px" }}
            style={{ borderRadius: 16, border: "1px solid #e3e8f9" }}
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
              Total Active
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
                12
              </Title>
              <span
                style={{
                  background: "#ffdad7",
                  color: "#b51822",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: 4,
                }}
              >
                +2 this month
              </span>
            </div>
          </Card>
        </Col>

        {/* Total Donors */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            bodyStyle={{ padding: "20px 24px" }}
            style={{ borderRadius: 16, border: "1px solid #e3e8f9" }}
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
              Total Donors
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
                  color: "#b51822",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: 4,
                }}
              >
                84% target reached
              </span>
            </div>
          </Card>
        </Col>

        {/* Supplies Secured */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            bodyStyle={{ padding: "20px 24px" }}
            style={{ borderRadius: 16, border: "1px solid #e3e8f9" }}
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
              Supplies Secured
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
                485u
              </Title>
              <span
                style={{
                  background: "#d4e4fa",
                  color: "#39485a",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: 4,
                }}
              >
                Critical O- Neg
              </span>
            </div>
          </Card>
        </Col>

        {/* Total Raised */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            bodyStyle={{ padding: "20px 24px" }}
            style={{ borderRadius: 16, border: "1px solid #e3e8f9" }}
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
              Total Raised
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
                $42.8k
              </Title>
              <span
                style={{
                  background: "#ffdad7",
                  color: "#b51822",
                  fontSize: 10,
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: 4,
                }}
              >
                115% vs LY
              </span>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Search under stats */}
      <Input
        prefix={<SearchOutlined style={{ color: "#94a3b8", fontSize: 15 }} />}
        placeholder="Search campaigns..."
        onChange={(e) => onSearch?.(e.target.value)}
        style={{
          borderRadius: 999,
          background: "#f1f3ff",
          border: "none",
          height: 44,
          maxWidth: 380,
        }}
      />
    </div>
  );
}
