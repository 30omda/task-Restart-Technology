import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./api/auth/authSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});
