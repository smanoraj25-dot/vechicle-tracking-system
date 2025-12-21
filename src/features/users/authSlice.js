import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    user: null,
    loading: false, // Indicates the loading status
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
      state.loading = false; // Set loading to false upon successful login
    },
    clearUser: (state) => {
      state.user = null;
      state.isLogin = false;
      state.loading = false; // Ensure loading is false upon logout
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
