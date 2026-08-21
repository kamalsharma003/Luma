import { createSlice } from "@reduxjs/toolkit";
import {
  getProfileThunk,
  loginUserThunk,
  logoutUserThunk,
} from "./user.thunk";

export const userSlice = createSlice({
  name: "user",

  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    authChecked: false,
  },

  reducers: {
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.authChecked = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.authChecked = true;
      })

      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.authChecked = true;
      })

      .addCase(getProfileThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.authChecked = true;
      })

      .addCase(getProfileThunk.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.authChecked = true;
      })

      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        state.authChecked = true;
      })

      .addCase(logoutUserThunk.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
        state.authChecked = true;
      });
  },
});

export const { clearAuth } = userSlice.actions;

export default userSlice.reducer;
