import apiClient from "../api/apiClient";


export const fetchStockNews = async (top: number = 10, skip: number = 0) => {
    try {
        const response = await apiClient.get('/v1/api/stocks/news', {
            params: { top, skip }
        });
        return response.data;
    } catch (error: any) {
        console.error("Fetch News Failed", error.response?.data);
        throw error;
    }
};