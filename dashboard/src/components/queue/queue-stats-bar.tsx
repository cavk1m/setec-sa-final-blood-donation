'use client';

import { Row, Col, Card, Typography } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

export default function QueueStatsBar() {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>

      {/* Avg Wait */}
      <Col xs={24} sm={12} lg={6}>
        <Card
          styles={{ body: { padding: '20px 24px' } }}
          style={{
            borderRadius: 12,
            border: '1px solid #e3e8f9',
            borderLeft: '4px solid #b51822',
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#64748b',
              display: 'block',
              marginBottom: 6,
            }}
          >
            Avg. Wait Time
          </Text>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <Title
              level={2}
              style={{
                margin: 0,
                fontWeight: 800,
                letterSpacing: '-1px',
                lineHeight: 1,
              }}
            >
              14 mins
            </Title>

            <Text style={{ color: '#16a34a', fontSize: 12, fontWeight: 700 }}>
              <ArrowDownOutlined /> 2m
            </Text>
          </div>
        </Card>
      </Col>

      {/* In Process */}
      <Col xs={24} sm={12} lg={6}>
        <Card
          styles={{ body: { padding: '20px 24px' } }}
          style={{
            borderRadius: 12,
            border: '1px solid #e3e8f9',
            borderLeft: '4px solid #2563eb',
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#64748b',
              display: 'block',
              marginBottom: 6,
            }}
          >
            In Process
          </Text>

          <Title
            level={2}
            style={{
              margin: 0,
              fontWeight: 800,
              letterSpacing: '-1px',
              lineHeight: 1,
            }}
          >
            08
          </Title>
        </Card>
      </Col>

      {/* Urgent */}
      <Col xs={24} sm={12} lg={6}>
        <Card
          styles={{ body: { padding: '20px 24px' } }}
          style={{
            borderRadius: 12,
            border: '1px solid #e3e8f9',
            borderLeft: '4px solid #f59e0b',
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#64748b',
              display: 'block',
              marginBottom: 6,
            }}
          >
            Urgent Requests
          </Text>

          <Title
            level={2}
            style={{
              margin: 0,
              fontWeight: 800,
              letterSpacing: '-1px',
              lineHeight: 1,
            }}
          >
            03
          </Title>
        </Card>
      </Col>

      {/* Efficiency */}
      <Col xs={24} sm={12} lg={6}>
        <Card
          styles={{ body: { padding: '20px 24px' } }}
          style={{
            borderRadius: 12,
            border: '1px solid #e3e8f9',
            borderLeft: '4px solid #6b7280',
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#64748b',
              display: 'block',
              marginBottom: 6,
            }}
          >
            Efficiency Score
          </Text>

          <Title
            level={2}
            style={{
              margin: 0,
              fontWeight: 800,
              letterSpacing: '-1px',
              lineHeight: 1,
            }}
          >
            98.2%
          </Title>
        </Card>
      </Col>

    </Row>
  );
}