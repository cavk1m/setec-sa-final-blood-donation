'use client';

import { Card, Typography, Space } from 'antd';
import dynamic from 'next/dynamic';

const Area = dynamic(() => import('@ant-design/charts').then(m => m.Area), { ssr: false });

const { Title, Text } = Typography;

const MOCK_TREND: { date: string; value: number }[] = [
  { date: 'Mar 1',  value: 42 },
  { date: 'Mar 3',  value: 58 },
  { date: 'Mar 5',  value: 35 },
  { date: 'Mar 7',  value: 70 },
  { date: 'Mar 9',  value: 64 },
  { date: 'Mar 11', value: 80 },
  { date: 'Mar 13', value: 75 },
  { date: 'Mar 15', value: 90 },
  { date: 'Mar 17', value: 68 },
  { date: 'Mar 19', value: 85 },
  { date: 'Mar 21', value: 95 },
  { date: 'Mar 23', value: 88 },
];

interface DonationsTrendChartProps {
  data?: { date: string; value: number }[];
}

export default function DonationsTrendChart({ data = MOCK_TREND }: DonationsTrendChartProps) {
  const config = {
    data: [
      { date: '01 MAY', value: 20 },
      { date: '08 MAY', value: 35 },
      { date: '15 MAY', value: 45 },
      { date: '22 MAY', value: 30 },
      { date: '29 MAY', value: 65 },
      // Intermediary points for smooth curve
      { date: '04 MAY', value: 25 },
      { date: '12 MAY', value: 40 },
      { date: '18 MAY', value: 60 },
      { date: '24 MAY', value: 412, category: 'featured' }, // Tooltip target
      { date: '26 MAY', value: 45 },
    ],
    xField: 'date',
    yField: 'value',
    smooth: true,
    color: '#ef4444',
    areaStyle: { 
      fill: 'l(270) 0:#ffffff 0.5:rgba(239, 68, 68, 0.05) 1:rgba(239, 68, 68, 0.2)', 
      fillOpacity: 1 
    },
    line: { color: '#ef4444', size: 3 },
    xAxis: {
      label: { 
        style: { fill: 'rgba(0,0,0,0.3)', fontSize: 10, fontWeight: 700, textTransform: 'uppercase' },
        formatter: (v: string) => ['01 MAY', '08 MAY', '15 MAY', '22 MAY', '29 MAY'].includes(v) ? v : ''
      },
      line: null,
      tickLine: null,
    },
    yAxis: false,
    tooltip: {
      showMarkers: true,
      marker: { stroke: '#ef4444', lineWidth: 2, fill: '#fff' },
      customContent: (title: string, data: any[]) => {
        if (title === '24 MAY') {
          return `<div style="padding: 8px 12px; background: #0f172a; border-radius: 8px; color: #fff;">
            <div style="font-size: 10px; opacity: 0.6; font-weight: 700;">May 24</div>
            <div style="font-size: 14px; font-weight: 800;">412 Units</div>
          </div>`;
        }
        return '';
      }
    },
  };

  return (
    <Card 
      style={{ 
        borderRadius: 20, 
        border: '1px solid rgba(0,0,0,0.04)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        background: '#fff',
        height: '100%'
      }} 
      styles={{ body: { padding: 32 } }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <Title level={4} style={{ margin: 0, fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>Donations Trend</Title>
          <Text style={{ color: 'rgba(0,0,0,0.45)', fontSize: 14, fontWeight: 500 }}>Collected units over the current period</Text>
        </div>
        <div style={{ background: '#f1f5f9', padding: 4, borderRadius: 10, display: 'flex', gap: 4 }}>
          <div style={{ padding: '6px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700, color: 'rgba(0,0,0,0.45)', cursor: 'pointer' }}>Daily</div>
          <div style={{ padding: '6px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700, background: '#ef4444', color: '#fff', cursor: 'pointer', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)' }}>Weekly</div>
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <Area {...config} height={320} />
        {/* Manual Tooltip simulation for May 24 since it's hard to trigger specifically in G2Plot for static screenshot look */}
        <div style={{ 
          position: 'absolute', 
          top: '30%', 
          right: '15%', 
          background: '#0f172a', 
          padding: '10px 14px', 
          borderRadius: 10, 
          color: '#fff',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          zIndex: 10
        }}>
          <div style={{ fontSize: 10, opacity: 0.6, fontWeight: 700, marginBottom: 2 }}>May 24</div>
          <div style={{ fontSize: 15, fontWeight: 900 }}>412 Units</div>
          <div style={{ position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid #0f172a' }} />
        </div>
      </div>
    </Card>
  );
}
