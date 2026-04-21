'use client';

import { Card, Typography, Progress, Space } from 'antd';
import {
  ArrowUpOutlined, TeamOutlined, MedicineBoxOutlined,
  NotificationOutlined, SafetyCertificateOutlined,
} from '@ant-design/icons';

const { Text, Title } = Typography;

export default function StatsRow() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: 24,
    }}>

      {/* Total Donors */}
      <Card style={{ borderRadius: 12, border: '1px solid #e3e8f9' }} styles={{ body: { padding: 24 } }} hoverable>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ background: '#eff6ff', color: '#2563eb', borderRadius: 8, padding: 10 }}>
            <TeamOutlined style={{ fontSize: 22 }} />
          </div>
          <span style={{ background: '#f0fdf4', color: '#16a34a', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 2 }}>
            <ArrowUpOutlined /> 12%
          </span>
        </div>
        <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', display: 'block', marginBottom: 4 }}>Total Donors</Text>
        <Title level={2} style={{ margin: 0, fontWeight: 800, letterSpacing: '-1px' }}>1,284</Title>
        <Text style={{ fontSize: 10, color: '#94a3b8', marginTop: 8, display: 'block' }}>Updated 5m ago</Text>
      </Card>

      {/* Donations Today */}
      <Card style={{ borderRadius: 12, border: '1px solid #e3e8f9' }} styles={{ body: { padding: 24 } }} hoverable>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ background: '#fff1f2', color: '#b51822', borderRadius: 8, padding: 10 }}>
            <MedicineBoxOutlined style={{ fontSize: 22 }} />
          </div>
          <Text style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Today</Text>
        </div>
        <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', display: 'block', marginBottom: 4 }}>Donations Today</Text>
        <Title level={2} style={{ margin: 0, fontWeight: 800, letterSpacing: '-1px' }}>47</Title>
        <Space size={6} align="center" style={{ marginTop: 8 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#b51822', display: 'inline-block' }} />
          <Text style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Live</Text>
        </Space>
      </Card>

      {/* Campaign Goal */}
      <Card style={{ borderRadius: 12, border: '1px solid #e3e8f9' }} styles={{ body: { padding: 24 } }} hoverable>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ background: '#fffbeb', color: '#d97706', borderRadius: 8, padding: 10 }}>
            <NotificationOutlined style={{ fontSize: 22 }} />
          </div>
          <span style={{ background: '#f1f3ff', color: '#1e293b', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999 }}>5 Active</span>
        </div>
        <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', display: 'block', marginBottom: 4 }}>Campaign Goal</Text>
        <Title level={2} style={{ margin: 0, fontWeight: 800, letterSpacing: '-1px' }}>84%</Title>
        <Progress percent={84} showInfo={false} strokeColor="#f59e0b" railColor="#f1f3ff" style={{ marginTop: 12 }} size={['100%', 6]} />
      </Card>

      {/* Certificates */}
      <Card style={{ borderRadius: 12, border: '1px solid #e3e8f9' }} styles={{ body: { padding: 24 } }} hoverable>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ background: '#faf5ff', color: '#7c3aed', borderRadius: 8, padding: 10 }}>
            <SafetyCertificateOutlined style={{ fontSize: 22 }} />
          </div>
          <span style={{ background: '#faf5ff', color: '#7c3aed', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999 }}>+12 Today</span>
        </div>
        <Text style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748b', display: 'block', marginBottom: 4 }}>Certificates</Text>
        <Title level={2} style={{ margin: 0, fontWeight: 800, letterSpacing: '-1px' }}>932</Title>
        <Text style={{ fontSize: 10, color: '#94a3b8', marginTop: 8, display: 'block' }}>Compliance verified</Text>
      </Card>

    </div>
  );
}