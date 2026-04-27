
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
          colorPrimary:       '#ef4444',
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
      <Layout style={{ minHeight: '100vh', background: '#f8fafc' }}>

        <SideNavBar
          activeKey={activeMenu}
        />

        <Layout style={{ marginLeft: 280, background: 'transparent' }}>
          <TopAppBar />

          <Content style={{ padding: '40px 48px' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
              <div>
                <Title level={1} style={{ margin: 0, fontWeight: 800, fontSize: 36, letterSpacing: '-0.04em', color: '#0f172a' }}>
                  Pulse Overview
                </Title>
                <Text style={{ color: 'rgba(0,0,0,0.45)', fontSize: 16, fontWeight: 500 }}>
                  Real-time clinical operational data for <span style={{ color: '#ef4444', fontWeight: 700 }}>BloodConnect</span>.
                </Text>
              </div>
              <Space size={12}>
                <Button 
                  icon={<CalendarOutlined />} 
                  style={{ 
                    height: 44, padding: '0 20px', borderRadius: 12, fontWeight: 600,
                    border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                  }}
                >
                  Last 30 Days
                </Button>
                <Button 
                  type="primary"
                  icon={<DownloadOutlined />} 
                  style={{ 
                    height: 44, padding: '0 20px', borderRadius: 12, fontWeight: 600,
                    background: '#ef4444', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
                  }}
                >
                  Export Report
                </Button>
              </Space>
            </div>

            {/* Stats Row */}
            <div style={{ marginBottom: 40 }}>
              <StatsRow />
            </div>

            {/* Queue + Campaigns */}
            <Row gutter={[32, 32]} style={{ marginBottom: 32 }}>
              <Col xs={24} lg={15}>
                <RecentQueueTable
                  data={MOCK_QUEUE}
                  onComplete={(id) => console.log('complete', id)}
                  onSkip={(id) => console.log('skip', id)}
                />
              </Col>
              <Col xs={24} lg={9}>
                <CampaignProgress />
              </Col>
            </Row>

            {/* Chart */}
            <div style={{ marginBottom: 48 }}>
              <DonationsTrendChart />
            </div>

          </Content>
        </Layout>

        <FloatButton
          icon={<PlusOutlined style={{ color: '#fff', fontSize: 24 }} />}
          type="primary"
          style={{ 
            right: 48, 
            bottom: 48, 
            width: 64, 
            height: 64, 
            background: '#ef4444',
            boxShadow: '0 8px 24px rgba(239, 68, 68, 0.4)'
          }}
        />

      </Layout>
    </ConfigProvider>
  );
}
