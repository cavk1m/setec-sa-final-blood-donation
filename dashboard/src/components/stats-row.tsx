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
          borderRadius: 20, 
          border: '1px solid rgba(0,0,0,0.04)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          background: '#fff'
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
            fontSize: 12, 
            fontWeight: 700, 
            padding: '4px 10px', 
            borderRadius: 99, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 4 
          }}>
            <ArrowUpOutlined style={{ fontSize: 10 }} /> 12%
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.45)', marginBottom: 4 }}>Total Donors</Text>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <Title level={2} style={{ margin: 0, fontWeight: 800, fontSize: 32, letterSpacing: '-0.03em' }}>1,284</Title>
            <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.3)' }}>since last month</Text>
          </div>
        </div>
      </Card>

      {/* Donations Today */}
      <Card 
        style={{ 
          borderRadius: 20, 
          border: '1px solid rgba(0,0,0,0.04)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          background: '#fff'
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
            background: 'rgba(239, 68, 68, 0.08)', 
            color: '#ef4444', 
            fontSize: 12, 
            fontWeight: 700, 
            padding: '4px 10px', 
            borderRadius: 99, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 6 
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
            LIVE
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.45)', marginBottom: 4 }}>Donations Today</Text>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <Title level={2} style={{ margin: 0, fontWeight: 800, fontSize: 32, letterSpacing: '-0.03em' }}>47</Title>
            <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.3)' }}>+5 in last hour</Text>
          </div>
        </div>
      </Card>

      {/* Campaign Goal */}
      <Card 
        style={{ 
          borderRadius: 20, 
          border: '1px solid rgba(0,0,0,0.04)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          background: '#fff'
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
          <div style={{ 
            background: 'rgba(245, 158, 11, 0.08)', 
            color: '#f59e0b', 
            fontSize: 12, 
            fontWeight: 700, 
            padding: '4px 10px', 
            borderRadius: 99
          }}>
            5 ACTIVE
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.45)', marginBottom: 4 }}>Campaign Goal</Text>
          <Title level={2} style={{ margin: 0, fontWeight: 800, fontSize: 32, letterSpacing: '-0.03em', marginBottom: 12 }}>84%</Title>
          <Progress 
            percent={84} 
            showInfo={false} 
            strokeColor={{
              '0%': '#f59e0b',
              '100%': '#ef4444',
            }} 
            railColor="rgba(0,0,0,0.03)" 
            size={['100%', 8]} 
            strokeLinecap="round"
          />
        </div>
      </Card>

      {/* Certificates Issued */}
      <Card 
        style={{ 
          borderRadius: 20, 
          border: '1px solid rgba(0,0,0,0.04)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          background: '#fff'
        }} 
        styles={{ body: { padding: '24px' } }} 
        hoverable
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div style={{ 
            background: 'rgba(139, 92, 246, 0.08)', 
            color: '#8b5cf6', 
            borderRadius: 14, 
            width: 48, height: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <SafetyCertificateOutlined style={{ fontSize: 24 }} />
          </div>
          <div style={{ 
            background: 'rgba(139, 92, 246, 0.08)', 
            color: '#8b5cf6', 
            fontSize: 12, 
            fontWeight: 700, 
            padding: '4px 10px', 
            borderRadius: 99
          }}>
            VERIFIED
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.45)', marginBottom: 4 }}>Certificates Issued</Text>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <Title level={2} style={{ margin: 0, fontWeight: 800, fontSize: 32, letterSpacing: '-0.03em' }}>932</Title>
            <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.3)' }}>compliance ready</Text>
          </div>
        </div>
      </Card>

    </div>
  );
}
