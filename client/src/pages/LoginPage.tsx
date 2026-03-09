import React, { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useUIStore } from "@/store/ui.store";
import { loginUser, validateOtp } from "@/services/api/auth/AuthService";

export const LoginPage: React.FC = () => {
  // Store selectors
  const isPasswordDone = useAuthStore((s) => s.isPasswordDone);
  const setPasswordSuccess = useAuthStore((s) => s.setPasswordSuccess);
  const setLoginSuccess = useAuthStore((s) => s.setLoginSuccess);
  const pushNotification = useUIStore((s) => s.pushNotification);

  // Local State
  const [username, setUsername] = useState("AMITH1"); // Initialized with your test user
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      pushNotification("Please enter both credentials", "error");
      return;
    }

    setLoading(true);
    try {
      // Now passing dynamic values from our inputs
      const response = await loginUser(username, password);
      console.log("Login successful:", response);
      
      setPasswordSuccess(); // Transition to OTP view
      pushNotification("Password Verified. Enter OTP", "success");
    } catch (err) {
      console.error("Login Error:", err);
      pushNotification("Login Failed: Invalid Credentials", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== "1234") {
      pushNotification("Invalid Security Code", "error");
      return;
    }
    setLoading(true);
    try {
      const data = await validateOtp(username, parseInt(otp));
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
            {!isPasswordDone ? "SYSTEM LOGIN" : "OPERATOR AUTH"}
          </h2>
          <p style={loginStyles.id}>NODE_ID: {username || "UNKNOWN"}</p>
        </div>

        {!isPasswordDone ? (
          <form onSubmit={handlePasswordLogin}>
            <input
              type="text"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value.toUpperCase())}
              style={loginStyles.input}
              disabled={loading}
            />
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={loginStyles.input}
              disabled={loading}
            />
            <button 
              type="submit"
              disabled={loading} 
              style={{...loginStyles.button, cursor: loading ? "not-allowed" : "pointer"}}
            >
              {loading ? "AUTHENTICATING..." : "VERIFY PASSWORD"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpVerify}>
            <input
              type="text"
              maxLength={4}
              placeholder="ENTER OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              style={{...loginStyles.input, color: "#00ff00", letterSpacing: "10px"}}
              autoFocus
              disabled={loading}
            />
            <button 
              type="submit"
              disabled={loading} 
              style={{...loginStyles.button, cursor: loading ? "not-allowed" : "pointer"}}
            >
              {loading ? "VALIDATING..." : "VERIFY SESSION"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const loginStyles = {
  container: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#000" },
  card: { width: "350px", padding: "40px", border: "1px solid #333", background: "#0a0a0a", textAlign: "center" as const },
  header: { marginBottom: "30px" },
  title: { color: "#fff", letterSpacing: "3px", fontSize: "16px", margin: 0, fontWeight: "bold" },
  id: { color: "#444", fontSize: "10px", marginTop: "8px", fontFamily: "monospace" },
  input: { 
    width: "100%", 
    padding: "12px", 
    background: "#111", 
    border: "1px solid #222", 
    color: "#eee", 
    fontSize: "14px", 
    outline: "none", 
    marginBottom: "15px",
    boxSizing: "border-box" as const,
    fontFamily: "monospace"
  },
  button: { 
    width: "100%", 
    padding: "12px", 
    background: "#fff", 
    color: "#000", 
    fontWeight: "bold" as const, 
    border: "none", 
    fontSize: "12px", 
    letterSpacing: "1px",
    marginTop: "10px"
  }
};