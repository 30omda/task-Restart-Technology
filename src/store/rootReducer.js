import authApi from "@/store/api/auth/authSlice";
import productApi from '@/store/api/products/productsSlice';

const rootReducer = {
    authApi,
    productApi,
};

export default rootReducer;
