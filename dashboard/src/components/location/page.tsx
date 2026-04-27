'use client';

import { useState } from 'react';
import { Layout, ConfigProvider, Row, Col, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import SideNavBar from '../side-navBar';
import TopAppBar from '../top-bar';
import AddLocationDrawer from './create-location';
import LocationCard, { type LocationItem } from './location-card';
import AppButton from '@/src/components/ui/app-button';

const { Content } = Layout;
const { Title } = Typography;

const MOCK_LOCATIONS: LocationItem[] = [
  {
    id: '1',
    name: 'City Hospital Drive',
    address: 'Downtown',
    donationType: 'WHOLE BLOOD',
    queueCount: 5,
    hasQR: true,
  },
  {
    id: '2',
    name: 'North Campus Clinic',
    address: 'North Campus',
    donationType: 'PLASMA ONLY',
    queueCount: 2,
    hasQR: false,
  },
];

export default function LocationPage() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState('locations');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [locations, setLocations] = useState<LocationItem[]>(MOCK_LOCATIONS);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ef4444',
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
            if (key === 'overview') {
              router.push('/');
              return;
            }
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
        <Layout style={{ marginLeft: 280 }}>
          <TopAppBar />
          <Content style={{ padding: 32, background: '#f1f3ff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
              <Title level={2} style={{ margin: 0, fontWeight: 800, letterSpacing: '-1px' }}>
                Locations
              </Title>
              <AppButton
                variant="primary"
                size="md"
                icon={<PlusOutlined />}
                label="Add Location"
                onClick={() => setDrawerOpen(true)}
                style={{ borderRadius: 8 }}
              />
            </div>

            <AddLocationDrawer
              open={drawerOpen}
              onCancel={() => setDrawerOpen(false)}
              onSave={(data) => {
                const id = String(Date.now());
                setLocations((prev) => [{ ...data, id }, ...prev]);
                setDrawerOpen(false);
              }}
            />

            <Row gutter={[16, 16]}>
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
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

