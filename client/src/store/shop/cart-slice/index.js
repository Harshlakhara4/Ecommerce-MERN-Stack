
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



const initialState = {
    cartItems: [],
    isLoading: false,
};

const Base_Url = 'https://ecommerce-mern-stack-335t.onrender.com';

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, productId, quantity }) => {
        const response = await axios.post(
            `${Base_Url}/api/shop/cart/add`,
            {
                userId,
                productId,
                quantity,
            }
        );

        return response.data;
    }
);

export const fetchCartItems = createAsyncThunk(
    "cart/fetchCartItems",
    async (userId) => {
        const response = await axios.get(
            `${Base_Url}/api/shop/cart/get/${userId}`
        );

        return response.data;
    }
);


export const deleteCartItem = createAsyncThunk(
    "cart/deleteCartItem",
    async ({userId, productId }) => {
        const response = await axios.delete(
            `${Base_Url}/api/shop/cart/delete/${userId}/${productId}`
        );

        return response.data;
    }
);


export const updateCartQuantity = createAsyncThunk(
    "cart/updateCartQuantity",
    async ({ userId, productId, quantity }) => {
        const response = await axios.put(
           `${Base_Url}/api/shop/cart/update-cart`,
            {
                userId,
                productId,
                quantity,
            }
        );

        return response.data;
    }
);

const ShoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        })
        .addCase(addToCart.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        })
        .addCase(fetchCartItems.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        })
        .addCase(fetchCartItems.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        })
        .addCase(updateCartQuantity.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateCartQuantity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        })
        .addCase(updateCartQuantity.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        })
        .addCase(deleteCartItem.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        })
        .addCase(deleteCartItem.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        });
    },
});

export default ShoppingCartSlice.reducer;
