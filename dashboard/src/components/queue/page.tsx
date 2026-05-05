"use client";

import { useEffect, useState, useCallback } from "react";
import { Layout, ConfigProvider, Typography, message, Empty } from "antd";
import { useRouter } from "next/navigation";
import SideNavBar from "../side-navBar";
import TopAppBar from "../top-bar";
import QueueStatsBar from "./queue-stats-bar";
import QueueTable from "./queue-table";
import { QueueEntry } from "@/src/types/dashboard";
import { getQueue, completeQueue, skipQueue } from "@/src/features/queue/queue.api";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function QueuePage() {
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchQueue = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getQueue();
      setQueue(data || []);
    } catch (error: any) {
      console.error("Failed to fetch donation queue:", error);
      const errorMsg = error.response?.data?.message || "Failed to load real-time queue data";
      message.error(errorMsg);
      setQueue([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQueue();
  }, [fetchQueue]);

  const handleComplete = async (id: string) => {
    try {
      await completeQueue(id);
      message.success("Donation completed successfully");
      fetchQueue();
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to complete donation";
      message.error(errorMsg);
    }
  };

  const handleSkip = async (id: string) => {
    try {
      await skipQueue(id);
      message.success("Donor skipped successfully");
      fetchQueue();
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to skip donor";
      message.error(errorMsg);
    }
  };

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
            loading={loading}
            onComplete={handleComplete}
            onSkip={handleSkip}
            onRefresh={fetchQueue}
          />

          {!loading && queue.length === 0 && (
            <div style={{ marginTop: 64 }}>
              <Empty 
                description={
                  <Text style={{ color: '#94a3b8', fontSize: 16 }}>
                    No donors currently in the waiting queue.
                  </Text>
                } 
              />
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}
