"use client";

import { useState } from "react";
import { Layout, Typography, ConfigProvider } from "antd";
import SideNavBar from "@/src/components/side-navBar";
import UsersTable from "@/src/components/users/users-table";
import { useRouter } from "next/navigation";

const { Content, Header } = Layout;
const { Title } = Typography;

export default function UsersPage() {
  const [activeMenu, setActiveMenu] = useState("users");
  const router = useRouter();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#b51822",
          colorBgContainer: "#ffffff",
          colorBgLayout: "#f9f9ff",
          colorBorder: "#e3e8f9",
          colorText: "#161c27",
          colorTextSecondary: "#5d5c74",
          borderRadius: 8,
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <SideNavBar
          activeKey={activeMenu}
          onMenuClick={(key) => {
            if (key === "overview") {
              router.push("/");
              return;
            }
            if (key === "queue") {
              router.push("/queue");
              return;
            }
            if (key === "locations") {
              router.push("/locations");
              return;
            }
            if (key === "certificates") {
              router.push("/certificates");
              return;
            }
            if (key === "campaigns") {
              router.push("/campaigns");
              return;
            }
            if (key === "users") {
              router.push("/users");
              return;
            }
            if (key === "settings") {
              router.push("/settings");
              return;
            }
            setActiveMenu(key);
          }}
        />

        <Layout style={{ marginLeft: 260 }}>
          <Header
            style={{
              background: "rgba(249,249,255,0.85)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid #e3e8f9",
              padding: "0 32px",
              display: "flex",
              alignItems: "center",
              position: "sticky",
              top: 0,
              zIndex: 100,
              height: 64,
            }}
          >
            <Title
              level={4}
              style={{ margin: 0, fontWeight: 800, letterSpacing: "-0.5px" }}
            >
              Users
            </Title>
          </Header>

          <Content style={{ padding: 32, background: "#f9f9ff" }}>
            <UsersTable />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
