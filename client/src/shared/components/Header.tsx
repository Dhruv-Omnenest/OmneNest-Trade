import { memo, useEffect } from "react";
import { useUIStore, useMarketStore } from "@/store"; // Importing from barrel index
import { DashBoardConfig } from "@/services/api/dashboard/DashBoardConfig";

export const Header = memo(function Header() {
  // Selectors
  const tabs = useUIStore((s) => s.tabs) || [];
  const activeTab = useUIStore((s) => s.activeTab);
  const setActiveTab = useUIStore((s) => s.setActiveTab);
  const setTabs = useUIStore((s) => s.setTabs);
  const setLoadingConfig = useUIStore((s) => s.setLoadingConfig);
  
  const isConnected = useMarketStore((s) => s.isConnected);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await DashBoardConfig();
        // Accessing the nested structure from your JSON
        const features = data?.dashboard?.features || [];
        setTabs(features);
        
        // Auto-select first tab if none is active
        if (features.length > 0 && !activeTab) {
          const firstTabId = features[0].name.toLowerCase().replace(/\s+/g, '-');
          setActiveTab(firstTabId);
        }
      } catch (err) {
        console.error("Header Config Load Failed", err);
      } finally {
        setLoadingConfig(false);
      }
    };
    
    fetchConfig();
  }, [setTabs, setActiveTab, setLoadingConfig, activeTab]);

  return (
    <header style={{ 
      display: "flex", alignItems: "center", height: "52px", 
      padding: "0 24px", background: "var(--bg-panel)", borderBottom: "1px solid var(--border)",
      flexShrink: 0
    }}>
      <div style={{ fontWeight: "800", color: "var(--green)", marginRight: "24px", fontSize: "20px" }}>
        groww
      </div>

      <nav style={{ display: "flex", gap: "8px", flex: 1 }}>
        {tabs.map((tab) => {
          const id = tab.name.toLowerCase().replace(/\s+/g, '-');
          const isActive = activeTab === id;
          
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                background: isActive ? "var(--bg-elevated)" : "transparent",
                color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                border: isActive ? "1px solid var(--border)" : "1px solid transparent",
                padding: "6px 14px", cursor: "pointer",
                borderRadius: "4px", fontSize: "11px", fontWeight: "500",
                transition: "all 0.2s"
              }}
            >
              {tab.name}
            </button>
          );
        })}
      </nav>
      
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{
          width: "8px", height: "8px", borderRadius: "50%",
          background: isConnected ? "var(--green)" : "var(--red)",
          boxShadow: isConnected ? "0 0 8px var(--green)" : "none"
        }} />
        <span style={{ fontSize: "10px", fontWeight: "600", color: isConnected ? "var(--green)" : "var(--red)" }}>
          {isConnected ? "LIVE" : "OFFLINE"}
        </span>
      </div>
    </header>
  );
});