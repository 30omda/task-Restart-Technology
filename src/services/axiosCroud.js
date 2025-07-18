import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_CROUD;

const axiosCroud = axios.create({
    baseURL: baseURL,
});

export default axiosCroud;
