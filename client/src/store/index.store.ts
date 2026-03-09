import { fetchStockIndices } from '@/services/indexes/indexService';
import { create } from 'zustand';

interface IndexDetail {
    indexName: string;
    exchange: string;
    indexToken: string;
    decimalPrecision: number;
    exchangeSegment: string;
}

interface IndexState {
    indices: IndexDetail[];
    selectedExchange: string;
    isLoading: boolean;
    setExchange: (exchange: string) => void;
    getIndices: () => Promise<void>;
}

export const useIndexStore = create<IndexState>((set, get) => ({
    indices: [],
    selectedExchange: "", 
    isLoading: false,

    setExchange: (exchange: string) => {
        set({ selectedExchange: exchange });
        get().getIndices(); 
    },

    getIndices: async () => {
        set({ isLoading: true });
        try {
            const data = await fetchStockIndices(get().selectedExchange);
            set({ indices: data, isLoading: false });
        } catch (err) {
            set({ isLoading: false });
        }
    }
}));