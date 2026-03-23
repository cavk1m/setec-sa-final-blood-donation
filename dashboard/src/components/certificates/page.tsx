'use client';

import { useState } from 'react';
import { Layout, ConfigProvider, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import SideNavBar from '../side-navBar';
import TopAppBar from '../top-bar';
import CertificateStatsBar from './certificate-statsBar';
import CertificateTable from './certificate-table';

const { Content } = Layout;
const { Title } = Typography;

export default function CertificatesPage() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState('certificates');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#b51822',
          colorBgContainer: '#ffffff',
          colorBgLayout: '#f9f9ff',
          colorBorder: '#e3e8f9',
          colorText: '#161c27',
          colorTextSecondary: '#5d5c74',
          borderRadius: 8,
          fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <SideNavBar
          activeKey={activeMenu}
          onMenuClick={(key) => {
            if (key === 'overview') return router.push('/');
            if (key === 'queue') return router.push('/queue');
            if (key === 'locations') return router.push('/locations');
            if (key === 'certificates') return router.push('/certificates');
            if (key === 'campaigns') return router.push('/campaigns');
            if (key === 'users') return router.push('/users');
            if (key === 'settings') return router.push('/settings');
            setActiveMenu(key);
          }}
        />

        <Layout style={{ marginLeft: 260 }}>
          <TopAppBar />
          <Content style={{ padding: 32, background: '#f1f3ff' }}>
            <div style={{ marginBottom: 24 }}>
              <Title level={2} style={{ margin: 0, fontWeight: 800, letterSpacing: '-1px' }}>
                Certificates
              </Title>
            </div>

            <CertificateStatsBar onSearch={setSearchQuery} />
            <CertificateTable searchQuery={searchQuery} />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

