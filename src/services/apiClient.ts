import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://api.pexels.com/v1',
    headers: {
        Authorization: import.meta.env.VITE_API_KEY
    },
    params: {}
});

export default apiClient;