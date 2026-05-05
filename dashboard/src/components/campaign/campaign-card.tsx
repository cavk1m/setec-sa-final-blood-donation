'use client';

import { Card, Typography, Progress, Space } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import CircleButton from '@/src/components/ui/circle-button';

const { Text, Title } = Typography;

export interface CampaignItem {
  id: string;
  name: string;
  description: string;
  raised: number;
  goal: number;
  donorCount: number;
  createdAt: string;
  status: 'active' | 'completed';
  image_url?: string;
  campaign_type?: string;
}

interface CampaignCardProps {
  data: CampaignItem;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function CampaignCard({ data, onEdit, onView, onDelete }: CampaignCardProps) {
  const pct = Math.min(Math.round((data.raised / data.goal) * 100), 100);
  const isCompleted = data.status === 'completed';

  return (
    <Card
      style={{
        borderRadius: 20,
        border: '1px solid #e3e8f9',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        overflow: 'hidden',
        opacity: isCompleted ? 0.85 : 1,
        transition: 'box-shadow 0.2s, transform 0.2s',
      }}
      hoverable
    >
      {/* Banner Image */}
      <div style={{ 
        height: 160, 
        margin: '-28px -28px 24px', 
        overflow: 'hidden',
        background: '#f1f3ff',
        position: 'relative'
      }}>
        {data.image_url ? (
          <img 
            src={data.image_url} 
            alt={data.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1615461066841-6116ecaaba30?auto=format&fit=crop&q=80&w=800'; // Fallback
            }}
          />
        ) : (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: 40
          }}>
            ❤️
          </div>
        )}
        <div style={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: 'rgba(255,255,255,0.9)',
          padding: '4px 10px',
          borderRadius: 8,
          fontSize: 10,
          fontWeight: 800,
          textTransform: 'uppercase',
          color: '#ef4444'
        }}>
          {data.campaign_type || 'Blood Drive'}
        </div>
      </div>

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ maxWidth: '75%' }}>
          <Title level={5} style={{ margin: '0 0 6px', fontWeight: 800, fontSize: 17, lineHeight: 1.3 }}>
            {data.name}
          </Title>
          <Text style={{ fontSize: 13, color: '#64748b', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {data.description}
          </Text>
        </div>
        <span style={{
          background: isCompleted ? '#d4e4fa' : pct >= 80 ? '#ffdad7' : '#f1f3ff',
          color: isCompleted ? '#39485a' : pct >= 80 ? '#ef4444' : '#5d5c74',
          fontSize: 12,
          fontWeight: 900,
          padding: '4px 12px',
          borderRadius: 999,
          flexShrink: 0,
        }}>
          {pct}%
        </span>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8' }}>
            {isCompleted ? 'Status' : 'Progress'}
          </Text>
          {isCompleted ? (
            <Text style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#4f5d70' }}>
              Completed
            </Text>
          ) : (
            <Text style={{ fontSize: 12, fontWeight: 700 }}>
              ${data.raised.toLocaleString()} raised of ${data.goal.toLocaleString()} goal
            </Text>
          )}
        </div>
        <Progress
          percent={pct}
          showInfo={false}
          strokeColor={isCompleted ? '#677689' : '#ef4444'}
          railColor="#f1f3ff"
          size={['100%', 8]}
          style={{ margin: 0 }}
        />
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, borderTop: '1px solid #f1f3ff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Text style={{ fontSize: 13, fontWeight: 700, color: '#475569' }}>
            💰 {data.donorCount} donors contributed
          </Text>
          <Text style={{ fontSize: 11, color: '#94a3b8' }}>
            {isCompleted ? `Ended ${data.createdAt}` : `Created ${data.createdAt}`}
          </Text>
        </div>
        <Space size={4}>
          <CircleButton
            variant="ghost"
            size="sm"
            tooltip="Edit"
            icon={<EditOutlined style={{ color: '#64748b' }} />}
            onClick={() => onEdit?.(data.id)}
          />
          <CircleButton
            variant="ghost"
            size="sm"
            tooltip="View"
            icon={<EyeOutlined style={{ color: '#64748b' }} />}
            onClick={() => onView?.(data.id)}
          />
          <CircleButton
            variant="ghost"
            size="sm"
            tooltip="Delete"
            icon={<DeleteOutlined style={{ color: '#ef4444' }} />}
            onClick={() => onDelete?.(data.id)}
          />
        </Space>
      </div>
    </Card>
  );
}
