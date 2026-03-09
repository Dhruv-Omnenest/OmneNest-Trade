import { fetchRMSLimits } from '@/services/funds/fundsService';
import { create } from 'zustand';


interface MarginItem {
    displayLabel: string;
    value: number;
}

interface RMSData {
    segment: string;
    marginAvailable: MarginItem[];
    marginUsed: MarginItem[];
}

interface FundState {
    rmsData: RMSData | null;
    isLoading: boolean;
    getRMSLimits: () => Promise<void>;
}

export const useFundsStore = create<FundState>((set) => ({
    rmsData: null,
    isLoading: false,
    getRMSLimits: async () => {
        set({ isLoading: true });
        try {
            const data = await fetchRMSLimits();
            set({ rmsData: data, isLoading: false });
        } catch (err) {
            set({ isLoading: false });
        }
    }
}));