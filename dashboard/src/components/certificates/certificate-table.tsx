"use client";

import { Card, Table, Tag, Typography, Space } from "antd";
import { FilePdfOutlined, PrinterOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import ActionButton from "@/src/components/ui/action-button";
import { getCertificatePrint } from "@/src/features/certificate/certificate.api";
import { message } from "antd";
import { axiosInstance } from "@/src/lib/axios";

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

const BLOOD_LABELS: Record<string, string> = {
  A_POSITIVE: "A+",
  A_NEGATIVE: "A-",
  B_POSITIVE: "B+",
  B_NEGATIVE: "B-",
  O_POSITIVE: "O+",
  O_NEGATIVE: "O-",
  AB_POSITIVE: "AB+",
  AB_NEGATIVE: "AB-",
};

const BLOOD_TYPE_STYLE: Record<string, { bg: string; color: string }> = {
  "A+": { bg: "#fee2e2", color: "#b91c1c" },
  "A-": { bg: "#fee2e2", color: "#b91c1c" },
  "B+": { bg: "#dbeafe", color: "#1d4ed8" },
  "B-": { bg: "#dbeafe", color: "#1d4ed8" },
  "O+": { bg: "#d1fae5", color: "#047857" },
  "O-": { bg: "#d1fae5", color: "#047857" },
  "AB+": { bg: "#ede9fe", color: "#6d28d9" },
  "AB-": { bg: "#ede9fe", color: "#6d28d9" },
};

interface CertificateTableProps {
  data?: CertificateEntry[];
  loading?: boolean;
  searchQuery?: string;
}

export default function CertificateTable({
  data = [],
  loading,
  searchQuery = "",
}: CertificateTableProps) {
  const handlePrint = async (id: string) => {
    try {
      const html = await getCertificatePrint(id);
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(html);
        printWindow.document.close();
      }
    } catch (error) {
      message.error("Failed to prepare print");
    }
  };

  const handleDownload = async (id: string, certNumber: string) => {
    try {
      const response = await axiosInstance.get(
        `/api/certificates/${id}/download`,
        {
          responseType: "blob",
        },
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${certNumber}.html`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      message.success("Download started");
    } catch (error) {
      message.error("Failed to download certificate");
    }
  };

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
        const bloodLabel = BLOOD_LABELS[r.bloodType] || r.bloodType;
        const s = BLOOD_TYPE_STYLE[bloodLabel] ?? {
          bg: "#f1f5f9",
          color: "#475569",
        };
        return (
          <Space size={8} align="center">
            <Text style={{ fontWeight: 700, fontSize: 14 }}>{r.donorName}</Text>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: `${s.color}12`,
                padding: "2px 10px",
                borderRadius: 99,
                border: `1px solid ${s.color}20`,
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: s.color,
                  boxShadow: `0 0 6px ${s.color}`,
                }}
              />
              <span style={{ fontSize: 10, fontWeight: 900, color: s.color }}>
                {bloodLabel}
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
      render: (_, r) => (
        <Space size={8}>
          <ActionButton
            variant="download"
            size="sm"
            icon={<FilePdfOutlined />}
            label="Download"
            onClick={() => handleDownload(r.id, r.certificateNumber)}
          />
          <ActionButton
            variant="print"
            size="sm"
            icon={<PrinterOutlined />}
            label="Print"
            onClick={() => handlePrint(r.id)}
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
