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
const { Title, Text } = Typography;

type FilterTab = "all" | "active" | "completed";

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

import TopAppBar from "@/src/components/top-bar";

export default function CampaignsPage() {
  const [filter, setFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <SideNavBar activeKey="campaigns" />
      <Layout style={{ marginLeft: 280, background: 'transparent' }}>
        <TopAppBar />
        <Content style={{ padding: '32px 48px', minHeight: 280 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <div>
              <Title level={2} style={{ margin: 0, fontWeight: 800, letterSpacing: '-0.03em' }}>Fundraising Campaigns</Title>
              <Text style={{ color: 'rgba(0,0,0,0.45)', fontSize: 15 }}>Track and manage charity drives and donation goals.</Text>
            </div>
            
            {/* Tab pills */}
            <div
              style={{
                display: "flex",
                gap: 4,
                background: "rgba(0,0,0,0.04)",
                borderRadius: 12,
                padding: 4,
              }}
            >
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  style={{
                    padding: "8px 24px",
                    borderRadius: 9,
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 13,
                    background: filter === tab.key ? "#fff" : "transparent",
                    color: filter === tab.key ? "#ef4444" : "rgba(0,0,0,0.45)",
                    boxShadow: filter === tab.key ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
                    transition: "all 0.15s",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <CampaignStatsBar onSearch={setSearchQuery} />
          <CampaignGrid filter={filter} searchQuery={searchQuery} />
        </Content>
      </Layout>
    </Layout>
  );
}
