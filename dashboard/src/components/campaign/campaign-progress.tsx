'use client';

import { Card, Progress, Typography, Space } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import ActionButton from '@/src/components/ui/action-button';

const { Title, Text } = Typography;

interface Campaign {
  id: string;
  name: string;
  location: string;
  raised: number;
  goal: number;
}

const MOCK_CAMPAIGNS: Campaign[] = [
  { id: '1', name: 'City Hospital Drive',    location: 'Downtown',   raised: 3200,  goal: 5000  },
  { id: '2', name: 'University Blood Week',  location: 'North Campus', raised: 1850, goal: 3000  },
  { id: '3', name: 'Community Health Fair',  location: 'Westside',   raised: 4700,  goal: 6000  },
];

interface CampaignProgressProps {
  data?: Campaign[];
  onViewAll?: () => void;
}

export default function CampaignProgress({ data = MOCK_CAMPAIGNS, onViewAll }: CampaignProgressProps) {
  return (
    <Card style={{ borderRadius: 12, border: '1px solid #e3e8f9', height: '100%' }} styles={{ body: { padding: 24 } }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Title level={5} style={{ margin: 0, fontWeight: 700 }}>Campaign Progress</Title>
        <ActionButton
          variant="custom"
          size="sm"
          label="View all →"
          onClick={onViewAll}
          style={{
            background: 'transparent',
            border: 'none',
            height: 'auto',
            padding: 0,
            boxShadow: 'none',
            color: '#b51822',
            fontWeight: 700,
          }}
        />
      </div>

      <Space orientation="vertical" size={24} style={{ width: '100%' }}>
        {data.map((c) => {
          const pct = Math.round((c.raised / c.goal) * 100);
          return (
            <div key={c.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <Text style={{ fontWeight: 700, fontSize: 14, display: 'block' }}>{c.name}</Text>
                  <Space size={4} align="center">
                    <EnvironmentOutlined style={{ fontSize: 11, color: '#94a3b8' }} />
                    <Text style={{ fontSize: 11, color: '#94a3b8' }}>{c.location}</Text>
                  </Space>
                </div>
                <Text style={{ fontSize: 12, fontWeight: 900, whiteSpace: 'nowrap' }}>
                  ${c.raised.toLocaleString()}
                  <Text style={{ fontWeight: 400, color: '#94a3b8' }}> / {(c.goal / 1000).toFixed(0)}k</Text>
                </Text>
              </div>
              <Progress percent={pct} showInfo={false} strokeColor="#b51822" railColor="#f1f3ff" size={['100%', 6]} />
            </div>
          );
        })}
      </Space>
    </Card>
  );
}