import apiClient from "../apiClient";

export const preAuthHandshake = async () => {
    try {

        const payload = {
            devicePublicKey: "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1Gd3dEUVlKS29aSWh2Y05BUUVCQlFBRFN3QXdTQUpCQUxmQUp0Uy9ZcjVWSCtNUTVUZmkvTG1zNUZldDNMM3g2SUNYMW9zME15RWpjUC9ldmFGdFYrZkJOTTBKRG5WQ3h3alZwRkNHaElybkt1S3d1Y2pUUndrQ0F3RUFBUT09DQotLS0tLUVORCBQVUJMSUMgS0VZLS0tLS0="
        };
        const response = await apiClient.post('/v1/api/auth/pre-auth-handshake', payload); 
        console.log("Handshake Success:", response.data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error("Handshake Error Details:", error.response.data);
        }
        throw error;
    }
};