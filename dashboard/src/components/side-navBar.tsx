'use client';

import { Layout, Menu, Typography, Modal } from 'antd';
import {
  DashboardOutlined, UnorderedListOutlined, EnvironmentOutlined,
  SafetyCertificateOutlined, NotificationOutlined, TeamOutlined,
  SettingOutlined, PlusCircleFilled, QuestionCircleOutlined, LogoutOutlined,
  ExclamationCircleOutlined,
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
    Modal.confirm({
      title: 'Sign Out',
      icon: <ExclamationCircleOutlined style={{ color: '#ef4444' }} />,
      content: 'Are you sure you want to sign out of BloodConnect?',
      okText: 'Sign Out',
      cancelText: 'Stay',
      okButtonProps: { 
        danger: true, 
        style: { borderRadius: 8, fontWeight: 600 } 
      },
      cancelButtonProps: { 
        style: { borderRadius: 8, fontWeight: 600 } 
      },
      onOk() {
        document.cookie = 'auth_token=; path=/; max-age=0; SameSite=Lax';
        router.push('/login');
      },
    });
  };

  return (
    <Sider
      width={280}
      style={{
        background: '#0f172a',
        height: '100vh',
        position: 'fixed',
        left: 0, top: 0, bottom: 0,
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
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
          }}>
            <span style={{ fontSize: 24 }}>🩸</span>
          </div>
          <div>
            <Title level={4} style={{ color: '#fff', margin: 0, fontWeight: 800, fontSize: 20, letterSpacing: '-0.03em' }}>
              BloodConnect
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Admin Console
            </Text>
          </div>
        </div>

        {/* Navigation Items */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
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
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: isActive ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                  position: 'relative',
                }}
              >
                <span style={{ 
                  fontSize: 20, 
                  color: isActive ? '#ef4444' : 'rgba(255,255,255,0.3)',
                  transition: 'all 0.25s ease'
                }}>
                  {item.icon}
                </span>
                <span style={{ 
                  fontSize: 15, 
                  fontWeight: isActive ? 700 : 500,
                  transition: 'all 0.25s ease'
                }}>
                  {item.label}
                </span>
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    left: -16,
                    width: 4,
                    height: 24,
                    background: '#ef4444',
                    borderRadius: '0 4px 4px 0',
                    boxShadow: '0 0 12px rgba(239, 68, 68, 0.5)'
                  }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}>
          <div 
            onClick={() => router.push('/campaigns')}
            style={{
              padding: '16px',
              background: '#ef4444',
              borderRadius: 14,
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
            }}
            className="new-campaign-btn"
          >
            <PlusCircleFilled style={{ color: '#fff', fontSize: 18 }} />
            <Text style={{ color: '#fff', fontWeight: 800, fontSize: 14, letterSpacing: '0.02em' }}>New Campaign</Text>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div
              onClick={handleLogout}
              className="nav-item logout"
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                borderRadius: 10, cursor: 'pointer', transition: 'all 0.2s ease',
                color: 'rgba(255,255,255,0.4)'
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
          background: rgba(255,255,255,0.03) !important;
          color: #fff !important;
        }
        .nav-item:hover span {
          color: #ef4444 !important;
        }
        .nav-item.active:hover {
          background: rgba(239, 68, 68, 0.15) !important;
        }
        .new-campaign-btn:hover {
          background: #dc2626 !important;
          transform: translateY(-2px);
          boxShadow: 0 6px 20px rgba(239, 68, 68, 0.4);
        }
        .logout:hover {
          background: rgba(239, 68, 68, 0.08) !important;
          color: #ef4444 !important;
        }
      `}</style>
    </Sider>
  );
}
