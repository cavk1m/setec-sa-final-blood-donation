"use client";

import { useEffect, useState } from 'react';
import { Layout, Row, Col, Typography, Breadcrumb, Table, Tag, Progress, Card, Space, message, Input } from 'antd';
import { PlusOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import SideNavBar from '../side-navBar';
import TopAppBar from '../top-bar';
import AddLocationDrawer from './create-location';
import LocationCard, { type LocationItem } from './location-card';
import AppButton from '@/src/components/ui/app-button';
import { getLocations, deleteLocation as deleteLocationApi, LocationData } from '@/src/features/location/location.api';

const { Content } = Layout;
const { Title, Text, Link } = Typography;

const RECENT_LOGS = [
  { key: '1', location: 'City Hospital Drive', action: 'New Donor Check-in (Type O-)', staff: 'Dr. Sarah Chen', time: '10:42 AM', status: 'COMPLETED' },
  { key: '2', location: 'North Campus Clinic', action: 'Inventory Sync Error', staff: 'System Auto', time: '10:38 AM', status: 'ALERT' },
  { key: '3', location: 'City Hospital Drive', action: 'Plasma Collection Start', staff: 'Mark Jenkins', time: '10:25 AM', status: 'IN-PROGRESS' },
];

export default function LocationPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<LocationData | null>(null);
   const [locations, setLocations] = useState<LocationItem[]>([]);
  const [backendLocations, setBackendLocations] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const data = await getLocations();
      setBackendLocations(data);
      
      // Map backend data to frontend LocationItem
      const mappedLocations: LocationItem[] = data.map((loc: LocationData, index: number) => ({
        id: loc.id,
        name: loc.name,
        address: loc.address,
        donationType: loc.donation_type === 'BOTH' ? ['BLOOD', 'MONEY'] : [loc.donation_type],
        queueCount: Math.floor(Math.random() * 10), 
        staffCount: 3 + Math.floor(Math.random() * 5),  
        hubType: index % 2 === 0 ? 'MAIN CAMPUS' : 'MOBILE HUB',
        status: loc.status || 'OPERATIONAL',
        lastActivity: `${Math.floor(Math.random() * 60)} mins ago`,
        imageUrl: `https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800&sig=${loc.id}`
      }));
      
      setLocations(mappedLocations);
    } catch (error) {
      message.error('Failed to load locations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleEdit = (id: string) => {
    const loc = backendLocations.find(l => l.id === id);
    if (loc) {
      setEditingLocation(loc);
      setDrawerOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteLocationApi(id);
      message.success('Location deleted successfully');
      fetchLocations();
    } catch (error) {
      message.error('Failed to delete location');
    }
  };

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
        const colors: Record<string, string> = {
          'COMPLETED': '#16a34a',
          'ALERT': '#ef4444',
          'IN-PROGRESS': '#3b82f6',
        };
        const color = colors[status] || '#94a3b8';
        return (
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: 8,
            background: `${color}12`, 
            padding: '4px 14px', 
            borderRadius: 99,
            width: 'fit-content',
            border: `1.5px solid ${color}20`
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}` }} />
            <span style={{ fontSize: 10, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {status}
            </span>
          </div>
        );
      }
    },
  ];

  const filteredLocations = locations.filter(loc => 
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <Title level={1} style={{ margin: 0, fontWeight: 800, fontSize: 36, letterSpacing: '-0.04em', color: '#0f172a' }}>
                Location Management
              </Title>
              <Text style={{ color: 'rgba(0,0,0,0.45)', fontSize: 16, fontWeight: 500 }}>
                Monitor donor activity and manage operational capacity across all centers.
              </Text>
            </div>
            <Space size={12}>
              <Input
                placeholder="Search by name or address..."
                prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                allowClear
                style={{ 
                  width: 320, 
                  height: 44, 
                  borderRadius: 12,
                  border: 'var(--premium-card-border)',
                  boxShadow: 'var(--premium-card-shadow)',
                  fontSize: 14,
                  fontWeight: 500
                }}
              />
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
              { title: 'Active Locations', value: locations.length.toString(), sub: '+2 New', color: '#16a34a' },
              { title: 'Total Queue', value: '48', sub: 'Wait Time ~14m' },
              { title: 'Daily Capacity', value: '82%', progress: 82 },
              { title: 'Staff On Duty', value: '24', sub: 'Full Coverage' },
            ].map((stat, i) => (
              <Col span={6} key={i}>
                <Card style={{ 
                  borderRadius: 'var(--premium-card-radius)', 
                  border: 'var(--premium-card-border)', 
                  boxShadow: 'var(--premium-card-shadow)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }} hoverable>
                  <Text style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', marginBottom: 4 }}>{stat.title}</Text>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <Title level={2} style={{ margin: 0, fontWeight: 800 }}>{stat.value}</Title>
                    {stat.sub && <Text style={{ fontSize: 12, fontWeight: 700, color: stat.color || 'rgba(0,0,0,0.35)' }}>{stat.sub}</Text>}
                  </div>
                  {stat.progress !== undefined && (
                    <Progress percent={stat.progress} showInfo={false} strokeColor="#ef4444" railColor="rgba(0,0,0,0.04)" size="small" style={{ marginTop: 8 }} />
                  )}
                </Card>
              </Col>
            ))}
          </Row>

          <AddLocationDrawer
            open={drawerOpen}
            initialData={editingLocation}
            onCancel={() => {
              setDrawerOpen(false);
              setEditingLocation(null);
            }}
            onSave={() => {
              setDrawerOpen(false);
              setEditingLocation(null);
              fetchLocations();
            }}
          />

          <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
            {filteredLocations.map((loc) => (
              <Col xs={24} lg={12} key={loc.id}>
                <LocationCard
                  data={loc}
                  onEdit={(id) => handleEdit(id)}
                  onDelete={(id) => handleDelete(id)}
                />
              </Col>
            ))}
            {filteredLocations.length === 0 && !loading && (
              <Col span={24}>
                <Card style={{ textAlign: 'center', padding: '48px 0', borderRadius: 20, border: '1px dashed #e2e8f0', background: 'transparent' }}>
                  <SearchOutlined style={{ fontSize: 48, color: '#cbd5e1', marginBottom: 16 }} />
                  <Title level={4} style={{ color: '#64748b', marginBottom: 8 }}>No locations found</Title>
                  <Text style={{ color: '#94a3b8' }}>Try adjusting your search query to find what you're looking for.</Text>
                </Card>
              </Col>
            )}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

