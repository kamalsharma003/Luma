import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../components/utility/axiosInctance.utility.js";

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      await axiosInstance.post(
        "/user/login",
        { username, password },
        { withCredentials: true }
      );

      const profileResponse = await axiosInstance.get("/user/get-profile", {
        withCredentials: true,
      });

      return profileResponse.data.responseData;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/user/register",
        userData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

export const getProfileThunk = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/get-profile", {
        withCredentials: true,
      });
      return response.data.responseData;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unable to verify session");
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/logout", null, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);
