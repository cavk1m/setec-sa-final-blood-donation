import { Row, Col, Card, Typography } from 'antd';
import { 
  ClockCircleOutlined, 
  ArrowDownOutlined, 
  SyncOutlined, 
  AlertOutlined, 
  CheckCircleOutlined 
} from '@ant-design/icons';

const { Text, Title } = Typography;

export default function QueueStatsBar() {
  return (
    <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>

      {/* Avg Wait */}
      <Col xs={24} sm={12} lg={6}>
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
              width: 44, height: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <ClockCircleOutlined style={{ fontSize: 22 }} />
            </div>
            <div style={{ 
              background: 'rgba(34, 197, 94, 0.08)', 
              color: '#22c55e', 
              fontSize: 11, 
              fontWeight: 700, 
              padding: '4px 8px', 
              borderRadius: 99, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 4 
            }}>
              <ArrowDownOutlined style={{ fontSize: 10 }} /> 12%
            </div>
          </div>
          <Text style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.45)', marginBottom: 4 }}>Avg. Wait Time</Text>
          <Title level={2} style={{ margin: 0, fontWeight: 800, fontSize: 28, letterSpacing: '-0.03em' }}>14 mins</Title>
        </Card>
      </Col>

      {/* In Process */}
      <Col xs={24} sm={12} lg={6}>
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
              width: 44, height: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <SyncOutlined style={{ fontSize: 22 }} />
            </div>
            <div style={{ 
              background: 'rgba(139, 92, 246, 0.08)', 
              color: '#8b5cf6', 
              fontSize: 11, 
              fontWeight: 700, 
              padding: '4px 8px', 
              borderRadius: 99
            }}>
              ACTIVE
            </div>
          </div>
          <Text style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.45)', marginBottom: 4 }}>In Process</Text>
          <Title level={2} style={{ margin: 0, fontWeight: 800, fontSize: 28, letterSpacing: '-0.03em' }}>08</Title>
        </Card>
      </Col>

      {/* Urgent */}
      <Col xs={24} sm={12} lg={6}>
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
              width: 44, height: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <AlertOutlined style={{ fontSize: 22 }} />
            </div>
            <div style={{ 
              background: 'rgba(239, 68, 68, 0.08)', 
              color: '#ef4444', 
              fontSize: 11, 
              fontWeight: 700, 
              padding: '4px 8px', 
              borderRadius: 99
            }}>
              PRIORITY
            </div>
          </div>
          <Text style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.45)', marginBottom: 4 }}>Urgent Requests</Text>
          <Title level={2} style={{ margin: 0, fontWeight: 800, fontSize: 28, letterSpacing: '-0.03em' }}>03</Title>
        </Card>
      </Col>

      {/* Efficiency */}
      <Col xs={24} sm={12} lg={6}>
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
              background: 'rgba(34, 197, 94, 0.08)', 
              color: '#22c55e', 
              borderRadius: 14, 
              width: 44, height: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <CheckCircleOutlined style={{ fontSize: 22 }} />
            </div>
            <div style={{ 
              background: 'rgba(34, 197, 94, 0.08)', 
              color: '#22c55e', 
              fontSize: 11, 
              fontWeight: 700, 
              padding: '4px 8px', 
              borderRadius: 99
            }}>
              TARGET
            </div>
          </div>
          <Text style={{ fontSize: 13, fontWeight: 600, color: 'rgba(0,0,0,0.45)', marginBottom: 4 }}>Efficiency Score</Text>
          <Title level={2} style={{ margin: 0, fontWeight: 800, fontSize: 28, letterSpacing: '-0.03em' }}>98.2%</Title>
        </Card>
      </Col>

    </Row>
  );
}
