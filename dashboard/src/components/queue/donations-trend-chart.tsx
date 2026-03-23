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
    color: '#b51822',
    areaStyle: { fill: 'l(270) 0:#ffffff 0.5:#ffb3b3 1:#b51822', fillOpacity: 0.3 },
    line: { color: '#b51822', size: 3 },
    point: { size: 5, shape: 'circle', style: { fill: '#ffffff', stroke: '#b51822', lineWidth: 2 } },
    xAxis: {
      tickLine: null,
      line: null,
      label: { style: { fill: '#94a3b8', fontSize: 10, fontWeight: 700 } },
    },
    yAxis: {
      grid: { line: { style: { stroke: '#f1f3ff', lineWidth: 1 } } },
      label: { style: { fill: '#94a3b8', fontSize: 10 } },
    },
    tooltip: {
      formatter: (d: { date: string; value: number }) => ({ name: 'Units Collected', value: d.value }),
    },
  };

  return (
    <Card style={{ borderRadius: 12, border: '1px solid #e3e8f9' }} styles={{ body: { padding: 32 } }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <Title level={5} style={{ margin: 0, fontWeight: 700 }}>Donations Trend</Title>
          <Text style={{ color: '#5d5c74', fontSize: 14 }}>Operational throughput for the current month.</Text>
        </div>
        <Space size={8} align="center">
          <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#b51822' }} />
          <Text style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Units Collected
          </Text>
        </Space>
      </div>
      <Area {...config} height={250} />
    </Card>
  );
}