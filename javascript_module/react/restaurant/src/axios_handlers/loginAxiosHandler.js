import { default as axios } from 'axios';

const axiosHTTP = axios.create({
    baseURL: "https://dummyjson.com/auth",
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosHTTP.interceptors.request.use((config) => {
    return config
})

axiosHTTP.interceptors.response.use((response) => {
    console.log(response);
    const data = response.data;
    console.log(data);
    console.log(data.accessToken);
    localStorage.setItem('token', data.accessToken);
    return response
})

export default axiosHTTP;