"use client";

import { useState } from "react";
import { Layout, Typography, ConfigProvider } from "antd";
import SettingsSideNav from "@/src/components/settings/settings-side-mav";
import WebsiteBranding from "@/src/components/settings/website-branding";
import AdministrativeIdentity from "@/src/components/settings/administrative-Identity";
import SecurityProtocol from "@/src/components/settings/security-protocol";
import TwoFactorCard from "@/src/components/settings/two-factor-card";
import SideNavBar from "@/src/components/side-navBar";
import TopAppBar from "@/src/components/top-bar";
import ActionButton from "@/src/components/ui/action-button";
import AppButton from "@/src/components/ui/app-button";

import { useRouter } from "next/navigation";

const { Content } = Layout;
const { Title, Text } = Typography;

type SettingsSection = "website" | "identity" | "security";

export default function SettingsPage() {
  const [activeMenu, setActiveMenu] = useState("settings");
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("website");
  const router = useRouter();

  const scrollTo = (key: SettingsSection) => {
    setActiveSection(key);
    document
      .getElementById(key)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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

          <Content
            style={{
              padding: 48,
              background: "#f9f9ff",
              maxWidth: 1100,
              width: "100%",
              margin: "0 auto",
            }}
          >
            {/* Page header */}
            <div style={{ marginBottom: 40 }}>
              <Title
                level={2}
                style={{
                  margin: "0 0 6px",
                  fontWeight: 800,
                  letterSpacing: "-1px",
                }}
              >
                Settings
              </Title>
              <Text style={{ color: "#5d5c74", fontSize: 14 }}>
                Configure global administrative parameters and security
                protocols.
              </Text>
            </div>

            {/* Two-col layout */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                gap: 32,
                alignItems: "start",
              }}
            >
              {/* Inner sidebar — sticky */}
              <div style={{ position: "sticky", top: 80 }}>
                <SettingsSideNav active={activeSection} onChange={scrollTo} />
              </div>

              {/* Sections */}
              <div>
                <WebsiteBranding />
                <AdministrativeIdentity />
                <SecurityProtocol />
                <TwoFactorCard />

                {/* Footer */}
                <div
                  style={{
                    marginTop: 48,
                    paddingTop: 24,
                    borderTop: "1px solid #e3e8f9",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                      }}
                    >
                      © 2024 BloodConnect Clinical Pulse
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                      }}
                    >
                      v4.2.0 Stable Build
                    </Text>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <ActionButton
                      variant="custom"
                      size="sm"
                      label="Privacy Policy"
                      style={{
                        background: "transparent",
                        border: "none",
                        padding: 0,
                        height: "auto",
                        boxShadow: "none",
                        borderRadius: 0,
                        color: "#5d5c74",
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    />
                    <ActionButton
                      variant="custom"
                      size="sm"
                      label="Audit Logs"
                      style={{
                        background: "transparent",
                        border: "none",
                        padding: 0,
                        height: "auto",
                        boxShadow: "none",
                        borderRadius: 0,
                        color: "#5d5c74",
                        fontWeight: 600,
                        fontSize: 12,
                      }}
                    />
                    <AppButton
                      variant="warning"
                      size="sm"
                      label="🎧 Get Support"
                      style={{
                        borderRadius: 8,
                        fontWeight: 700,
                        background: "#ffdad7",
                        borderColor: "#ffdad7",
                        color: "#b51822",
                        fontSize: 12,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
