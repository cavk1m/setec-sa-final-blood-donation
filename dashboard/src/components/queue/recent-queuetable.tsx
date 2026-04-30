'use client';

import { Card, Table, Tag, Typography, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ActionButton from '@/src/components/ui/action-button';

const { Title, Text } = Typography;

interface QueueItem {
  id: string;
  donor: string;
  bloodType: string;
  status: string;
  time: string;
}

interface RecentQueueTableProps {
  data?: QueueItem[];
  onComplete?: (id: string) => void;
  onSkip?: (id: string) => void;
}

const STATUS_COLOR: Record<string, string> = {
  waiting:      'blue',
  'in-progress': 'orange',
  completed:    'green',
  skipped:      'red',
};

export default function RecentQueueTable({ data = [], onComplete, onSkip }: RecentQueueTableProps) {
  const columns: ColumnsType<QueueItem> = [
    {
      title: 'Donor',
      dataIndex: 'donor',
      key: 'donor',
      render: (name: string) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ 
            width: 32, height: 32, 
            background: 'rgba(0,0,0,0.03)', 
            borderRadius: 8, 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: 'rgba(0,0,0,0.4)'
          }}>
            {name.charAt(0)}
          </div>
          <span style={{ fontWeight: 600, color: '#161c27' }}>{name}</span>
        </div>
      ),
    },
    {
      title: 'Blood Type',
      dataIndex: 'bloodType',
      key: 'bloodType',
      render: (bt: string) => (
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.05)', 
          color: '#ef4444', 
          fontWeight: 800, 
          padding: '2px 8px', 
          borderRadius: 6,
          display: 'inline-block',
          fontSize: 12
        }}>
          {bt}
        </div>
      ),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (t: string) => <span style={{ color: 'rgba(0,0,0,0.45)', fontSize: 13, fontWeight: 500 }}>{t}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => {
        const colors: Record<string, string> = {
          'waiting': '#f59e0b',
          'in-progress': '#3b82f6',
          'completed': '#16a34a',
        };
        const color = colors[s] || '#94a3b8';
        return (
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: 8,
            background: `${color}12`, 
            padding: '4px 14px', 
            borderRadius: 99,
            width: 'fit-content',
            border: `1.5px solid ${color}20`
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}` }} />
            <span style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
              {s === 'in-progress' ? 'In-Progress' : s}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: QueueItem) =>
        record.status !== 'completed' ? (
          <Space size={16}>
            <span 
              onClick={() => onComplete?.(record.id)}
              style={{ color: '#16a34a', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}
            >
              Complete
            </span>
            <span 
              onClick={() => onSkip?.(record.id)}
              style={{ color: 'rgba(0,0,0,0.3)', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}
            >
              Skip
            </span>
          </Space>
        ) : (
          <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.3)', fontWeight: 600, fontStyle: 'italic' }}>Handled by Nurse A.</span>
        ),
    },
  ];

  return (
    <Card 
      style={{ 
        borderRadius: "var(--premium-card-radius)", 
        border: "var(--premium-card-border)",
        boxShadow: "var(--premium-card-shadow)",
        background: '#fff',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }} 
      styles={{ body: { padding: '24px 32px' } }}
      hoverable
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <Title level={4} style={{ margin: 0, fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>Donation Queue</Title>
          <Text style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)', fontWeight: 500 }}>Currently active donor registrations at Central Hub</Text>
        </div>
        <span style={{ color: '#ef4444', fontWeight: 800, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
          View All Queue <span style={{ fontSize: 16 }}>→</span>
        </span>
      </div>
      <Table<QueueItem>
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        size="middle"
        style={{ fontSize: 14 }}
      />
    </Card>
  );
}
