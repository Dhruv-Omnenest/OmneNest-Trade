import { useMemo } from "react";
import { useWebSocket } from "@/shared/hooks/useWebSocket";
// ★ NEW IMPORTS
import { useLiveMarketWs } from "@/shared/hooks/useLiveMarketWs";
import { WsStatusBadge } from "@/shared/components/WsStatusBadge";
import { wsManager } from "@/services/websocket";

import { Header } from "@/shared/components/Header";
import { NotificationStack } from "@/shared/components/NotificationStack";
import { DashboardPage } from "@/pages/DashboardPage";
import { PortfolioPage } from "@/features/portfolio-overview/PortfolioPage";
import { OrderBookPage } from "@/features/order-book/OrderBookPage";
import { useUIStore } from "@/store/ui.store";
import { useAuthStore } from "@/store/auth.store"; 
import { SplashScreen } from "@/pages/SplashScreen";
import { LoginPage } from "./pages/LoginPage";
import WatchlistPage from "./pages/WatchListPage";
import NewsPage from "./pages/NewsPage";
import IndexPage from "./pages/IndexPage";
import FundsPage from "./pages/FundsPage";

// Helper to extract clientCode from the token
function getClientCodeFromToken(token: string | null): string {
  if (!token) return "";
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return (payload.clientCode ?? payload.sub ?? "") as string;
  } catch {
    return localStorage.getItem("client_code") ?? "";
  }
}

const TAB_REGISTRY: Record<string, React.ReactNode> = {
  "indices": <IndexPage />,
  "fund-summary": <FundsPage />,
  "holdings": <PortfolioPage />,
  "order-and-positions-summary": <OrderBookPage />,
  "watchlist": <WatchlistPage />,
  "market-movers": <DashboardPage />, 
  "market-news": <NewsPage />   
};

export default function App() {
  const { isHandshakeDone, isLoggedIn } = useAuthStore();

  if (!isHandshakeDone) return <SplashScreen />;
  if (!isLoggedIn) return <LoginPage />;
  
  return <MainContent />;
}

function MainContent() {
  // 1. Get client code (memoized to prevent hook re-triggers)
  const clientCode = useMemo(() => {
    const token = localStorage.getItem("bearer_token");
    return getClientCodeFromToken(token);
  }, []);

  // 2. Initialize both WebSockets
  useWebSocket(); // Simulated/Internal
  useLiveMarketWs({
    clientCode,
    extraSubscriptions: [
      { exchange: "NSE_CM", tokens: ["11377"] }, // Example: HDFCBANK
    ],
  });

  const activeTab = useUIStore((s) => s.activeTab);
  const isLoading = useUIStore((s) => s.isLoadingConfig);

  const currentView = TAB_REGISTRY[activeTab] || <DashboardPage />;

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      height: "100vh", overflow: "hidden",
      background: "var(--bg-void)",
    }}>
      <Header />

      <main style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>
        {isLoading ? (
          <div style={{ margin: "auto", color: "var(--text-muted)" }}>Initializing Workspace...</div>
        ) : (
          currentView
        )}
      </main>

      <footer style={{
        padding: "4px 20px", borderTop: "1px solid var(--border)",
        background: "var(--bg-panel)", display: "flex", justifyContent: "space-between",
        alignItems: "center", // Added for vertical alignment with badge
        fontSize: "9px", color: "var(--text-muted)", fontFamily: "var(--font-mono)",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", gap: "16px" }}>
          <span>HANDSHAKE: SUCCESS</span>
          <span style={{ opacity: 0.5 }}>|</span>
          <span>LIVE MARKET: wss://preprodapisix.omnenest.com</span>
        </div>

        {/* 3. Integrated Status Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span>© 2026 Omnenest Technologies Pvt Ltd</span>
          <WsStatusBadge 
            showRetry 
            onRetry={() => wsManager.connect(clientCode)} 
          />
        </div>
      </footer>

      <NotificationStack />
    </div>
  );
}