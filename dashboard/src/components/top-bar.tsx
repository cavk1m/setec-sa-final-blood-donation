'use client';

import { useState, useEffect } from 'react';
import { Layout, Input, Badge, Avatar, Typography, Divider, Space, Dropdown, Menu, Modal } from 'antd';
import { 
  SearchOutlined, 
  BellOutlined, 
  QuestionCircleOutlined, 
  LogoutOutlined, 
  LockOutlined,
  UserOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import CircleButton from '@/src/components/ui/circle-button';
import { getProfile, UserProfile } from '@/src/features/auth/profile.api';
import SecurityProtocol from '@/src/components/settings/security-protocol';

const { Header } = Layout;
const { Text } = Typography;

interface TopAppBarProps {
  userName?: string;
  userEmail?: string;
  userRole?: string;
}

export default function TopAppBar({
  userName: initialName = 'Admin User',
  userEmail: initialEmail = 'admin@bloodconnect.org',
  userRole = 'SUPER ADMIN',
}: TopAppBarProps) {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err) {
        console.error('Failed to load user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleLogout = () => {
    Modal.confirm({
      title: 'Sign Out',
      icon: <ExclamationCircleOutlined style={{ color: '#ef4444' }} />,
      content: 'Are you sure you want to sign out of the administrator console?',
      okText: 'Sign Out',
      cancelText: 'Stay',
      okButtonProps: { 
        danger: true, 
        style: { borderRadius: 10, fontWeight: 700, textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.05em' } 
      },
      cancelButtonProps: { 
        style: { borderRadius: 10, fontWeight: 700, textTransform: 'uppercase', fontSize: 12, letterSpacing: '0.05em' } 
      },
      onOk() {
        document.cookie = 'auth_token=; path=/; max-age=0; SameSite=Lax';
        router.push('/login');
      },
    });
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: 'My Profile',
      icon: <UserOutlined />,
      onClick: () => router.push('/settings?tab=profile')
    },
    {
      key: 'password',
      label: 'Change Password',
      icon: <LockOutlined />,
      onClick: () => setIsPasswordModalOpen(true)
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout
    },
  ];

  const displayName = profile?.full_name
  const displayEmail = profile ? profile.email : initialEmail;

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
        
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']} arrow>
          <Space size={12} align="center" style={{ cursor: 'pointer', padding: '4px 8px', borderRadius: 12 }} className="profile-trigger">
            <div style={{ textAlign: 'right', lineHeight: 1 }}>
              <Text style={{ fontWeight: 700, fontSize: 14, display: 'block', color: '#0f172a', marginBottom: 2 }}>{displayName}</Text>
              <Text style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', fontWeight: 500, display: 'block' }}>{displayEmail}</Text>
            </div>
            <Avatar 
              size={42} 
              src={profile?.avatar_url ? `http://localhost:8081${profile.avatar_url}` : "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
              style={{ 
                background: '#f1f5f9', 
                border: '2px solid #fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }} 
            />
          </Space>
        </Dropdown>
      </Space>

      {/* Global Reset Password Modal */}
      <Modal
        title="Reset Password"
        open={isPasswordModalOpen}
        onCancel={() => setIsPasswordModalOpen(false)}
        footer={null}
        width={600}
        styles={{ body: { padding: 0 } }}
        centered
      >
        <SecurityProtocol onSaveSuccess={() => setIsPasswordModalOpen(false)} />
      </Modal>
              
      <style>{`
        .header-search:hover, .header-search:focus {
          background: #fff !important;
          border-color: rgba(239, 68, 68, 0.2) !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
        }
        .profile-trigger:hover {
          background: rgba(0,0,0,0.03) !important;
        }
      `}</style>
    </Header>
  );
}
