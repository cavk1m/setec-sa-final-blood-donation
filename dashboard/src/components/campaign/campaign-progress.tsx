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
    <Card 
      style={{ 
        borderRadius: 20, 
        border: '1px solid rgba(0,0,0,0.04)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        background: '#fff',
        height: '100%'
      }} 
      styles={{ body: { padding: 32 } }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <Title level={4} style={{ margin: 0, fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em' }}>Campaign Progress</Title>
          <Text style={{ color: 'rgba(0,0,0,0.45)', fontSize: 14 }}>Real-time event tracking.</Text>
        </div>
        <ActionButton
          variant="custom"
          size="sm"
          label="View all"
          onClick={onViewAll}
          style={{
            background: 'rgba(239, 68, 68, 0.05)',
            border: 'none',
            height: 32,
            padding: '0 12px',
            borderRadius: 8,
            boxShadow: 'none',
            color: '#ef4444',
            fontWeight: 600,
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {data.map((c) => {
          const pct = Math.round((c.raised / c.goal) * 100);
          return (
            <div key={c.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <Text style={{ fontWeight: 600, fontSize: 15, display: 'block', color: '#161c27' }}>{c.name}</Text>
                  <Space size={4} align="center">
                    <EnvironmentOutlined style={{ fontSize: 11, color: 'rgba(0,0,0,0.3)' }} />
                    <Text style={{ fontSize: 11, color: 'rgba(0,0,0,0.3)', fontWeight: 500 }}>{c.location}</Text>
                  </Space>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Text style={{ display: 'block', fontWeight: 800, fontSize: 16, color: '#ef4444' }}>{pct}%</Text>
                  <Text style={{ fontSize: 10, fontWeight: 700, color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase' }}>Reached</Text>
                </div>
              </div>
              <Progress 
                percent={pct} 
                showInfo={false} 
                strokeColor={{
                  '0%': '#ef4444',
                  '100%': '#f43f5e',
                }}
                railColor="rgba(0,0,0,0.03)"
                size={['100%', 8]}
                strokeLinecap="round"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <Text style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', fontWeight: 500 }}>
                  Goal: {(c.goal / 1000).toFixed(0)}k Units
                </Text>
                <Text style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', fontWeight: 500 }}>
                  Collected: {c.raised.toLocaleString()}
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
