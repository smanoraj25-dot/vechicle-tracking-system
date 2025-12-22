import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const api = import.meta.env.VITE_BACKENDURL;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api}/api/products`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
