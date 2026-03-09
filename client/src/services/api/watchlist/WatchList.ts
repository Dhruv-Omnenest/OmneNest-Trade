import apiClient from "../apiClient";

export const fetchWatchlists = async () => {
    try {
        const response = await apiClient.get('/v1/api/watchlist/list');
        return response.data;
    } catch (error: any) {
        console.error("Fetch Watchlist Failed", error.response?.data);
        throw error;
    }
};

export const fetchWatchlistScrips = async (watchlistId: number) => {
    try {
        const response = await apiClient.post('/v1/api/watchlist/scrips/list', { watchlistId });
        return response.data;
    } catch (error: any) {
        console.error("Fetch Scrips Failed", error.response?.data);
        throw error;
    }
};