import apiClient from "../api/apiClient";

export const fetchRMSLimits = async () => {
    try {
        const response = await apiClient.get('/v1/api/profile/rms-limits');
        return response.data[0]; 
    } catch (error: any) {
        console.error("RMS Fetch Failed", error.response?.data);
        throw error;
    }
};