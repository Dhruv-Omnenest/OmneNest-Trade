import { useWebSocket } from "@/shared/hooks/useWebSocket";
import { Header } from "@/shared/components/Header";
import { NotificationStack } from "@/shared/components/NotificationStack";
import { DashboardPage } from "@/pages/DashboardPage";
import { PortfolioPage } from "@/features/portfolio-overview/PortfolioPage";
import { OrderBookPage } from "@/features/order-book/OrderBookPage";
import { WatchlistPage } from "@/features/dashboard/WatchlistPage";
import { useUIStore } from "@/store/ui.store";
import { useAuthStore } from "@/store/auth.store"; 
import { SplashScreen } from "@/pages/SplashScreen";
import { LoginPage } from "./pages/LoginPage";
import { useEffect } from "react";


export default function App() {
  const { isHandshakeDone, isLoggedIn } = useAuthStore();

  useEffect(() => {
    console.log("AUTH STATE CHANGED:", { isHandshakeDone, isLoggedIn });
  }, [isHandshakeDone, isLoggedIn]);

  if (!isHandshakeDone) return <SplashScreen />;
  if (!isLoggedIn) return <LoginPage />;
  
  return <MainContent />;
}

function MainContent() {
  useWebSocket();

  const activeTab = useUIStore((s) => s.activeTab);

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":  return <DashboardPage />;
      case "portfolio":  return <PortfolioPage />;
      case "orderbook":  return <OrderBookPage />;
      case "watchlist":  return <WatchlistPage />;
      default:           return <DashboardPage />;
    }
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      height: "100vh", overflow: "hidden",
      background: "var(--bg-void)",
    }}>
      <Header />

      <main style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>
        {renderTab()}
      </main>

      <footer style={{
        padding: "4px 20px",
        borderTop: "1px solid var(--border)",
        background: "var(--bg-panel)",
        display: "flex", justifyContent: "space-between",
        fontSize: "9px", color: "var(--text-muted)",
        fontFamily: "var(--font-mono)", letterSpacing: "0.5px",
        flexShrink: 0,
      }}>
        <span>HANDSHAKE: SUCCESS</span>
        <span>© 2026 Omnenest Technologies Pvt Ltd</span>
      </footer>

      <NotificationStack />
    </div>
  );
}