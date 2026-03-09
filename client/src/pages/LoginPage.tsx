
import React, { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useUIStore } from "@/store/ui.store";
import { loginUser, validateOtp } from "@/services/api/auth/AuthService";

export const LoginPage: React.FC = () => {
  const isPasswordDone = useAuthStore((s) => s.isPasswordDone);
  const setPasswordSuccess = useAuthStore((s) => s.setPasswordSuccess);
  const setLoginSuccess = useAuthStore((s) => s.setLoginSuccess);
  
  const pushNotification = useUIStore((s) => s.pushNotification);

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordLogin = async () => {
    setLoading(true);
    try {
      const response = await loginUser("AMITH1", "abc@12345");
      console.log("Login successful:", response);
      setPasswordSuccess(); 
      
      pushNotification("Password Verified. Enter OTP", "success");
    } catch (err) {
      console.error("Login Error:", err);
      pushNotification("Login Failed: Invalid Credentials", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    if (otp !== "1234") {
      pushNotification("Invalid Security Code", "error");
      return;
    }
    setLoading(true);
    try {
      const data = await validateOtp("AMITH1", 1234);
      setLoginSuccess(data);
      pushNotification("Access Granted", "success");
    } catch (err) {
      pushNotification("OTP Verification Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={loginStyles.container}>
      <div style={loginStyles.card}>
        <div style={loginStyles.header}>
          <h2 style={loginStyles.title}>
            {!isPasswordDone ? "System Login" : "Operator Auth"}
          </h2>
          <p style={loginStyles.id}>ID: AMITH1</p>
        </div>

        {!isPasswordDone ? (
          <div key="password-view">
            <div style={loginStyles.infoBox}>User: AMITH1 <br/> Pass: abc@12345</div>
            <button 
              onClick={handlePasswordLogin} 
              disabled={loading} 
              style={{...loginStyles.button, cursor: loading ? "not-allowed" : "pointer"}}
            >
              {loading ? "AUTHENTICATING..." : "VERIFY PASSWORD"}
            </button>
          </div>
        ) : (
          <div key="otp-view">
            <input
              type="password"
              maxLength={4}
              placeholder="ENTER OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={loginStyles.input}
              autoFocus
            />
            <button 
              onClick={handleOtpVerify} 
              disabled={loading} 
              style={{...loginStyles.button, cursor: loading ? "not-allowed" : "pointer"}}
            >
              {loading ? "VALIDATING..." : "VERIFY SESSION"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
const loginStyles = {
  container: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#000" },
  card: { width: "320px", padding: "30px", border: "1px solid #333", background: "#0a0a0a", textAlign: "center" as const },
  header: { marginBottom: "30px" },
  title: { color: "#fff", letterSpacing: "2px", fontSize: "18px", margin: 0 },
  id: { color: "#666", fontSize: "10px", marginTop: "5px", fontFamily: "monospace" },
  infoBox: { background: "#111", padding: "10px", color: "#555", fontSize: "11px", marginBottom: "20px", border: "1px dashed #222" },
  input: { width: "100%", padding: "15px", background: "#111", border: "1px solid #222", color: "#00ff00", textAlign: "center" as const, fontSize: "20px", letterSpacing: "10px", outline: "none", marginBottom: "20px" },
  button: { width: "100%", padding: "12px", background: "#fff", color: "#000", fontWeight: "bold", border: "none", cursor: "pointer", fontSize: "12px", letterSpacing: "1px" }
};