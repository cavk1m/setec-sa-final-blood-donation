'use client';

import { useState } from 'react';
import { Layout, ConfigProvider, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import SideNavBar from '../side-navBar';
import TopAppBar from '../top-bar';
import CertificateStatsBar from './certificate-statsBar';
import CertificateTable from './certificate-table';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function CertificatesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <SideNavBar activeKey="certificates" />
      <Layout style={{ marginLeft: 280, background: 'transparent' }}>
        <TopAppBar />
        <Content style={{ padding: '32px 48px', minHeight: 280 }}>
          <div style={{ marginBottom: 32 }}>
            <Title level={2} style={{ margin: 0, fontWeight: 800, letterSpacing: '-0.03em' }}>Blood Donation Certificates</Title>
            <Text style={{ color: 'rgba(0,0,0,0.45)', fontSize: 15 }}>Validate and issue official donation documentation.</Text>
          </div>

          <CertificateStatsBar onSearch={setSearchQuery} />
          <CertificateTable searchQuery={searchQuery} />
        </Content>
      </Layout>
    </Layout>
  );
}

