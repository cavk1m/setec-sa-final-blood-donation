"use client";

import { Card, Typography, Tag, Space } from "antd";
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
  imageUrl: string;
}

export default function LocationCard({
  data,
  onEdit,
  onDelete,
}: {
  data: LocationItem;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}) {
  return (
    <Card
      hoverable
      style={{
        borderRadius: 20,
        border: "1px solid rgba(0,0,0,0.06)",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        height: '100%'
      }}
      styles={{ body: { padding: 0 } }}
    >
      {/* Image Section */}
      <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
        <img 
          src={data.imageUrl} 
          alt={data.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
          <Tag style={{ 
            background: '#16a34a', color: '#fff', border: 'none', 
            borderRadius: 6, fontWeight: 800, fontSize: 10, margin: 0 
          }}>
            {data.status}
          </Tag>
          <Tag style={{ 
            background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none', 
            borderRadius: 6, fontWeight: 800, fontSize: 10, margin: 0,
            backdropFilter: 'blur(4px)'
          }}>
            {data.hubType}
          </Tag>
        </div>
      </div>

      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <Title level={4} style={{ margin: 0, fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em' }}>
            {data.name}
          </Title>
          <Space size={12}>
            <EditOutlined onClick={() => onEdit?.(data.id)} style={{ color: 'rgba(0,0,0,0.45)', cursor: 'pointer', fontSize: 16 }} />
            <DeleteOutlined onClick={() => onDelete?.(data.id)} style={{ color: 'rgba(0,0,0,0.45)', cursor: 'pointer', fontSize: 16 }} />
          </Space>
        </div>

        <Space size={6} style={{ marginBottom: 16 }}>
          <EnvironmentOutlined style={{ color: '#ef4444' }} />
          <Text style={{ color: 'rgba(0,0,0,0.45)', fontSize: 13, fontWeight: 500 }}>{data.address}</Text>
        </Space>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {data.donationType.map(type => (
            <Tag key={type} style={{ 
              borderRadius: 99, fontWeight: 700, fontSize: 11, 
              background: type === 'WHOLE BLOOD' ? '#fff1f2' : '#eff6ff',
              color: type === 'WHOLE BLOOD' ? '#ef4444' : '#3b82f6',
              border: 'none', padding: '2px 12px'
            }}>
              • {type}
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
