"use client";

import { useState } from "react";
import { Layout, ConfigProvider } from "antd";
import { useRouter } from "next/navigation";
import SideNavBar from "../side-navBar";
import TopAppBar from "../top-bar";
import QueueStatsBar from "./queue-stats-bar";
import QueueTable from "./queue-table";
import { QueueEntry } from "@/src/types/dashboard";

// import type { QueueEntry } from '@/types/dashboard';

const { Content } = Layout;

const MOCK_QUEUE: QueueEntry[] = [
  {
    id: "1",
    queue_number: 1,
    created_at: "2026-03-23T09:00:00",
    survey_score: 4,
    status: "waiting",
    user: { full_name: "Sophea Chan", blood_type: "A+" },
  },
  {
    id: "2",
    queue_number: 2,
    created_at: "2026-03-23T09:15:00",
    survey_score: 3,
    status: "in-progress",
    user: { full_name: "Ratanak Lim", blood_type: "O-" },
  },
  {
    id: "3",
    queue_number: 3,
    created_at: "2026-03-23T09:30:00",
    survey_score: 5,
    status: "waiting",
    user: { full_name: "Bopha Srey", blood_type: "B+" },
  },
  {
    id: "4",
    queue_number: 4,
    created_at: "2026-03-23T08:45:00",
    survey_score: 4,
    status: "completed",
    user: { full_name: "Dara Pich", blood_type: "AB+" },
  },
  {
    id: "5",
    queue_number: 5,
    created_at: "2026-03-23T09:45:00",
    survey_score: 2,
    status: "waiting",
    user: { full_name: "Kunthea Meas", blood_type: "O+" },
  },
];

export default function QueuePage() {
  const [activeMenu, setActiveMenu] = useState("queue");
  const [queue, setQueue] = useState(MOCK_QUEUE);
  const router = useRouter();

  const handleComplete = (id: string) =>
    setQueue((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, status: "completed" as const } : q,
      ),
    );

  const handleSkip = (id: string) =>
    setQueue((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "skip" as const } : q)),
    );

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
          <TopAppBar />
          <Content style={{ padding: 32, background: "#f1f3ff" }}>
            <QueueStatsBar />
            <QueueTable
              data={queue}
              onComplete={handleComplete}
              onSkip={handleSkip}
            />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
