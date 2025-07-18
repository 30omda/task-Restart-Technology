import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
});

export default axiosInstance;
