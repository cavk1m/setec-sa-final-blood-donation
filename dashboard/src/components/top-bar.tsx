'use client';

import { Layout, Input, Badge, Avatar, Typography, Divider, Space } from 'antd';
import { SearchOutlined, BellOutlined, AppstoreOutlined } from '@ant-design/icons';
import CircleButton from '@/src/components/ui/circle-button';

const { Header } = Layout;
const { Text } = Typography;

interface TopAppBarProps {
  userName?: string;
  userRole?: string;
}

export default function TopAppBar({
  userName = 'Dr. Sarah Chen',
  userRole = 'Administrator',
}: TopAppBarProps) {
  return (
    <Header style={{
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #e3e8f9',
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      height: 64,
    }}>
      <Input
        prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
        placeholder="Search donors, campaigns, or locations..."
        style={{ maxWidth: 420, borderRadius: 999, background: '#f1f3ff', border: 'none', height: 40 }}
      />

      <Space size={8} align="center">
        <CircleButton
          icon={<BellOutlined style={{ fontSize: 18, color: '#475569' }} />}
          variant="ghost"
          badge
          badgeColor="#b51822"
          size="md"
        />
        <CircleButton
          icon={<AppstoreOutlined style={{ fontSize: 18, color: '#475569' }} />}
          variant="ghost"
          size="md"
        />
        <Divider vertical style={{ height: 28, margin: '0 8px' }} />
        <Space size={12} align="center">
          <div style={{ textAlign: 'right' }}>
            <Text style={{ fontWeight: 700, fontSize: 14, display: 'block', lineHeight: 1.3 }}>{userName}</Text>
            <Text style={{ fontSize: 10, color: '#5d5c74', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{userRole}</Text>
          </div>
          <Avatar size={40} style={{ background: '#b51822', cursor: 'pointer' }}>
            {userName.charAt(0)}
          </Avatar>
        </Space>
      </Space>
    </Header>
  );
}