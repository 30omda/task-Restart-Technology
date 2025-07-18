import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, editProduct } from "./productsAction";

const initialState = {
    items: [],
    isLoading: false,
    isAdding: false,
    error: null,
    editLoading: false,
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to fetch products";
            })


   
            .addCase(addProduct.pending, (state) => {
                state.isAdding = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.isAdding = false;
                state.items.unshift(action.payload); 
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isAdding = false;
                state.error = action.payload || "Failed to add product";
            })

            .addCase(editProduct.pending, (state) => {
                state.editLoading = true;
                state.error = null;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.editLoading = false;

                const updatedProduct = action.payload;
                const index = state.items.findIndex((item) => item._id === updatedProduct._id);
                if (index !== -1) {
                    state.items[index] = updatedProduct;
                }
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.editLoading = false;
                state.error = action.payload || "Failed to update product";
            });
    },
});

export default productsSlice.reducer;
