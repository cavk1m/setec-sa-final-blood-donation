"use client";

import { Card, Table, Tag, Typography, Space } from "antd";
import { FilePdfOutlined, PrinterOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import ActionButton from "@/src/components/ui/action-button";

const { Text, Title } = Typography;

export interface CertificateEntry {
  id: string;
  certificateNumber: string;
  donorName: string;
  bloodType: string;
  donationDate: string;
  locationName: string;
  issuedDate: string;
}

const MOCK_CERTIFICATES: CertificateEntry[] = [
  {
    id: "1",
    certificateNumber: "CERT-2023-00891",
    donorName: "Elena Rodriguez",
    bloodType: "O+",
    donationDate: "Oct 14, 2023",
    locationName: "St. Jude Medical",
    issuedDate: "Oct 14, 2023",
  },
  {
    id: "2",
    certificateNumber: "CERT-2023-00892",
    donorName: "Marcus Chen",
    bloodType: "AB-",
    donationDate: "Oct 15, 2023",
    locationName: "Downtown Plaza Center",
    issuedDate: "Oct 15, 2023",
  },
  {
    id: "3",
    certificateNumber: "CERT-2023-00893",
    donorName: "Sarah Jenkins",
    bloodType: "A+",
    donationDate: "Oct 15, 2023",
    locationName: "Westside Mobile Bus",
    issuedDate: "Oct 16, 2023",
  },
  {
    id: "4",
    certificateNumber: "CERT-2023-00894",
    donorName: "David Park",
    bloodType: "B+",
    donationDate: "Oct 16, 2023",
    locationName: "Central Metro Hub",
    issuedDate: "Oct 16, 2023",
  },
  {
    id: "5",
    certificateNumber: "CERT-2023-00895",
    donorName: "Mia Thompson",
    bloodType: "O-",
    donationDate: "Oct 17, 2023",
    locationName: "St. Jude Medical",
    issuedDate: "Oct 17, 2023",
  },
];

const BLOOD_TYPE_STYLE: Record<string, { bg: string; color: string }> = {
  "O+": { bg: "#d1fae5", color: "#047857" },
  "O-": { bg: "#d1fae5", color: "#047857" },
  "A+": { bg: "#fee2e2", color: "#b91c1c" },
  "A-": { bg: "#fee2e2", color: "#b91c1c" },
  "B+": { bg: "#dbeafe", color: "#1d4ed8" },
  "B-": { bg: "#dbeafe", color: "#1d4ed8" },
  "AB+": { bg: "#ede9fe", color: "#6d28d9" },
  "AB-": { bg: "#ede9fe", color: "#6d28d9" },
};

interface CertificateTableProps {
  data?: CertificateEntry[];
  loading?: boolean;
  searchQuery?: string;
}

export default function CertificateTable({
  data = MOCK_CERTIFICATES,
  loading,
  searchQuery = "",
}: CertificateTableProps) {
  const filtered = data.filter(
    (r) =>
      r.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.donorName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const columns: ColumnsType<CertificateEntry> = [
    {
      title: "Certificate #",
      dataIndex: "certificateNumber",
      key: "certificateNumber",
      render: (val) => (
        <Text
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            fontWeight: 700,
            color: "#161c27",
            opacity: 0.8,
          }}
        >
          {val}
        </Text>
      ),
    },
    {
      title: "Donor Name",
      key: "donorName",
      render: (_, r) => {
        const s = BLOOD_TYPE_STYLE[r.bloodType] ?? {
          bg: "#f1f5f9",
          color: "#475569",
        };
        return (
          <Space size={8} align="center">
            <Text style={{ fontWeight: 700, fontSize: 14 }}>{r.donorName}</Text>
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: `${s.color}12`, 
                padding: '2px 10px', 
                borderRadius: 99,
                border: `1px solid ${s.color}20`
              }}
            >
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
              <span style={{ fontSize: 10, fontWeight: 900, color: s.color }}>
                {r.bloodType}
              </span>
            </div>
          </Space>
        );
      },
    },
    {
      title: "Donation Date",
      dataIndex: "donationDate",
      key: "donationDate",
      render: (val) => (
        <Text style={{ fontSize: 13, color: "#64748b" }}>{val}</Text>
      ),
    },
    {
      title: "Location Name",
      dataIndex: "locationName",
      key: "locationName",
      render: (val) => (
        <Text style={{ fontSize: 13, fontWeight: 500 }}>{val}</Text>
      ),
    },
    {
      title: "Issued Date",
      dataIndex: "issuedDate",
      key: "issuedDate",
      render: (val) => (
        <Text style={{ fontSize: 13, color: "#64748b" }}>{val}</Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "right",
      render: () => (
        <Space size={8}>
          <ActionButton
            variant="download"
            size="sm"
            icon={<FilePdfOutlined />}
            label="Download PDF"
          />
          <ActionButton
            variant="print"
            size="sm"
            icon={<PrinterOutlined />}
            label="Print"
          />
        </Space>
      ),
    },
  ];

  return (
    <Card
      style={{
        borderRadius: "var(--premium-card-radius)",
        border: "var(--premium-card-border)",
        boxShadow: "var(--premium-card-shadow)",
        overflow: "hidden",
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      styles={{ body: { padding: 0 } }}
    >
      {/* Card header */}
      <div
        style={{
          padding: "24px 32px",
          borderBottom: "1px solid rgba(15, 23, 42, 0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(241,243,255,0.4)",
        }}
      >
        <Title level={4} style={{ margin: 0, fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>Recent Issuances</Title>
        <Space size={8}>
          <ActionButton
            variant="download"
            size="sm"
            label="Filter"
            style={{ borderRadius: 8 }}
          />
          <ActionButton
            variant="download"
            size="sm"
            label="Sort by Date"
            style={{ borderRadius: 8 }}
          />
        </Space>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filtered}
        rowKey="id"
        loading={loading}
        size="middle"
        pagination={{
          pageSize: 10,
          showTotal: (total, range) => (
            <Text style={{ fontSize: 12, color: "#64748b" }}>
              Showing {range[0]} to {range[1]} of {total} entries
            </Text>
          ),
          itemRender: (_page, type, el) => {
            if (type === "prev")
              return (
                <ActionButton
                  variant="download"
                  size="sm"
                  label="‹"
                  style={{ borderRadius: 8 }}
                />
              );
            if (type === "next")
              return (
                <ActionButton
                  variant="download"
                  size="sm"
                  label="›"
                  style={{ borderRadius: 8 }}
                />
              );
            return el;
          },
        }}
      />
    </Card>
  );
}
