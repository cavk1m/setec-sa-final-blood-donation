"use client";

import { Card, Typography, Tag, Space, Popconfirm } from "antd";
import {
  EnvironmentOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const { Text, Title, Link } = Typography;

export interface LocationItem {
  id: string;
  name: string;
  address: string;
  donationType: string[]; // Support multiple
  queueCount: number;
  staffCount: number;
  hubType: "MAIN CAMPUS" | "MOBILE HUB";
  status: "OPERATIONAL" | "MAINTENANCE" | "OFFLINE";
  lastActivity: string;
  paymentQrUrl?: string | null;
}

const STATUS_CONFIG: Record<LocationItem["status"], { bg: string; color: string }> = {
  OPERATIONAL: { bg: "#16a34a", color: "#ffffff" },
  MAINTENANCE: { bg: "#f59e0b", color: "#ffffff" },
  OFFLINE: { bg: "#ef4444", color: "#ffffff" },
};

export default function LocationCard({
  data,
  onEdit,
  onDelete,
}: {
  data: LocationItem;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}) {
  const status = STATUS_CONFIG[data.status] || STATUS_CONFIG.OPERATIONAL;

  return (
    <Card
      hoverable
      style={{
        borderRadius: "var(--premium-card-radius)",
        border: "var(--premium-card-border)",
        overflow: "hidden",
        boxShadow: "var(--premium-card-shadow)",
        height: '100%',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      styles={{ body: { padding: 0 } }}
    >
      {/* Image Section */}
      <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
        <img 
          src={data.paymentQrUrl || 'https://via.placeholder.com/400x300?text=No+QR+Code'} 
          alt={data.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(0,0,0,0.5)', 
            backdropFilter: 'blur(4px)',
            padding: '4px 10px', 
            borderRadius: 99,
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: status.bg, boxShadow: `0 0 8px ${status.bg}` }} />
            <span style={{ fontSize: 10, fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {data.status}
            </span>
          </div>
          <div style={{ 
            background: 'rgba(0,0,0,0.5)', 
            backdropFilter: 'blur(4px)',
            color: '#fff', 
            padding: '4px 10px', 
            borderRadius: 99,
            fontSize: 10, fontWeight: 800,
            textTransform: 'uppercase', letterSpacing: '0.05em',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {data.hubType}
          </div>
        </div>
      </div>

      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <Title level={4} style={{ margin: 0, fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' }}>
            {data.name}
          </Title>
          <Space size={12}>
            <div 
              onClick={() => onEdit?.(data.id)}
              style={{ 
                width: 32, height: 32, borderRadius: 8, 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.03)', cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              <EditOutlined style={{ color: 'rgba(0,0,0,0.45)', fontSize: 14 }} />
            </div>
            <Popconfirm
              title="Delete location?"
              description="Are you sure you want to delete this center?"
              onConfirm={() => onDelete?.(data.id)}
              okText="Yes, Delete"
              cancelText="No"
              okButtonProps={{ danger: true }}
            >
              <div 
                style={{ 
                  width: 32, height: 32, borderRadius: 8, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(239, 68, 68, 0.05)', cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                <DeleteOutlined style={{ color: '#ef4444', fontSize: 14 }} />
              </div>
            </Popconfirm>
          </Space>
        </div>

        <Space size={6} style={{ marginBottom: 16 }}>
          <EnvironmentOutlined style={{ color: '#ef4444' }} />
          <Text style={{ color: 'rgba(0,0,0,0.45)', fontSize: 13, fontWeight: 500 }}>{data.address}</Text>
        </Space>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {data.donationType.map(type => (
            <Tag key={type} style={{ 
              borderRadius: 99, fontWeight: 700, fontSize: 11, 
              background: type === 'BLOOD' || type === 'WHOLE BLOOD' ? '#fff1f2' : 
                         type === 'MONEY' ? '#f0fdf4' : '#eff6ff',
              color: type === 'BLOOD' || type === 'WHOLE BLOOD' ? '#ef4444' : 
                     type === 'MONEY' ? '#16a34a' : '#3b82f6',
              border: 'none', padding: '2px 12px'
            }}>
              • {type === 'BLOOD' ? 'WHOLE BLOOD' : type}
            </Tag>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: '16px 0', borderTop: '1px solid rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
          <div>
            <Text style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', marginBottom: 8 }}>Current Queue</Text>
            <Space size={8}>
              <TeamOutlined style={{ color: '#f59e0b', fontSize: 18 }} />
              <Text style={{ fontWeight: 800, fontSize: 15 }}>{data.queueCount} waiting</Text>
            </Space>
          </div>
          <div>
            <Text style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', marginBottom: 8 }}>Available Staff</Text>
            <Space size={8}>
              <MedicineBoxOutlined style={{ color: '#64748b', fontSize: 18 }} />
              <Text style={{ fontWeight: 800, fontSize: 15 }}>{data.staffCount} on-site</Text>
            </Space>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
          <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.35)', fontWeight: 500 }}>
            Last activity {data.lastActivity}
          </Text>
          <Link style={{ color: '#ef4444', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
            View Dashboard <ArrowRightOutlined style={{ fontSize: 10 }} />
          </Link>
        </div>
      </div>
    </Card>
  );
}
