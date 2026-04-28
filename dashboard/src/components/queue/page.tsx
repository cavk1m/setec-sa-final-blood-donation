"use client";

import { useState } from "react";
import { Layout, ConfigProvider, Typography } from "antd";
import { useRouter } from "next/navigation";
import SideNavBar from "../side-navBar";
import TopAppBar from "../top-bar";
import QueueStatsBar from "./queue-stats-bar";
import QueueTable from "./queue-table";
import { QueueEntry } from "@/src/types/dashboard";

const { Content } = Layout;
const { Title, Text } = Typography;

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

const QUEUE_MOCK = {
  queue: [
    {
      id: "queue-uuid-5678",
      queue_number: 21,
      status: "waiting",
      survey_score: 3,
      user: {
        id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        full_name: "Sophea Chan",
        blood_type: "A+",
      },
      created_at: "2026-03-13T09:30:00Z",
    },
    {
      id: "queue-uuid-9999",
      queue_number: 22,
      status: "waiting",
      survey_score: 2,
      user: {
        id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
        full_name: "Dara Keo",
        blood_type: "O+",
      },
      created_at: "2026-03-13T09:45:00Z",
    },
  ],
};

const UPDATE_QUEUE_MOCK = {
  message: "Donation completed successfully",
  donation: {
    id: "donation-uuid-1111",
    user_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    donation_date: "2026-03-13",
  },
  certificate: {
    id: "cert-uuid-2222",
    certificate_number: "CERT-2026-00021",
    issued_date: "2026-03-13",
    pdf_url: "",
  },
};

const SKIP_QUEUE_MOCK = {
  message: "Donor skipped",
  queue: {
    id: "queue-uuid-5678",
    queue_number: 21,
    status: "skip",
  },
};

export default function QueuePage() {
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
    <Layout style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <SideNavBar activeKey="queue" />
      <Layout style={{ marginLeft: 280, background: 'transparent' }}>
        <TopAppBar />
        <Content style={{ padding: '32px 48px', minHeight: 280 }}>
          <div style={{ marginBottom: 32 }}>
            <Title level={2} style={{ margin: 0, fontWeight: 800, letterSpacing: '-0.03em' }}>Donation Queue</Title>
            <Text style={{ color: 'rgba(0,0,0,0.45)', fontSize: 15 }}>Monitor and manage real-time donor check-ins.</Text>
          </div>
          
          <QueueStatsBar />
          <QueueTable
            data={queue}
            onComplete={handleComplete}
            onSkip={handleSkip}
          />
        </Content>
      </Layout>
    </Layout>
  );
}
