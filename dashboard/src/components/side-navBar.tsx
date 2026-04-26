'use client';

import { Layout, Menu, Typography } from 'antd';
import {
  DashboardOutlined, UnorderedListOutlined, EnvironmentOutlined,
  SafetyCertificateOutlined, NotificationOutlined, TeamOutlined,
  SettingOutlined, PlusCircleFilled, QuestionCircleOutlined, LogoutOutlined,
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import AppButton from '@/src/components/ui/app-button';

const { Sider } = Layout;
const { Text } = Typography;

const navItems = [
  { key: '',     icon: <DashboardOutlined />,        label: 'Overview'       },
  { key: 'queue',        icon: <UnorderedListOutlined />,     label: 'Donation Queue' },
  { key: 'locations',    icon: <EnvironmentOutlined />,       label: 'Locations'      },
  { key: 'certificates', icon: <SafetyCertificateOutlined />, label: 'Certificates'   },
  { key: 'campaigns',    icon: <NotificationOutlined />,      label: 'Campaigns'      },
  { key: 'users',        icon: <TeamOutlined />,              label: 'Users'          },
  { key: 'settings',     icon: <SettingOutlined />,           label: 'Settings'       },
];

const bottomItems = [
  { key: 'support', icon: <QuestionCircleOutlined />, label: 'Support' },
  { key: 'logout',  icon: <LogoutOutlined />,         label: 'Logout'  },
];

export default function SideNavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const activeKey = pathname.split('/')[1] || 'overview';

  return (
    <Sider
      width={260}
      style={{
        background: '#1a1a2e',
        height: '100vh',
        position: 'fixed',
        left: 0, top: 0, bottom: 0,
      }}
    >
      {/* Logo */}
      <div style={{ padding: '24px 24px 32px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 24, color: '#b51822' }}>🩸</span>
        <Text style={{ color: '#fff', fontWeight: 800, fontSize: 18, letterSpacing: '-0.5px' }}>
          BloodConnect
        </Text>
      </div>

      <Text style={{
        color: '#64748b', fontSize: 11, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.15em',
        paddingLeft: 24, display: 'block', marginBottom: 8,
      }}>
        Admin Dashboard
      </Text>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[activeKey]}
        onClick={({ key }) => router.push(`/${key}`)}
        items={navItems}
        style={{ background: 'transparent', border: 'none' }}
      />

      <div style={{ padding: '16px 12px', position: 'absolute', bottom: 0, width: '100%' }}>
        <AppButton
          variant="primary"
          size="md"
          icon={<PlusCircleFilled />}
          label="New Campaign"
          block
          style={{ borderRadius: 8, marginBottom: 16 }}
        />
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 8 }}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[]}
            onClick={({ key }) => router.push(`/${key}`)}
            items={bottomItems}
            style={{ background: 'transparent', border: 'none' }}
          />
        </div>
      </div>
    </Sider>
  );
}