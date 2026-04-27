'use client';

import { Card, Table, Tag, Typography, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ActionButton from '@/src/components/ui/action-button';

const { Title } = Typography;

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
          waiting: '#3b82f6',
          'in-progress': '#f59e0b',
          completed: '#22c55e',
          skipped: '#ef4444'
        };
        const color = colors[s] || '#94a3b8';
        return (
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: 8,
            background: `${color}08`, 
            padding: '4px 10px', 
            borderRadius: 99,
            width: 'fit-content'
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
            <span style={{ fontSize: 12, fontWeight: 600, color, textTransform: 'capitalize' }}>{s}</span>
          </div>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: QueueItem) =>
        record.status !== 'completed' ? (
          <Space size={12}>
            <span 
              onClick={() => onComplete?.(record.id)}
              style={{ color: '#22c55e', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}
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
          <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.2)', fontStyle: 'italic' }}>Handled by System</span>
        ),
    },
  ];

  return (
    <Card 
      style={{ 
        borderRadius: 20, 
        border: '1px solid rgba(0,0,0,0.04)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        background: '#fff'
      }} 
      styles={{ body: { padding: '24px 32px' } }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={4} style={{ margin: 0, fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em' }}>Donation Queue</Title>
        <span style={{ color: '#ef4444', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>View All Queue →</span>
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
