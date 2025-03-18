import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




const initialState = {
    isLoading:  false,
    addressList: [],
};

const Base_Url = 'https://ecommerce-mern-stack-335t.onrender.com';


export const addNewAddress = createAsyncThunk(
    "/addresses/addNewAddress",
    async (formData) => {
        console.group(formData,"data of address")
        const response = await axios.post(
            `${Base_Url}/api/shop/address/add`,
            formData,
        );

        return response.data;
    }
);

export const fetchAllAddresses = createAsyncThunk(
    "/addresses/fetchAllAddresses",
    async (userId) => {
        const response = await axios.get(
            `${Base_Url}/api/shop/address/get/${userId}`
        );
        console.log(response.data);

        return response.data;   
    }
);

export const editAddress = createAsyncThunk(
    "/addresses/editAddress",
    async ({ userId, addressId, formData }) => {
        const response = await axios.put(
            `${Base_Url}/api/shop/address/update/${userId}/${addressId}`,
            formData
        );

        return response.data;
    }
);

export const deleteAddress = createAsyncThunk(
    "/addresses/deleteAddress",
    async ({ userId, addressId }) => {
      const response = await axios.delete(
        `${Base_Url}/api/shop/address/delete/${userId}/${addressId}`
      );
  
      return response.data;
    }
  );

  const addressSlice =createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addNewAddress.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addNewAddress.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(addNewAddress.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(fetchAllAddresses.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchAllAddresses.fulfilled, (state, action) => {
            state.isLoading = false;
            state.addressList = action.payload.data;
        })
        .addCase(fetchAllAddresses.rejected, (state) => {
            state.isLoading = false;
            state.addressList = [];
        });
    },
  });


  export default addressSlice.reducer;
