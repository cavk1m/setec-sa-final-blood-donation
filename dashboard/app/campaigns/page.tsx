"use client";

import { useState } from "react";
import {
  Layout,
  Button,
  Typography,
  Space,
  ConfigProvider,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import SideNavBar from "@/src/components/side-navBar";
import CampaignStatsBar from "@/src/components/campaign/campaign-stats-bar";
import CampaignGrid from "@/src/components/campaign/campaign-grid";

const { Header, Content } = Layout;
const { Title } = Typography;

type FilterTab = "all" | "active" | "completed";

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

export default function CampaignsPage() {
  const [activeMenu, setActiveMenu] = useState("campaigns");
  const [filter, setFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ef4444",
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

        <Layout style={{ marginLeft: 280 }}>
          {/* Top bar */}
          <Header
            style={{
              background: "rgba(249,249,255,0.85)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid #e3e8f9",
              padding: "0 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "sticky",
              top: 0,
              zIndex: 100,
              height: 64,
            }}
          >
            {/* Left — title + tab filter */}
            <Space size={16} align="center">
              <Title
                level={4}
                style={{ margin: 0, fontWeight: 800, letterSpacing: "-0.5px" }}
              >
                Campaigns
              </Title>
              <div style={{ width: 1, height: 20, background: "#e3e8f9" }} />
              {/* Tab pills */}
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  background: "#f1f3ff",
                  borderRadius: 10,
                  padding: 4,
                }}
              >
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key)}
                    style={{
                      padding: "6px 16px",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: 13,
                      background: filter === tab.key ? "#fff" : "transparent",
                      color: filter === tab.key ? "#ef4444" : "#5d5c74",
                      borderBottom:
                        filter === tab.key
                          ? "2px solid #ef4444"
                          : "2px solid transparent",
                      transition: "all 0.15s",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </Space>

            {/* Right — Create Campaign (circle FAB style like overview) */}
            <Space size={12}>
              <Button
                type="primary"
                shape="circle"
                size="large"
                icon={<PlusOutlined style={{ fontSize: 20 }} />}
                title="Create Campaign"
                style={{
                  background: "#ef4444",
                  borderColor: "#ef4444",
                  width: 44,
                  height: 44,
                  boxShadow: "0 4px 12px rgba(181,24,34,0.3)",
                }}
              />
            </Space>
          </Header>

          <Content style={{ padding: 32, background: "#f9f9ff" }}>
            {/* Stats + search */}
            <CampaignStatsBar onSearch={setSearchQuery} />

            {/* Campaign cards */}
            <CampaignGrid filter={filter} searchQuery={searchQuery} />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
