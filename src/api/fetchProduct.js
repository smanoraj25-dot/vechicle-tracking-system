import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiurl = import.meta.env.VITE_BACKENDURL;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get(`${apiurl}/api/products/`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch products: ' + error.message);
    }
  }
);
