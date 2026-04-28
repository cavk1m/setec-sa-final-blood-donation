'use client';

import { Card, Progress, Typography } from 'antd';
import { RocketOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface Campaign {
  id: string;
  name: string;
  location: string;
  raised: number;
  goal: number;
}

const MOCK_CAMPAIGNS: Campaign[] = [
  { id: '1', name: 'City Hospital Drive',    location: 'Target: 1,500 Units',   raised: 1380,  goal: 1500  },
  { id: '2', name: 'University Blood Week',  location: 'Target: 800 Units',    raised: 512,   goal: 800   },
  { id: '3', name: 'Community Health Fair',  location: 'Target: 2,000 Units',   raised: 820,   goal: 2000  },
];

interface CampaignProgressProps {
  data?: Campaign[];
  onViewAll?: () => void;
}

export default function CampaignProgress({ data = MOCK_CAMPAIGNS }: CampaignProgressProps) {
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
        <Title level={4} style={{ margin: 0, fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>Active Campaigns</Title>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {data.map((c) => {
          const pct = Math.round((c.raised / c.goal) * 100);
          return (
            <div key={c.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <div>
                  <Text style={{ fontWeight: 700, fontSize: 14, display: 'block', color: '#161c27' }}>{c.name}</Text>
                  <Text style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', fontWeight: 600 }}>{c.location}</Text>
                </div>
                <Text style={{ fontWeight: 800, fontSize: 14, color: '#ef4444' }}>{pct}%</Text>
              </div>
              <Progress 
                percent={pct} 
                showInfo={false} 
                strokeColor="#ef4444"
                railColor="rgba(0,0,0,0.04)"
                size={['100%', 8]}
                strokeLinecap="round"
              />
            </div>
          );
        })}
      </div>

      <div style={{ 
        marginTop: 32, 
        padding: '20px', 
        background: '#f8fafc', 
        borderRadius: 16, 
        border: '1px solid rgba(0,0,0,0.02)',
        display: 'flex',
        alignItems: 'center',
        gap: 16
      }}>
        <div style={{ 
          width: 44, height: 44, 
          background: '#fff', 
          borderRadius: 12, 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <RocketOutlined style={{ fontSize: 20, color: '#ef4444' }} />
        </div>
        <div>
          <Text style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Next Drive</Text>
          <Text style={{ display: 'block', fontSize: 14, fontWeight: 800, color: '#161c27' }}>National Heroes Day</Text>
          <Text style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'rgba(0,0,0,0.35)' }}>Starts in 4 days</Text>
        </div>
      </div>
    </Card>
  );
}
