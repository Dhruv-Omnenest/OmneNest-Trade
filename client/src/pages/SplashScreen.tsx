import React, { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { preAuthHandshake } from "@/services/api/auth/AuthService";


export const SplashScreen: React.FC = () => {
  const setHandshakeData = useAuthStore((s) => s.setHandshakeData);

  useEffect(() => {
    const performHandshake = async () => {
      try {
        const data = await preAuthHandshake(); 
        setTimeout(() => {
          setHandshakeData(data);
        }, 2000);
      } catch (error) {
        console.error("Handshake failed", error);
      }
    };

    performHandshake();
  }, [setHandshakeData]);

  return (
    <div style={splashStyles.container}>
      <div style={splashStyles.content}>
        <h1 style={splashStyles.logo}>OMNENEST</h1>
        <p style={splashStyles.subtext}>Technologies Pvt Ltd</p>
        <div style={splashStyles.loader}>Loading Secure Session...</div>
      </div>
    </div>
  );
};

const splashStyles = {
  container: {
    height: "100vh", display: "flex", justifyContent: "center",
    alignItems: "center", background: "#000", color: "#fff",
  },
  content: { textAlign: "center" as const },
  logo: { fontSize: "32px", letterSpacing: "4px", margin: 0, fontWeight: "bold" },
  subtext: { fontSize: "12px", color: "#666", marginTop: "4px", textTransform: "uppercase" as const },
  loader: { marginTop: "30px", fontSize: "10px", color: "#444" }
};