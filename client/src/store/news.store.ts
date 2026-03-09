import { fetchStockNews } from '@/services/news/FetchNews';
import { create } from 'zustand';

interface NewsItem {
    title: string;
    contentSnippet: string;
    link: string;
    publishedDate: string;
    source: string;
}

interface NewsState {
    news: NewsItem[];
    isLoading: boolean;
    error: string | null;
    fetchNews: (top?: number, skip?: number) => Promise<void>;
}

export const useNewsStore = create<NewsState>((set) => ({
    news: [],
    isLoading: false,
    error: null,

    fetchNews: async (top = 10, skip = 0) => {
        set({ isLoading: true, error: null });
        try {
            const data = await fetchStockNews(top, skip);
            set({ news: data, isLoading: false });
        } catch (err: any) {
            set({ 
                error: err.response?.data?.message || "Unable to fetch news", 
                isLoading: false 
            });
        }
    },
}));