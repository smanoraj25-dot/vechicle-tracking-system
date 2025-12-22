import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const api = import.meta.env.VITE_BACKENDURL;

export const fetchaddtoCard = createAsyncThunk(
  "users/fetchaddtoCard",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api}/api/users/${id}/cart`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
