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
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: 24,
    }}>

      {/* Total Donors */}
      <Card 
        style={{ 
          borderRadius: "var(--premium-card-radius)", 
          border: "var(--premium-card-border)",
          boxShadow: "var(--premium-card-shadow)",
          background: '#fff',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }} 
        styles={{ body: { padding: '24px' } }} 
        hoverable
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div style={{ 
            background: 'rgba(59, 130, 246, 0.08)', 
            color: '#3b82f6', 
            borderRadius: 14, 
            width: 48, height: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <TeamOutlined style={{ fontSize: 24 }} />
          </div>
          <div style={{ 
            background: 'rgba(34, 197, 94, 0.08)', 
            color: '#22c55e', 
            fontSize: 11, 
            fontWeight: 800, 
            padding: '4px 12px', 
            borderRadius: 99, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 6,
            border: '1.5px solid rgba(34, 197, 94, 0.15)'
          }}>
            <ArrowUpOutlined style={{ fontSize: 10 }} /> 12%
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text style={{ fontSize: 11, fontWeight: 700, color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', marginBottom: 4 }}>Total Donors</Text>
          <Title level={2} style={{ margin: 0, fontWeight: 800, fontSize: 32, letterSpacing: '-0.03em' }}>1,284</Title>
        </div>
      </Card>

      {/* Donations Today */}
      <Card 
        style={{ 
          borderRadius: "var(--premium-card-radius)", 
          border: "var(--premium-card-border)",
          boxShadow: "var(--premium-card-shadow)",
          background: '#fff',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }} 
        styles={{ body: { padding: '24px' } }} 
        hoverable
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.08)', 
            color: '#ef4444', 
            borderRadius: 14, 
            width: 48, height: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <MedicineBoxOutlined style={{ fontSize: 24 }} />
          </div>
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            color: '#ef4444', 
            fontSize: 10, 
            fontWeight: 800, 
            padding: '4px 14px', 
            borderRadius: 99, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8,
            letterSpacing: '0.05em',
            border: '1.5px solid rgba(239, 68, 68, 0.15)'
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 8px #ef4444' }} />
            LIVE
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text style={{ fontSize: 11, fontWeight: 700, color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', marginBottom: 4 }}>Donations Today</Text>
          <Title level={2} style={{ margin: 0, fontWeight: 800, fontSize: 32, letterSpacing: '-0.03em' }}>47</Title>
        </div>
      </Card>

      {/* Campaign Goal */}
      <Card 
        style={{ 
          borderRadius: "var(--premium-card-radius)", 
          border: "var(--premium-card-border)",
          boxShadow: "var(--premium-card-shadow)",
          background: '#fff',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }} 
        styles={{ body: { padding: '24px' } }} 
        hoverable
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div style={{ 
            background: 'rgba(245, 158, 11, 0.08)', 
            color: '#f59e0b', 
            borderRadius: 14, 
            width: 48, height: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <NotificationOutlined style={{ fontSize: 24 }} />
          </div>
          <Text style={{ fontSize: 11, fontWeight: 700, color: 'rgba(0,0,0,0.45)' }}>Goal: 5,000</Text>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text style={{ fontSize: 11, fontWeight: 700, color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', marginBottom: 4 }}>Campaign Goal</Text>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
            <Title level={2} style={{ margin: 0, fontWeight: 800, fontSize: 32, letterSpacing: '-0.03em' }}>84%</Title>
            <Progress 
              percent={84} 
              showInfo={false} 
              strokeColor="#ef4444"
              railColor="rgba(0,0,0,0.04)" 
              size={['100%', 8]} 
              strokeLinecap="round"
              style={{ flex: 1, marginBottom: 6 }}
            />
          </div>
        </div>
      </Card>

      {/* Certificates Issued */}
      <Card 
        style={{ 
          borderRadius: "var(--premium-card-radius)", 
          border: "var(--premium-card-border)",
          boxShadow: "var(--premium-card-shadow)",
          background: '#fff',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }} 
        styles={{ body: { padding: '24px' } }} 
        hoverable
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div style={{ 
            background: 'rgba(22, 163, 74, 0.08)', 
            color: '#16a34a', 
            borderRadius: 14, 
            width: 48, height: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <SafetyCertificateOutlined style={{ fontSize: 24 }} />
          </div>
          <div style={{ 
            background: 'rgba(22, 163, 74, 0.1)', 
            color: '#16a34a', 
            fontSize: 10, 
            fontWeight: 800, 
            padding: '4px 14px', 
            borderRadius: 99,
            display: 'flex', alignItems: 'center', gap: 8,
            border: '1.5px solid rgba(22, 163, 74, 0.15)'
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a', boxShadow: '0 0 8px #16a34a' }} />
            VERIFIED
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text style={{ fontSize: 11, fontWeight: 700, color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', marginBottom: 4 }}>Certificates Issued</Text>
          <Title level={2} style={{ margin: 0, fontWeight: 800, fontSize: 32, letterSpacing: '-0.03em' }}>932</Title>
        </div>
      </Card>

    </div>
  );
}
