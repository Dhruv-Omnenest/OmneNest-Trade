import apiClient from "../apiClient";

export const DashBoardConfig = async () => {
    try {
        const response = await apiClient.get('/v1/api/profile/dashboard-config')
        return response.data; 
    } catch (error: any) {
        throw error;
    }
}