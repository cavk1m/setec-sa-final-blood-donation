"use client";

import { useState } from 'react';
import { Layout, ConfigProvider, Row, Col, Typography, Breadcrumb, Table, Tag, Progress, Card, Space } from 'antd';
import { PlusOutlined, FilterOutlined, TeamOutlined, MedicineBoxOutlined, HomeOutlined, ExportOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import SideNavBar from '../side-navBar';
import TopAppBar from '../top-bar';
import AddLocationDrawer from './create-location';
import LocationCard, { type LocationItem } from './location-card';
import AppButton from '@/src/components/ui/app-button';

const { Content } = Layout;
const { Title, Text, Link } = Typography;

const MOCK_LOCATIONS: LocationItem[] = [
  {
    id: '1',
    name: 'City Hospital Drive',
    address: '124 Medical Way, Suite 300',
    donationType: ['WHOLE BLOOD', 'PLASMA ONLY'],
    queueCount: 5,
    staffCount: 6,
    hubType: 'MAIN CAMPUS',
    status: 'OPERATIONAL',
    lastActivity: '4 mins ago',
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'North Campus Clinic',
    address: '45 Education Lane, Building B',
    donationType: ['PLASMA ONLY'],
    queueCount: 2,
    staffCount: 3,
    hubType: 'MOBILE HUB',
    status: 'OPERATIONAL',
    lastActivity: '12 mins ago',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800'
  },
];

const RECENT_LOGS = [
  { key: '1', location: 'City Hospital Drive', action: 'New Donor Check-in (Type O-)', staff: 'Dr. Sarah Chen', time: '10:42 AM', status: 'COMPLETED' },
  { key: '2', location: 'North Campus Clinic', action: 'Inventory Sync Error', staff: 'System Auto', time: '10:38 AM', status: 'ALERT' },
  { key: '3', location: 'City Hospital Drive', action: 'Plasma Collection Start', staff: 'Mark Jenkins', time: '10:25 AM', status: 'IN-PROGRESS' },
];

export default function LocationPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [locations, setLocations] = useState<LocationItem[]>(MOCK_LOCATIONS);

  const columns = [
    { title: 'LOCATION', dataIndex: 'location', key: 'location', render: (text: string) => <Text style={{ fontWeight: 600 }}>{text}</Text> },
    { title: 'EVENT / ACTION', dataIndex: 'action', key: 'action' },
    { title: 'STAFF', dataIndex: 'staff', key: 'staff' },
    { title: 'TIME', dataIndex: 'time', key: 'time' },
    { 
      title: 'STATUS', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => {
        let color = '#16a34a';
        let bg = '#f0fdf4';
        if (status === 'ALERT') { color = '#ef4444'; bg = '#fff1f2'; }
        if (status === 'IN-PROGRESS') { color = '#3b82f6'; bg = '#eff6ff'; }
        return (
          <Tag style={{ 
            background: bg, color: color, border: 'none', 
            borderRadius: 6, fontWeight: 800, fontSize: 10 
          }}>
            {status}
          </Tag>
        );
      }
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <SideNavBar activeKey="locations" />
      <Layout style={{ marginLeft: 280, background: 'transparent' }}>
        <TopAppBar />
        <Content style={{ padding: '32px 48px', minHeight: 280 }}>
          <Breadcrumb 
            items={[
              { title: 'Console' },
              { title: 'Locations' },
            ]}
            style={{ marginBottom: 16 }}
          />
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
            <div>
              <Title level={2} style={{ margin: 0, fontWeight: 800, letterSpacing: '-0.03em' }}>Location Management</Title>
              <Text style={{ color: 'rgba(0,0,0,0.45)', fontSize: 15 }}>Monitor donor activity and manage operational capacity across all centers.</Text>
            </div>
            <Space size={12}>
              <AppButton
                variant="secondary"
                size="md"
                icon={<FilterOutlined />}
                label="Filter Views"
                style={{ borderRadius: 10, fontWeight: 700, paddingInline: 20 }}
              />
              <AppButton
                variant="primary"
                size="md"
                icon={<PlusOutlined />}
                label="Add Location"
                onClick={() => setDrawerOpen(true)}
                style={{ 
                  borderRadius: 10, paddingInline: 24, 
                  background: '#ef4444', borderColor: '#ef4444',
                  fontWeight: 700, height: 44,
                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
                }}
              />
            </Space>
          </div>

          {/* Stats Row */}
          <Row gutter={24} style={{ marginBottom: 32 }}>
            {[
              { title: 'Active Locations', value: '12', sub: '+2 New', color: '#16a34a' },
              { title: 'Total Queue', value: '48', sub: 'Wait Time ~14m' },
              { title: 'Daily Capacity', value: '82%', progress: 82 },
              { title: 'Staff On Duty', value: '24', sub: 'Full Coverage' },
            ].map((stat, i) => (
              <Col span={6} key={i}>
                <Card style={{ borderRadius: 16, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <Text style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', marginBottom: 4 }}>{stat.title}</Text>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <Title level={2} style={{ margin: 0, fontWeight: 800 }}>{stat.value}</Title>
                    {stat.sub && <Text style={{ fontSize: 12, fontWeight: 700, color: stat.color || 'rgba(0,0,0,0.35)' }}>{stat.sub}</Text>}
                  </div>
                  {stat.progress !== undefined && (
                    <Progress percent={stat.progress} showInfo={false} strokeColor="#ef4444" trailColor="rgba(0,0,0,0.04)" size="small" style={{ marginTop: 8 }} />
                  )}
                </Card>
              </Col>
            ))}
          </Row>

          <AddLocationDrawer
            open={drawerOpen}
            onCancel={() => setDrawerOpen(false)}
            onSave={(data) => {
              // Simplified for redesign demo
              setDrawerOpen(false);
            }}
          />

          <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
            {locations.map((loc) => (
              <Col xs={24} lg={12} key={loc.id}>
                <LocationCard
                  data={loc}
                  onEdit={(id) => console.log('edit location', id)}
                  onDelete={(id) => setLocations((prev) => prev.filter((x) => x.id !== id))}
                />
              </Col>
            ))}
          </Row>

          {/* Table Section */}
          <Card 
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={4} style={{ margin: 0, fontWeight: 800 }}>Recent Schedule Log</Title>
                <Link style={{ color: '#ef4444', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                  Export CSV <ExportOutlined style={{ fontSize: 14 }} />
                </Link>
              </div>
            }
            style={{ borderRadius: 20, border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden' }}
          >
            <Table 
              dataSource={RECENT_LOGS} 
              columns={columns} 
              pagination={false} 
              style={{ margin: '-16px' }}
            />
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <AppButton 
                variant="ghost" 
                size="md" 
                label="LOAD MORE HISTORY" 
                style={{ fontWeight: 800, fontSize: 11, letterSpacing: '0.05em', color: 'rgba(0,0,0,0.45)', border: 'none' }}
              />
            </div>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}

