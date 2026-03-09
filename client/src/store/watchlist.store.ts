import { fetchWatchlists, fetchWatchlistScrips } from '@/services/api/watchlist/WatchList';
import { create } from 'zustand';
export interface Scrip {
    scripToken: string;
    symbolName: string;
    tradingSymbol: string;
    exchange: string;
    segmentIndicator: string;
    lastTradedPrice?: number;
    previousClosePrice: number;
    netChange: number;
}

export interface Watchlist {
    watchlistName: string;
    watchlistId: number;
}

interface WatchlistState {
    userDefined: Watchlist[];
    predefined: Watchlist[];
    scrips: Scrip[];
    activeId: number | null;
    isLoading: boolean;
    error: string | null;
    initWatchlists: () => Promise<void>;
    setActiveWatchlist: (id: number) => Promise<void>;
}
export const useWatchlistStore = create<WatchlistState>((set, get) => ({
    userDefined: [],
    predefined: [],
    scrips: [],
    activeId: null,
    isLoading: false,
    error: null,

    initWatchlists: async () => {
        set({ isLoading: true });
        try {
            const data = await fetchWatchlists();
            set({ 
                userDefined: data.userDefinedWatchlists || [], 
                predefined: data.predefinedWatchlists || [],
                activeId: data.defaultWatchlistId,
            });
            
            if (data.defaultWatchlistId) {
                await get().setActiveWatchlist(data.defaultWatchlistId);
            } else {
                set({ isLoading: false });
            }
        } catch (err) {
            set({ error: "Failed to load", isLoading: false });
        }
    },

    setActiveWatchlist: async (id: number) => {
        set({ activeId: id, isLoading: true });
        try {
            const data = await fetchWatchlistScrips(id);
            // Now TypeScript knows 'data.scrips' is a Scrip[]
            set({ scrips: data.scrips || [], isLoading: false });
        } catch (err) {
            set({ error: "Failed to load scrips", isLoading: false });
        }
    }
}));