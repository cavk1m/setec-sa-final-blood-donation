import { ConfigProvider } from "antd";
import AuthForm from "@/src/components/auth/login-form";

export const metadata = {
  title: "Sign In — BloodConnect Admin",
  description: "Sign in to the BloodConnect clinical dashboard.",
};

export default function LoginPage() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#a10006",
          colorBgContainer: "#ffffff",
          colorBgLayout: "#f8f9ff",
          colorBorder: "#e2e8f0",
          colorText: "#0b1c30",
          colorTextSecondary: "#64748b",
          borderRadius: 16,
          fontFamily: "'Inter', sans-serif",
        },
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          background: "#f8f9ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background glow */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100vw", height: "100vh", background: "radial-gradient(circle at center, rgba(161, 0, 6, 0.03) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <AuthForm />
      </div>
    </ConfigProvider>
  );
}
