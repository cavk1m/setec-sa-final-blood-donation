'use client';

import { Layout, Input, Badge, Avatar, Typography, Divider, Space } from 'antd';
import { SearchOutlined, BellOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import CircleButton from '@/src/components/ui/circle-button';

const { Header } = Layout;
const { Text } = Typography;

interface TopAppBarProps {
  userName?: string;
  userRole?: string;
}

export default function TopAppBar({
  userName = 'Admin User',
  userRole = 'SUPER ADMIN',
}: TopAppBarProps) {
  return (
    <Header style={{
      background: 'rgba(255,255,255,0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      padding: '0 48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      height: 80,
    }}>
      <div style={{ position: 'relative', width: 400 }}>
        <Input
          prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,0.25)', fontSize: 18 }} />}
          placeholder="Search donors, reports, or data..."
          style={{ 
            borderRadius: 12, 
            background: '#f1f5f9', 
            border: 'none', 
            height: 48,
            paddingLeft: 16,
            fontSize: 14,
            fontWeight: 500
          }}
        />
      </div>

      <Space size={24} align="center">
        <Space size={16}>
          <CircleButton
            icon={<BellOutlined style={{ fontSize: 20, color: 'rgba(0,0,0,0.45)' }} />}
            variant="ghost"
            badge
            badgeColor="#ef4444"
            size="md"
          />
          <CircleButton
            icon={<QuestionCircleOutlined style={{ fontSize: 20, color: 'rgba(0,0,0,0.45)' }} />}
            variant="ghost"
            size="md"
          />
        </Space>
        
        <Divider vertical style={{ height: 32, borderColor: 'rgba(0,0,0,0.06)' }} />
        
        <Space size={12} align="center">
          <div style={{ textAlign: 'right' }}>
            <Text style={{ fontWeight: 700, fontSize: 15, display: 'block', color: '#0f172a', lineHeight: 1.2 }}>{userName}</Text>
            <Text style={{ fontSize: 11, color: 'rgba(0,0,0,0.45)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{userRole}</Text>
          </div>
          <Avatar 
            size={44} 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            style={{ 
              background: '#f1f5f9', 
              cursor: 'pointer',
              border: '2px solid #fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
            }} 
          />
        </Space>
      </Space>
    </Header>
  );
}
