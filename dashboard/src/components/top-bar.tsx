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
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
      padding: '0 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      height: 72,
      width: '100%',
      boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
    }}>
      <div style={{ flex: 1, maxWidth: 440, marginRight: 24 }}>
        <Input
          prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,0.3)', fontSize: 18 }} />}
          placeholder="Search for anything..."
          style={{ 
            borderRadius: 14, 
            background: '#f1f5f9', 
            border: '1px solid transparent', 
            height: 44,
            fontSize: 14,
            fontWeight: 500,
            transition: 'all 0.3s ease',
          }}
          className="header-search"
        />
      </div>

      <Space size={20} align="center">
        <Space size={8}>
          <CircleButton
            icon={<BellOutlined style={{ fontSize: 18, color: 'rgba(0,0,0,0.45)' }} />}
            variant="ghost"
            badge
            badgeColor="#ef4444"
            size="md"
          />
          <CircleButton
            icon={<QuestionCircleOutlined style={{ fontSize: 18, color: 'rgba(0,0,0,0.45)' }} />}
            variant="ghost"
            size="md"
          />
        </Space>
        
        <Divider vertical style={{ height: 24, borderColor: 'rgba(0,0,0,0.1)' }} />
        
        <Space size={12} align="center" style={{ cursor: 'pointer' }}>
          <div style={{ textAlign: 'right', lineHeight: 1 }}>
            <Text style={{ fontWeight: 700, fontSize: 14, display: 'block', color: '#0f172a', marginBottom: 2 }}>{userName}</Text>
            <Text style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{userRole}</Text>
          </div>
          <Avatar 
            size={40} 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            style={{ 
              background: '#f1f5f9', 
              border: '2px solid #fff',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }} 
          />
        </Space>
      </Space>

      <style>{`
        .header-search:hover, .header-search:focus {
          background: #fff !important;
          border-color: rgba(239, 68, 68, 0.2) !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
        }
      `}</style>
    </Header>
  );
}
