import { default as axios } from 'axios';

const axiosHTTP = axios.create({
    baseURL: "https://dummyjson.com"
})

// Pre handling before sending request
axiosHTTP.interceptors.request.use((config) => {
    config.params = { ...config.params };
    return config;
})

// Pre handling before sending response
axiosHTTP.interceptors.response.use((response) => {
    return response;
})

export default axiosHTTP;