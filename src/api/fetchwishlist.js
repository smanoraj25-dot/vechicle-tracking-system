import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const api = import.meta.env.VITE_BACKENDURL;

export const fetchWishlist = createAsyncThunk(
  "users/fetchWishlist",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api}/api/users/${id}/wishlist`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
