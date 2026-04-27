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
    data,
    xField: 'date',
    yField: 'value',
    smooth: true,
    color: '#ef4444',
    areaStyle: { 
      fill: 'l(270) 0:#ffffff 0.5:rgba(239, 68, 68, 0.1) 1:rgba(239, 68, 68, 0.2)', 
      fillOpacity: 1 
    },
    line: { color: '#ef4444', size: 3.5 },
    point: { 
      size: 4, 
      shape: 'circle', 
      style: { fill: '#fff', stroke: '#ef4444', lineWidth: 2 } 
    },
    xAxis: {
      tickLine: null,
      line: null,
      label: { style: { fill: 'rgba(0,0,0,0.3)', fontSize: 11, fontWeight: 500 } },
    },
    yAxis: {
      grid: { line: { style: { stroke: 'rgba(0,0,0,0.03)', lineWidth: 1, lineDash: [4, 4] } } },
      label: { style: { fill: 'rgba(0,0,0,0.3)', fontSize: 11 } },
    },
    tooltip: {
      formatter: (d: { date: string; value: number }) => ({ name: 'Donations', value: d.value }),
      domStyles: {
        'g2-tooltip': {
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: '1px solid rgba(0,0,0,0.05)',
          padding: '12px'
        }
      }
    },
  };

  return (
    <Card 
      style={{ 
        borderRadius: 20, 
        border: '1px solid rgba(0,0,0,0.04)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        background: '#fff'
      }} 
      styles={{ body: { padding: 32 } }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <Title level={4} style={{ margin: 0, fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em' }}>Donations Trend</Title>
          <Text style={{ color: 'rgba(0,0,0,0.45)', fontSize: 14 }}>Daily blood units collected across centers.</Text>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
            <Text style={{ fontSize: 12, fontWeight: 600, color: 'rgba(0,0,0,0.6)' }}>Current Period</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(0,0,0,0.1)' }} />
            <Text style={{ fontSize: 12, fontWeight: 600, color: 'rgba(0,0,0,0.6)' }}>Previous Period</Text>
          </div>
        </div>
      </div>
      <Area {...config} height={300} />
    </Card>
  );
}
