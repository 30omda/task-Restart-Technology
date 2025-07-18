import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/services/axiosInstance";
import Api from "@/store/endpoints";
import toast from 'react-hot-toast';
import { setItem } from "@/utils/localStorage/storage";

export const signIn = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {

            const loginResponse = await axiosInstance.post(
                Api.login,
                {
                    email,
                    password,
                    isEmployee: true,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const { token } = loginResponse.data;
            toast.success("Login successful");
            setItem("token", token);

            const userResponse = await axiosInstance.get(Api.userInfo, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const userData = userResponse.data;
            setItem("user", userData);
            setItem("isEmployee", true);
            return {
                token,
                user: userData,
            };
        } catch (error) {
            let errorMessage =
                error?.response?.data?.meta || error?.message || "Login failed";
            toast.error(errorMessage);

            return rejectWithValue({ errorMessage, error });
        }
    }
);
