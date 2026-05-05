"use client";

import { useState } from "react";
import { Layout, Typography, ConfigProvider } from "antd";
import SideNavBar from "@/src/components/side-navBar";
import UsersTable from "@/src/components/users/users-table";
import { useRouter } from "next/navigation";

const { Content, Header } = Layout;
const { Title, Text } = Typography;

import TopAppBar from "@/src/components/top-bar";

export default function UsersPage() {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <SideNavBar activeKey="users" />
      <Layout style={{ marginLeft: 280, background: 'transparent' }}>
        <TopAppBar />
        <Content style={{ padding: '32px 48px', minHeight: 280 }}>
          <div style={{ marginBottom: 32 }}>
            <Title level={2} style={{ margin: 0, fontWeight: 800, letterSpacing: '-0.03em' }}>User Directory</Title>
            <Text style={{ color: 'rgba(0,0,0,0.45)', fontSize: 15 }}>Manage platform administrators, donors, and organizations.</Text>
          </div>

          <UsersTable />
        </Content>
      </Layout>
    </Layout>
  );
}
