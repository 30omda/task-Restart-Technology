import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosCroud from "@/services/axiosCroud";
import Api from "@/store/endpoints";
import toast from "react-hot-toast";



export const addProduct = createAsyncThunk(
    "products/add",
    async (newProduct, { rejectWithValue }) => {
        try {
            const response = await axiosCroud.post(Api.products, {
                ...newProduct,
                createdAt: new Date().toISOString(),
            });
            toast.success("Product added successfully");
            return response.data;
        } catch (error) {
            toast.error("Failed to add product");
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);


export const fetchProducts = createAsyncThunk(
    "products/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosCroud.get(Api.products);
            return response.data;
        } catch (error) {
            toast.error("Failed to fetch products");
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const DeleteProduct = createAsyncThunk(
    "products/delete",
    async ({ id }, { rejectWithValue }) => {
        try {
            await axiosCroud.delete(`${Api.products}/${id}`);
            toast.success("Product deleted successfully");
            return id; 
        } catch (error) {
            toast.error("Failed to delete product");
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);

export const editProduct = createAsyncThunk(
    "products/edit",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosCroud.put(`${Api.products}/${id}`, data);
            toast.success("Product updated successfully");
            return response.data;
        } catch (error) {
            toast.error("Failed to update product");
            return rejectWithValue(error.response?.data || "Something went wrong");
        }
    }
);