
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    orderList: [],
    orderDetails: null,
};

const Base_Url = 'https://ecommerce-mern-stack-335t.onrender.com';

export const getAllOrderForAdmin = createAsyncThunk(
    "/order/getAllOrdersForAdmin",
    async() => {
        const response = await axios.get(
            `${Base_Url}/api/admin/orders/get`
        );

        return response.data;
    }
);



export const getOrderDetailsForAdmin = createAsyncThunk(
    "/order/getOrderDetailsForAdmin",
    async(id) => {
        const response = await axios.get(
            `${Base_Url}/api/admin/orders/details/${id}`
        );

        return response.data;
    }
);


export const updateOrderStatus = createAsyncThunk(
    "/order/updateOrderStatus",
    async({ id, orderStatus }) => {
        const response = await axios.put(
            `${Base_Url}/api/admin/orders/update/${id}`,
            {
                orderStatus,
            }
        );

        return response.data;
    }
);


const adminOrderSlice = createSlice({
    name: "adminOrderSlice",
    initialState,
    reducers: {
        resetOrderDetails: (state) => {
            console.log("resetOrderDetails");

            state.orderDetails = null;
        },
    },

    extraReducers: (builder) => {
        builder
        .addCase(getAllOrderForAdmin.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllOrderForAdmin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderList = action.payload.data;
        })
        .addCase(getAllOrderForAdmin.rejected, (state) => {
            state.isLoading = false;
            state.orderList = [];
        })
        .addCase(getOrderDetailsForAdmin.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderDetails = action.payload.data;
        })
        .addCase(getOrderDetailsForAdmin.rejected, (state) => {
            state.isLoading = false;
            state.orderDetails = null;
        });
    },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;


