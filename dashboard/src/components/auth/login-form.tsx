"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  Input,
  Button,
  Typography,
  Alert,
} from "antd";
import {
  ArrowLeftOutlined,
  UserOutlined,
  GoogleOutlined,
  FacebookFilled,
  AppleFilled,
  SafetyOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { loginUser, forgotPassword, resetPassword } from "@/src/features/auth/auth.api";

const { Title, Text, Link } = Typography;

type View = "login" | "register" | "forgot-password" | "otp-verify" | "new-password" | "success";

export default function AuthForm() {
  const router = useRouter();
  const [view, setView] = useState<View>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // State for reset password flow
  const [resetEmail, setResetEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");

  // State for individual OTP digit boxes
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [resendTimer, setResendTimer] = useState(0);

  // Timer for OTP resend
  const startResendTimer = useCallback(() => {
    setResendTimer(60);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const handleOtpDigitChange = useCallback(
    (index: number, value: string) => {
      // Only allow single digit
      const digit = value.replace(/\D/g, "").slice(-1);
      const newDigits = [...otpDigits];
      newDigits[index] = digit;
      setOtpDigits(newDigits);
      // Auto-advance
      if (digit && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
    },
    [otpDigits]
  );

  const handleOtpKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (otpDigits[index]) {
          const newDigits = [...otpDigits];
          newDigits[index] = "";
          setOtpDigits(newDigits);
        } else if (index > 0) {
          otpRefs.current[index - 1]?.focus();
          const newDigits = [...otpDigits];
          newDigits[index - 1] = "";
          setOtpDigits(newDigits);
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        otpRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
    },
    [otpDigits]
  );

  const handleOtpPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
      if (!pasted) return;
      const newDigits = [...otpDigits];
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pasted[i] ?? "";
      }
      setOtpDigits(newDigits);
      const focusIndex = Math.min(pasted.length, 5);
      otpRefs.current[focusIndex]?.focus();
    },
    [otpDigits]
  );

  const handleOtpSubmit = async () => {
    const code = otpDigits.join("");
    if (code.length < 6) return;
    // Store the code and move to next step.
    // The actual OTP validation (correct vs incorrect) happens when the user submits
    // the new password via the reset-password endpoint.
    setOtpCode(code);
    setView("new-password");
  };

  const handleLogin = async (values: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser(values.email, values.password);
      const token: string = response.token ?? response.accessToken ?? response.access_token ?? "";
      if (token) {
        document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      }
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || err.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };



  const handleForgotPassword = async (values: any) => {
    setLoading(true);
    setError(null);
    try {
      await forgotPassword(values.email);
      setResetEmail(values.email);
      setView("otp-verify");
      startResendTimer();
      setSuccessMessage("OTP code has been sent to your email.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Request failed. Please check your email and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (values: any) => {
    setLoading(true);
    // Simple local validation for now, as the API resetPassword needs OTP + New Password together
    // In a real flow, you might have a verify-otp endpoint, but we'll proceed to password entry
    setOtpCode(values.otp);
    setView("new-password");
    setLoading(false);
  };

  const handleResetPassword = async (values: any) => {
    setLoading(true);
    setError(null);
    try {
      await resetPassword(resetEmail, otpCode, values.password);
      setSuccessMessage("Password has been reset successfully. You can now sign in with your new password.");
      setView("success");
      
      // Navigate to login after 3 seconds
      setTimeout(() => {
        setView("login");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="auth-card"
      style={{
        width: "100%",
        maxWidth: (view === "register" || view === "new-password") ? 520 : 440,
        animation: "fadeSlideIn 0.5s ease",
        background: "#ffffff",
        padding: "48px 40px",
        borderRadius: "32px",
        boxShadow: "0 20px 60px rgba(15, 23, 42, 0.08)",
        position: "relative",
        overflow: "hidden",
        border: "1px solid #e2e8f0",
      }}
    >
      {/* Peeled Corner Effect */}
      <div className="peeled-corner" />

      {view === "login" && (
        <>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 24, color: "#a10006" }}>
              <UserOutlined />
            </div>
            <Title level={2} style={{ color: "#0b1c30", margin: "0 0 4px", fontWeight: 700, fontSize: 28 }}>Welcome Back</Title>
            <Text style={{ color: "#64748b", fontSize: 14 }}>Please enter your info to sign in to BloodConnect</Text>
          </div>
          <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
            <Button block icon={<GoogleOutlined style={{ color: "#4285F4" }} />} style={{ background: "#ffffff", border: "1px solid #e2e8f0", height: 44, borderRadius: 12, color: "#0b1c30" }} />
            <Button block icon={<FacebookFilled style={{ color: "#1877F2" }} />} style={{ background: "#ffffff", border: "1px solid #e2e8f0", height: 44, borderRadius: 12, color: "#0b1c30" }} />
            <Button block icon={<AppleFilled style={{ color: "#000" }} />} style={{ background: "#ffffff", border: "1px solid #e2e8f0", height: 44, borderRadius: 12, color: "#0b1c30" }} />
          </div>
          {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 24, background: "#fef2f2", border: "1px solid #fee2e2", color: "#991b1b" }} />}
          <Form layout="vertical" onFinish={handleLogin} requiredMark={false} size="large">
            <Form.Item name="email" label={<Text style={{ color: "#0b1c30", fontWeight: 600, fontSize: 14 }}>Email Address</Text>} rules={[{ required: true, type: "email" }]}>
              <Input placeholder="Enter your email.." style={{ background: "#ffffff", border: "1px solid #e2e8f0", color: "#0b1c30", height: 48, borderRadius: 12 }} />
            </Form.Item>
            <Form.Item name="password" label={<Text style={{ color: "#0b1c30", fontWeight: 600, fontSize: 14 }}>Password</Text>} rules={[{ required: true }]} style={{ marginBottom: 8 }}>
              <Input placeholder="**********" style={{ background: "#ffffff", border: "1px solid #e2e8f0", color: "#0b1c30", height: 48, borderRadius: 12 }} />
            </Form.Item>
            <div style={{ textAlign: "right", marginBottom: 32 }}>
              <Link onClick={() => setView("forgot-password")} style={{ color: "#a10006", fontSize: 13 }}>Forgot Password?</Link>
            </div>
            <Button className="sign-in-button" type="primary" htmlType="submit" loading={loading} block style={{ height: 48, borderRadius: 12, background: "#a10006", border: "none", color: "#ffffff", fontWeight: 600, fontSize: 16 }}>Sign in</Button>
          </Form>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Text style={{ color: "#64748b", fontSize: 14 }}>Don&apos;t have an account yet? </Text>
            <Link onClick={() => setView("register")} style={{ color: "#a10006", fontWeight: 700, fontSize: 14 }}>Sign up</Link>
          </div>
        </>
      )}

      {view === "forgot-password" && (
        <>
          <Link onClick={() => setView("login")} style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", marginBottom: 32 }}>
            <ArrowLeftOutlined /> Back to sign in
          </Link>
          <Title level={2} style={{ color: "#0b1c30", margin: "0 0 12px", fontWeight: 700 }}>Reset Password</Title>
          <Text style={{ color: "#64748b", display: "block", marginBottom: 32 }}>Enter your email to receive an OTP code</Text>
          {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 24, background: "#fef2f2", border: "1px solid #fee2e2", color: "#991b1b" }} />}
          <Form layout="vertical" onFinish={handleForgotPassword} requiredMark={false} size="large">
            <Form.Item name="email" label={<Text style={{ color: "#0b1c30" }}>Email Address</Text>} rules={[{ required: true, type: "email" }]}>
              <Input placeholder="Enter your email.." style={{ background: "#ffffff", border: "1px solid #e2e8f0", color: "#0b1c30", height: 48, borderRadius: 12 }} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block style={{ height: 48, borderRadius: 12, background: "#a10006", color: "#fff", border: "none", fontWeight: 700, marginTop: 12 }}>Send OTP</Button>
          </Form>
        </>
      )}

      {view === "otp-verify" && (
        <>
          <Link onClick={() => setView("forgot-password")} style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", marginBottom: 32 }}>
            <ArrowLeftOutlined /> Back to email
          </Link>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "#f1f5f9",
              border: "1px solid #e2e8f0",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px", fontSize: 28,
            }}>
              <SafetyOutlined style={{ color: "#a10006" }} />
            </div>
            <Title level={2} style={{ color: "#0b1c30", margin: "0 0 8px", fontWeight: 700, fontSize: 26 }}>Check your email</Title>
            <Text style={{ color: "#64748b", fontSize: 14, display: "block" }}>
              We sent a 6-digit code to
            </Text>
            <Text style={{ color: "#0b1c30", fontSize: 14, fontWeight: 600 }}>
              {resetEmail}
            </Text>
          </div>

          {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 20, background: "#fef2f2", border: "1px solid #fee2e2", color: "#991b1b" }} />}

          {/* Individual OTP digit boxes */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 28 }}>
            {otpDigits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { otpRefs.current[i] = el; }}
                id={`otp-digit-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpDigitChange(i, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                onPaste={handleOtpPaste}
                onFocus={(e) => e.target.select()}
                className="otp-digit-box"
                style={{
                  width: 48, height: 56,
                  borderRadius: 14,
                  border: `1.5px solid ${digit ? "#a10006" : "#e2e8f0"}`,
                  background: digit ? "#fff5f5" : "#ffffff",
                  color: "#0b1c30",
                  fontSize: 22,
                  fontWeight: 700,
                  textAlign: "center",
                  outline: "none",
                  caretColor: "transparent",
                  transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
                  cursor: "text",
                }}
              />
            ))}
          </div>

          {/* Timer / expiry hint */}
          <Text style={{ color: "#64748b", fontSize: 12, display: "block", textAlign: "center", marginBottom: 20 }}>
            Code expires in 10 minutes
          </Text>

          <Button
            type="primary"
            loading={loading}
            onClick={handleOtpSubmit}
            disabled={otpDigits.join("").length < 6}
            block
            style={{
              height: 48, borderRadius: 14,
              background: otpDigits.join("").length === 6 ? "#a10006" : "#f1f5f9",
              color: otpDigits.join("").length === 6 ? "#fff" : "#94a3b8",
              border: "none", fontWeight: 700, fontSize: 15,
              transition: "all 0.3s ease",
              boxShadow: otpDigits.join("").length === 6 ? "0 4px 24px rgba(161, 0, 6, 0.2)" : "none",
            }}
          >
            Verify Code
          </Button>

          <div style={{ textAlign: "center", marginTop: 20 }}>
              <Text style={{ color: "#64748b", fontSize: 13 }}>Didn&apos;t receive the code? </Text>
              {resendTimer > 0 ? (
                <Text style={{ color: "#0b1c30", fontSize: 13, fontWeight: 600 }}>Resend in {resendTimer}s</Text>
              ) : (
                <Link
                  onClick={() => {
                    setOtpDigits(["", "", "", "", "", ""]);
                    handleForgotPassword({ email: resetEmail });
                  }}
                  style={{ color: "#a10006", fontWeight: 600, fontSize: 13 }}
                >
                  Resend
                </Link>
              )}
          </div>
        </>
      )}

      {view === "new-password" && (
        <>
          <Link onClick={() => setView("otp-verify")} style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", marginBottom: 32 }}>
            <ArrowLeftOutlined /> Back to OTP
          </Link>
          <Title level={2} style={{ color: "#0b1c30", margin: "0 0 12px", fontWeight: 700 }}>New Password</Title>
          <Text style={{ color: "#64748b", display: "block", marginBottom: 32 }}>Set a new secure password for your account</Text>
          {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 24, background: "#fef2f2", border: "1px solid #fee2e2", color: "#991b1b" }} />}
          <Form layout="vertical" onFinish={handleResetPassword} requiredMark={false} size="large">
            <Form.Item name="password" label={<Text style={{ color: "#0b1c30" }}>New Password</Text>} rules={[{ required: true, min: 6 }]}>
              <Input placeholder="••••••••" style={{ background: "#ffffff", border: "1px solid #e2e8f0", color: "#0b1c30", height: 48, borderRadius: 12 }} />
            </Form.Item>
           
            <Button type="primary" htmlType="submit" loading={loading} block style={{ height: 48, borderRadius: 12, background: "#a10006", color: "#fff", border: "none", fontWeight: 700, marginTop: 12 }}>Update Password</Button>
          </Form>
        </>
      )}

      {view === "success" && (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <CheckCircleOutlined style={{ fontSize: 64, color: "#52c41a", marginBottom: 24 }} />
          <Title level={2} style={{ color: "#0b1c30", fontWeight: 700, margin: "0 0 12px" }}>Success!</Title>
          <Text style={{ display: "block", color: "#64748b", fontSize: 16, marginBottom: 12 }}>{successMessage}</Text>
          <Text style={{ display: "block", color: "#94a3b8", fontSize: 14, marginBottom: 24 }}>Redirecting to login in 3 seconds...</Text>
          <Button type="primary" size="large" onClick={() => setView("login")} block style={{ height: 48, borderRadius: 12, background: "#a10006", color: "#fff", border: "none", fontWeight: 700 }}>Return to sign in</Button>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .peeled-corner {
          position: absolute;
          top: 0;
          right: 0;
          width: 80px;
          height: 80px;
          background: linear-gradient(225deg, transparent 50%, rgba(161, 0, 6, 0.05) 50%, rgba(161, 0, 6, 0.02) 100%);
          clip-path: polygon(0 0, 100% 100%, 100% 0);
          pointer-events: none;
        }
        .peeled-corner::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background: #ffffff;
          clip-path: polygon(0 0, 100% 100%, 0 100%);
          box-shadow: -5px 5px 15px rgba(0,0,0,0.05);
          transform: translate(2px, -2px);
        }
        .sign-in-button:hover {
          background: #820005 !important;
          box-shadow: 0 8px 24px rgba(161, 0, 6, 0.25) !important;
        }
        .ant-input::placeholder {
          color: #94a3b8 !important;
        }
        .otp-digit-box:focus {
          border-color: #a10006 !important;
          background: #fff5f5 !important;
          box-shadow: 0 0 0 3px rgba(161, 0, 6, 0.08), 0 0 20px rgba(161, 0, 6, 0.05) !important;
        }
        .otp-digit-box:not(:placeholder-shown) {
          animation: digitPop 0.15s ease;
        }
        @keyframes digitPop {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.12); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
