import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authApi from "./authApi";

const initialState = {
  value: 0,
};

export const registration = createAsyncThunk(
  "auth/registration",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.registration(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.login(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const verify = createAsyncThunk(
  "auth/verify",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.verifyEmail(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (data, { rejectWithValue }) => {
    try {
      const res = await authApi.forgotPassword(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const res = await authApi.resetPassword({ token, data });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          email: action.payload.email,
          username: action.payload.username,
        };
        state.accessToken = action.payload.accessToken;
        state.message = action.payload.message
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.error
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.message = action.payload.message
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.message = action.payload.message
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.message = action.payload.message
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.message = action.payload.message
      })
  },
});

export const { increment, decrement, incrementByAmount } = authSlice.actions;

export default authSlice.reducer;
