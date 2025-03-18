import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    featureImageList: [],
};

const Base_Url = 'https://ecommerce-mern-stack-335t.onrender.com';


export const getFeatureImages = createAsyncThunk(
    "order/getFeatureImages",
    async () => {
        const response = await axios.get(
            `${Base_Url}/api/common/feature/get`
        );

        return response.data;
    }
);

export const addFeatureImage = createAsyncThunk(
    "order/addFeatureImages",
    async (image) => {
        const response = await axios.post(
             `${Base_Url}/api/common/feature/add`,
            { image }
        );

        return response.data;
    }
);


const commonSlice = createSlice({
    name: "commonSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getFeatureImages.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getFeatureImages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.featureImageList = action.payload.data;
        })
        .addCase(getFeatureImages.rejected, (state) => {
            state.isLoading = false;
            state.featureImageList = [];
        });
    },
});

export default commonSlice.reducer;
