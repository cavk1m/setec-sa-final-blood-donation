'use client';

import { Layout, Menu, Typography } from 'antd';
import {
  DashboardOutlined, UnorderedListOutlined, EnvironmentOutlined,
  SafetyCertificateOutlined, NotificationOutlined, TeamOutlined,
  SettingOutlined, PlusCircleFilled, QuestionCircleOutlined, LogoutOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import AppButton from '@/src/components/ui/app-button';

const { Sider } = Layout;
const { Text, Title } = Typography;

const navItems = [
  { key: 'overview',     icon: <DashboardOutlined />,        label: 'Overview'       , path: '/' },
  { key: 'queue',        icon: <UnorderedListOutlined />,     label: 'Donation Queue' , path: '/queue' },
  { key: 'locations',    icon: <EnvironmentOutlined />,       label: 'Locations'      , path: '/locations' },
  { key: 'certificates', icon: <SafetyCertificateOutlined />, label: 'Certificates'   , path: '/certificates' },
  { key: 'campaigns',    icon: <NotificationOutlined />,      label: 'Campaigns'      , path: '/campaigns' },
  { key: 'users',        icon: <TeamOutlined />,              label: 'Users'          , path: '/users' },
  { key: 'settings',     icon: <SettingOutlined />,           label: 'Settings'       , path: '/settings' },
];

const bottomItems = [
  { key: 'support', icon: <QuestionCircleOutlined />, label: 'Support' },
  { key: 'logout',  icon: <LogoutOutlined />,         label: 'Logout'  },
];

interface SideNavBarProps {
  activeKey?: string;
  onMenuClick?: (key: string) => void;
}

export default function SideNavBar({ activeKey = 'overview' }: SideNavBarProps) {
  const router = useRouter();

  const handleNavClick = (key: string, path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    document.cookie = 'auth_token=; path=/; max-age=0; SameSite=Lax';
    router.push('/login');
  };

  return (
    <Sider
      width={280}
      style={{
        background: '#fff',
        height: '100vh',
        position: 'fixed',
        left: 0, top: 0, bottom: 0,
        borderRight: '1px solid rgba(0,0,0,0.06)',
        zIndex: 1000,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px 16px' }}>
        {/* Logo Section */}
        <div style={{ 
          padding: '0 12px 40px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 12,
          cursor: 'pointer' 
        }} onClick={() => router.push('/')}>
          <div style={{ 
            width: 44, height: 44, 
            background: '#ef4444',
            borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
          }}>
            <span style={{ fontSize: 24 }}>🩸</span>
          </div>
          <div>
            <Title level={4} style={{ color: '#ef4444', margin: 0, fontWeight: 800, fontSize: 20, letterSpacing: '-0.03em' }}>
              BloodConnect
            </Title>
            <Text style={{ color: 'rgba(0,0,0,0.45)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Admin Console
            </Text>
          </div>
        </div>

        {/* Navigation Items */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map((item) => {
            const isActive = activeKey === item.key;
            return (
              <div
                key={item.key}
                onClick={() => handleNavClick(item.key, item.path)}
                className={`nav-item ${isActive ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 16px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: isActive ? 'rgba(239, 68, 68, 0.04)' : 'transparent',
                  color: isActive ? '#ef4444' : 'rgba(0,0,0,0.65)',
                  position: 'relative',
                }}
              >
                <span style={{ 
                  fontSize: 20, 
                  color: isActive ? '#ef4444' : 'rgba(0,0,0,0.45)',
                  transition: 'color 0.2s ease'
                }}>
                  {item.icon}
                </span>
                <span style={{ 
                  fontSize: 15, 
                  fontWeight: isActive ? 700 : 600,
                  transition: 'color 0.2s ease'
                }}>
                  {item.label}
                </span>
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    right: -16,
                    width: 4,
                    height: 32,
                    background: '#ef4444',
                    borderRadius: '4px 0 0 4px'
                  }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 24 }}>
          <div 
            onClick={() => router.push('/campaigns')}
            style={{
              padding: '16px',
              background: '#ef4444',
              borderRadius: 12,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)'
            }}
            className="new-campaign-btn"
          >
            <PlusCircleFilled style={{ color: '#fff', fontSize: 18 }} />
            <Text style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>New Campaign</Text>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div
              onClick={handleLogout}
              className="nav-item logout"
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s ease',
                color: 'rgba(0,0,0,0.45)'
              }}
            >
              <LogoutOutlined style={{ fontSize: 20 }} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>Logout</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .nav-item:hover {
          background: rgba(0,0,0,0.02) !important;
          color: #ef4444 !important;
        }
        .nav-item.active:hover {
          background: rgba(239, 68, 68, 0.06) !important;
        }
        .new-campaign-btn:hover {
          background: #dc2626 !important;
          transform: translateY(-2px);
        }
      `}</style>
    </Sider>
  );
}
