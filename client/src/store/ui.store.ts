import { create } from "zustand";
import type { WatchlistItem } from "@/shared/types";

export interface DashboardFeature {
  name: string;
}

type Notification = { id: number; msg: string; kind: "success" | "error" | "info" };
let notifId = 0;

type UIState = {
  watchlist: WatchlistItem[];
  sidebarOpen: boolean;
  notifications: Notification[];
  activeTab: string; 
  tabs: DashboardFeature[]; 
  isLoadingConfig: boolean;

  setTabs: (tabs: DashboardFeature[]) => void;
  setLoadingConfig: (loading: boolean) => void;
  setActiveTab: (tab: string) => void;
  setSidebarOpen: (v: boolean) => void;
  pushNotification: (msg: string, kind?: Notification["kind"]) => void;
  dismissNotification: (id: number) => void;
};

export const useUIStore = create<UIState>((set) => ({
  watchlist: [],
  sidebarOpen: true,
  notifications: [],
  activeTab: "",
  tabs: [], // Initialized as empty array
  isLoadingConfig: true,

  setTabs: (tabs) => set({ tabs }),
  setLoadingConfig: (loading) => set({ isLoadingConfig: loading }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSidebarOpen: (v) => set({ sidebarOpen: v }),

  pushNotification: (msg, kind = "info") =>
    set((state) => ({
      notifications: [{ id: ++notifId, msg, kind }, ...state.notifications].slice(0, 5),
    })),

  dismissNotification: (id) =>
    set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) })),
}));