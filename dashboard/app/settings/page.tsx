"use client";

import { useEffect, useState } from "react";
import { Layout, Typography, Card, Avatar, Tag, Button, Row, Col, Table, message, Space, Breadcrumb, Divider } from "antd";
import {
  EditOutlined,
  UnlockOutlined,
  CopyOutlined,
  CalendarOutlined,
  HistoryOutlined,
  EnvironmentOutlined,
  AuditOutlined,
  DownloadOutlined,
  StopOutlined,
  CheckCircleFilled,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  MedicineBoxOutlined
} from "@ant-design/icons";
import SideNavBar from "@/src/components/side-navBar";
import TopAppBar from "@/src/components/top-bar";
import { getProfile, UserProfile } from "@/src/features/auth/profile.api";
import AdministrativeIdentity from "@/src/components/settings/administrative-Identity";
import SecurityProtocol from "@/src/components/settings/security-protocol";
import dayjs from "dayjs";
import { Modal } from "antd";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function RedesignedSettingsPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const fetchProfile = () => {
    setLoading(true);
    getProfile()
      .then(setProfile)
      .catch(() => message.error("Failed to load profile"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    message.success("Copied to clipboard");
  };

  if (loading && !profile) return null;

  return (
    <Layout style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <SideNavBar activeKey="settings" />
      <Layout style={{ marginLeft: 280, background: "transparent" }}>
        <TopAppBar />
        <Content style={{ padding: "24px 40px" }}>
          {/* Edit Profile Modal */}
          <Modal
            title="Edit Profile"
            open={editModalVisible}
            onCancel={() => setEditModalVisible(false)}
            footer={null}
            width={600}
            styles={{ body: { padding: 0 } }}
            centered
          >
            <AdministrativeIdentity onSaveSuccess={() => {
              setEditModalVisible(false);
              fetchProfile();
            }} />
          </Modal>

          {/* Reset Password Modal */}
          <Modal
            title="Reset Password"
            open={passwordModalVisible}
            onCancel={() => setPasswordModalVisible(false)}
            footer={null}
            width={600}
            styles={{ body: { padding: 0 } }}
            centered
          >
            <SecurityProtocol onSaveSuccess={() => setPasswordModalVisible(false)} />
          </Modal>

          {/* Breadcrumbs & Header */}
          <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <Breadcrumb 
                items={[
                  { title: "User Management" },
                  { title: "User Profile" }
                ]}
                style={{ marginBottom: 8 }}
              />
              <Title level={1} style={{ margin: 0, fontWeight: 800, fontSize: 36, letterSpacing: "-0.04em" }}>
                User Profile
              </Title>
            </div>
            <Space size={12}>
              <Button 
                icon={<EditOutlined />} 
                onClick={() => setEditModalVisible(true)}
                style={{ height: 44, borderRadius: 10, fontWeight: 600, paddingInline: 20 }}
              >
                Edit Profile
              </Button>
              <Button 
                type="primary" 
                danger 
                icon={<UnlockOutlined />} 
                onClick={() => setPasswordModalVisible(true)}
                style={{ height: 44, borderRadius: 10, fontWeight: 600, paddingInline: 20, background: "#ef4444" }}
              >
                Reset Password
              </Button>
            </Space>
          </div>

          <Row gutter={[24, 24]}>
            {/* Left Column */}
            <Col xs={24} lg={8}>
              {/* Profile Card */}
              <Card 
                style={{ borderRadius: 20, overflow: "hidden", border: "1px solid #e2e8f0", marginBottom: 24 }}
                styles={{ body: { padding: 0 } }}
              >
                <div style={{ height: 100, background: "#ef4444" }} />
                <div style={{ padding: "0 24px 32px", marginTop: -60, textAlign: "center" }}>
                  <Avatar 
                    size={120} 
                    icon={<UserOutlined />} 
                    src={profile?.avatar_url}
                    style={{ border: "4px solid #fff", backgroundColor: "#f1f5f9", color: "#94a3b8" }}
                  />
                  <Title level={3} style={{ margin: "16px 0 8px", fontWeight: 700 }}>
                    {profile?.first_name} {profile?.last_name}
                  </Title>
                  <Space size={8} style={{ marginBottom: 24 }}>
                    <Tag color="error" style={{ borderRadius: 6, fontWeight: 700, padding: "2px 10px" }}>{profile?.role}</Tag>
                    <Tag color="success" style={{ borderRadius: 6, fontWeight: 700, padding: "2px 10px", display: "flex", alignItems: "center", gap: 4 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#52c41a" }} /> Active
                    </Tag>
                  </Space>
                  
                  <Divider style={{ margin: "0 0 24px" }} />
                  
                  <Row gutter={24}>
                    <Col span={12}>
                      <Text style={{ display: "block", color: "#64748b", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Total Donations</Text>
                      <Title level={4} style={{ margin: 0, fontWeight: 800 }}>12</Title>
                    </Col>
                    <Col span={12}>
                      <Text style={{ display: "block", color: "#64748b", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Blood Type</Text>
                      <Title level={4} style={{ margin: 0, fontWeight: 800, color: "#ef4444" }}>O+</Title>
                    </Col>
                  </Row>
                </div>
              </Card>

              {/* Contact Information */}
              <Card 
                title={
                  <Space>
                    <IdcardOutlined />
                    <span>Contact Information</span>
                  </Space>
                }
                extra={<IdcardOutlined style={{ color: "#94a3b8" }} />}
                style={{ borderRadius: 20, border: "1px solid #e2e8f0" }}
                styles={{ header: { borderBottom: "none", padding: "24px 24px 0" }, body: { padding: 24 } }}
              >
                <div style={{ marginBottom: 20 }}>
                  <Text style={{ display: "block", color: "#64748b", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Email Address</Text>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontWeight: 600 }}>{profile?.email}</Text>
                    {profile?.email_verified && (
                      <Tag color="success" icon={<CheckCircleFilled />} style={{ borderRadius: 4, margin: 0, fontSize: 10, fontWeight: 700 }}>VERIFIED</Tag>
                    )}
                  </div>
                </div>
                <div>
                  <Text style={{ display: "block", color: "#64748b", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Phone Number</Text>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontWeight: 600 }}>{profile?.phone}</Text>
                    {profile?.phone_verified && (
                      <Tag color="success" icon={<CheckCircleFilled />} style={{ borderRadius: 4, margin: 0, fontSize: 10, fontWeight: 700 }}>VERIFIED</Tag>
                    )}
                  </div>
                </div>
              </Card>
            </Col>

            {/* Right Column */}
            <Col xs={24} lg={16}>
              {/* Account Details */}
              <Card 
                style={{ borderRadius: 20, border: "1px solid #e2e8f0", marginBottom: 24 }}
                styles={{ body: { padding: 32 } }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
                  <Title level={4} style={{ margin: 0, fontWeight: 700 }}>Account Details</Title>
                  <AuditOutlined style={{ fontSize: 20, color: "#94a3b8" }} />
                </div>
                
                <Row gutter={[48, 32]}>
                  <Col span={14}>
                    <Text style={{ display: "block", color: "#64748b", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>User Identifier (UUID)</Text>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", background: "#f8fafc", padding: "12px 16px", borderRadius: 10, border: "1px solid #e2e8f0" }}>
                      <Text code style={{ fontSize: 13, background: "transparent", border: "none", color: "#334155" }}>{profile?.id}</Text>
                      <Button type="text" icon={<CopyOutlined />} onClick={() => copyToClipboard(profile?.id || "")} size="small" style={{ color: "#94a3b8" }} />
                    </div>
                  </Col>
                  <Col span={10}>
                    <Text style={{ display: "block", color: "#64748b", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Registration Date</Text>
                    <Title level={5} style={{ margin: 0 }}>{dayjs(profile?.created_at).format("MMMM D, YYYY")}</Title>
                  </Col>
                  <Col span={14}>
                    <Text style={{ display: "block", color: "#64748b", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Last Activity</Text>
                    <Space>
                      <Title level={5} style={{ margin: 0 }}>{profile?.last_login_at ? dayjs(profile.last_login_at).format("MMMM D, YYYY") : "No login history"}</Title>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2dd4bf" }} />
                    </Space>
                  </Col>
                  <Col span={10}>
                    <Text style={{ display: "block", color: "#64748b", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Last Profile Update</Text>
                    <Title level={5} style={{ margin: 0 }}>{dayjs(profile?.updated_at).format("MMMM D, YYYY")}</Title>
                  </Col>
                </Row>
              </Card>

              <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col span={12}>
                  {/* Demographics */}
                  <Card 
                    title={
                      <Space>
                        <EnvironmentOutlined style={{ color: "#ef4444" }} />
                        <span>Demographics</span>
                      </Space>
                    }
                    style={{ borderRadius: 20, border: "1px solid #e2e8f0", height: "100%" }}
                    styles={{ header: { borderBottom: "none", padding: "24px 24px 0" }, body: { padding: 24 } }}
                  >
                    <div style={{ marginBottom: 20 }}>
                      <Text style={{ display: "block", color: "#64748b", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Date of Birth</Text>
                      <Text style={{ fontWeight: 500, color: profile?.date_of_birth ? "#1e293b" : "#94a3b8", fontStyle: profile?.date_of_birth ? "normal" : "italic" }}>
                        {profile?.date_of_birth ? dayjs(profile.date_of_birth).format("MMMM D, YYYY") : "Not provided"}
                      </Text>
                    </div>
                    <div>
                      <Text style={{ display: "block", color: "#64748b", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Physical Address</Text>
                      <Text style={{ fontWeight: 500, color: profile?.address ? "#1e293b" : "#94a3b8", fontStyle: profile?.address ? "normal" : "italic" }}>
                        {profile?.address ?? "Not provided"}
                      </Text>
                    </div>
                  </Card>
                </Col>
                <Col span={12}>
                  {/* Administrative Actions */}
                  <Card 
                    title={
                      <Space>
                        <MedicineBoxOutlined style={{ color: "#ef4444" }} />
                        <span>Administrative Actions</span>
                      </Space>
                    }
                    style={{ borderRadius: 20, border: "1px solid #e2e8f0", height: "100%" }}
                    styles={{ header: { borderBottom: "none", padding: "24px 24px 0" }, body: { padding: 24 } }}
                  >
                    <Space direction="vertical" style={{ width: "100%" }} size={12}>
                      <Button block style={{ height: 48, textAlign: "left", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>View Audit Logs</span>
                        <EditOutlined style={{ fontSize: 12, color: "#94a3b8" }} />
                      </Button>
                      <Button block style={{ height: 48, textAlign: "left", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>Export User Data</span>
                        <DownloadOutlined style={{ fontSize: 12, color: "#94a3b8" }} />
                      </Button>
                      <Button block danger type="text" style={{ height: 48, textAlign: "left", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fef2f2" }}>
                        <span style={{ fontWeight: 600 }}>Deactivate Account</span>
                        <StopOutlined style={{ fontSize: 14 }} />
                      </Button>
                    </Space>
                  </Card>
                </Col>
              </Row>

              {/* Recent Donations */}
              <Card 
                title="Recent Donations"
                extra={<Button type="link" danger style={{ fontWeight: 700 }}>View All</Button>}
                style={{ borderRadius: 20, border: "1px solid #e2e8f0" }}
                styles={{ header: { borderBottom: "none", padding: "24px 24px 0" }, body: { padding: "12px 0" } }}
              >
                <Table 
                  pagination={false}
                  columns={[
                    { title: "REFERENCE", dataIndex: "ref", key: "ref", render: (t) => <Text strong>{t}</Text> },
                    { title: "CENTER", dataIndex: "center", key: "center" },
                    { title: "DATE", dataIndex: "date", key: "date" },
                    { title: "STATUS", dataIndex: "status", key: "status", render: (s) => (
                      <Tag color="success" style={{ borderRadius: 6, fontWeight: 800, padding: "2px 8px" }}>{s}</Tag>
                    )}
                  ]}
                  dataSource={[
                    { key: "1", ref: "#DON-9821", center: "City General Hospital", date: "Apr 25, 2026", status: "COMPLETED" },
                    { key: "2", ref: "#DON-9745", center: "BloodConnect Central", date: "Jan 12, 2026", status: "COMPLETED" },
                  ]}
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>

      <style jsx global>{`
        .ant-table-thead > tr > th {
          background: transparent !important;
          color: #64748b !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          border-bottom: 1px solid #f1f5f9 !important;
        }
        .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f1f5f9 !important;
          padding: 16px 24px !important;
        }
        .ant-breadcrumb-link {
          color: #94a3b8 !important;
          font-weight: 600 !important;
        }
        .ant-breadcrumb-separator {
          color: #cbd5e1 !important;
        }
      `}</style>
    </Layout>
  );
}
