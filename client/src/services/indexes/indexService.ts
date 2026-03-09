import apiClient from "../api/apiClient";


export const fetchStockIndices = async (exchange: string = "") => {
    try {
        const response = await apiClient.post('/v1/middleware-bff/stocks/index', {
            exchange: exchange
        });
        return response.data.IndexDetails;
    } catch (error: any) {
        console.error("Fetch Indices Failed", error.response?.data);
        throw error;
    }
};