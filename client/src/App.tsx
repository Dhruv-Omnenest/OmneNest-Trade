import { useWebSocket } from "@/shared/hooks/useWebSocket";
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

const TAB_REGISTRY: Record<string, React.ReactNode> = {
  "indices": <DashboardPage />,
  "fund-summary": <PortfolioPage />,
  "holdings": <PortfolioPage />,
  "order-and-positions-summary": <OrderBookPage />,
  "watchlist": <WatchlistPage />,
  "market-movers": <DashboardPage />, 
  "market-news": <DashboardPage />   
};

export default function App() {
  const { isHandshakeDone, isLoggedIn } = useAuthStore();

  if (!isHandshakeDone) return <SplashScreen />;
  if (!isLoggedIn) return <LoginPage />;
  
  return <MainContent />;
}

function MainContent() {
  useWebSocket();
  const activeTab = useUIStore((s) => s.activeTab);
  const isLoading = useUIStore((s) => s.isLoadingConfig);

  // Fallback to Dashboard if the slug isn't in our registry
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
        fontSize: "9px", color: "var(--text-muted)", fontFamily: "var(--font-mono)",
        flexShrink: 0,
      }}>
        <span>HANDSHAKE: SUCCESS</span>
        <span>© 2026 Omnenest Technologies Pvt Ltd</span>
      </footer>

      <NotificationStack />
    </div>
  );
}