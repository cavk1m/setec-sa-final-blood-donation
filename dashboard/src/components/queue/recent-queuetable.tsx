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
      render: (name: string) => <span style={{ fontWeight: 600 }}>{name}</span>,
    },
    {
      title: 'Blood Type',
      dataIndex: 'bloodType',
      key: 'bloodType',
      render: (bt: string) => (
        <Tag color="#b51822" style={{ fontWeight: 700, borderRadius: 6 }}>{bt}</Tag>
      ),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (t: string) => <span style={{ color: '#5d5c74', fontSize: 13 }}>{t}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => (
        <Tag color={STATUS_COLOR[s] ?? 'default'} style={{ borderRadius: 6, textTransform: 'capitalize' }}>
          {s}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: QueueItem) =>
        record.status !== 'completed' ? (
          <Space size={8}>
            <ActionButton
              variant="custom"
              size="sm"
              label="Complete"
              onClick={() => onComplete?.(record.id)}
              style={{
                background: '#b51822',
                border: '1px solid #b51822',
                color: '#ffffff',
                borderRadius: 6,
              }}
            />
            <ActionButton
              variant="delete"
              size="sm"
              label="Skip"
              onClick={() => onSkip?.(record.id)}
              style={{ borderRadius: 6 }}
            />
          </Space>
        ) : null,
    },
  ];

  return (
    <Card style={{ borderRadius: 12, border: '1px solid #e3e8f9' }} styles={{ body: { padding: 24 } }}>
      <Title level={5} style={{ margin: '0 0 16px', fontWeight: 700 }}>Donation Queue</Title>
      <Table<QueueItem>
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
        size="small"
        style={{ fontSize: 13 }}
      />
    </Card>
  );
}
