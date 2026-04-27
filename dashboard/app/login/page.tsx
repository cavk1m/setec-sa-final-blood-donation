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
          colorPrimary: "#ffffff",
          colorBgContainer: "#12121b",
          colorBgLayout: "#0a0a0b",
          colorBorder: "rgba(255,255,255,0.1)",
          colorText: "#ffffff",
          colorTextSecondary: "rgba(255,255,255,0.5)",
          borderRadius: 12,
          fontFamily: "'Inter', sans-serif",
        },
      }}
    >
      <div
        style={{
          minHeight: "100vh",
          background: "#0a0a0b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background glow */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100vw", height: "100vh", background: "radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <AuthForm />
      </div>
    </ConfigProvider>
  );
}
