// import Greeting from '@/lib/features/greeting/Greeting'

// export default function Home() {
//   return (
//     <main className="p-6">
//       <Greeting />
//     </main>
//   )
// }
'use client';

import { useState } from 'react';
import {
  Layout, Row, Col, Button, Typography,
  Space, FloatButton, ConfigProvider,
} from 'antd';
import { CalendarOutlined, DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import SideNavBar from '@/src/components/side-navBar';
import TopAppBar from '@/src/components/top-bar';
import StatsRow from '@/src/components/stats-row';
import CampaignProgress from '@/src/components/campaign/campaign-progress';
import DonationsTrendChart from '@/src/components/queue/donations-trend-chart';
import RecentQueueTable from '@/src/components/queue/recent-queuetable';

const MOCK_QUEUE = [
  { id: '1', donor: 'Sophea Chan',    bloodType: 'A+', status: 'waiting',    time: '09:00 AM' },
  { id: '2', donor: 'Ratanak Lim',    bloodType: 'O-', status: 'in-progress', time: '09:15 AM' },
  { id: '3', donor: 'Bopha Srey',     bloodType: 'B+', status: 'waiting',    time: '09:30 AM' },
  { id: '4', donor: 'Dara Pich',      bloodType: 'AB+', status: 'completed', time: '08:45 AM' },
  { id: '5', donor: 'Kunthea Meas',   bloodType: 'O+', status: 'waiting',    time: '09:45 AM' },
];

const { Content } = Layout;
const { Title, Text } = Typography;

export default function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState('overview');
  const router = useRouter();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary:       '#b51822',
          colorBgContainer:   '#ffffff',
          colorBgLayout:      '#f9f9ff',
          colorBorder:        '#e3e8f9',
          colorText:          '#161c27',
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
            if (key === 'queue') {
              router.push('/queue');
              return;
            }
            if (key === 'locations') {
              router.push('/locations');
              return;
            }
            if (key === 'certificates') {
              router.push('/certificates');
              return;
            }
            if (key === 'campaigns') {
              router.push('/campaigns');
              return;
            }
            if (key === 'users') {
              router.push('/users');
              return;
            }
            if (key === 'settings') {
              router.push('/settings');
              return;
            }
            setActiveMenu(key);
          }}
        />

        <Layout style={{ marginLeft: 260 }}>
          <TopAppBar />

          <Content style={{ padding: 32 }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
              <div>
                <Title level={2} style={{ margin: 0, fontWeight: 800, letterSpacing: '-1px' }}>
                  Pulse Overview
                </Title>
                <Text type="secondary">Real-time clinical operational data for BloodConnect.</Text>
              </div>
              <Space>
                <Button icon={<CalendarOutlined />} style={{ fontWeight: 700, borderRadius: 8 }}>Last 30 Days</Button>
                <Button icon={<DownloadOutlined />} style={{ fontWeight: 700, borderRadius: 8 }}>Export Report</Button>
              </Space>
            </div>

            {/* Stats */}
            <div style={{ marginBottom: 32 }}>
              <StatsRow />
            </div>

            {/* Queue + Campaigns */}
            <Row gutter={[32, 32]} style={{ marginBottom: 32 }}>
              <Col xs={24} lg={14}>
                <RecentQueueTable
                  data={MOCK_QUEUE}
                  onComplete={(id) => console.log('complete', id)}
                  onSkip={(id) => console.log('skip', id)}
                />
              </Col>
              <Col xs={24} lg={10}>
                <CampaignProgress />
              </Col>
            </Row>

            {/* Chart */}
            <DonationsTrendChart />

          </Content>
        </Layout>

        <FloatButton
          icon={<PlusOutlined />}
          type="primary"
          style={{ right: 32, bottom: 32 }}
        />

      </Layout>
    </ConfigProvider>
  );
}