import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi, userApi } from "6_shared/api";
import { rejectError, pending, auth } from "6_shared/store/lib";

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async function (_, { rejectWithValue }) {
    try {
      const { user } = await userApi.getMe();
      return user;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async function (payload, { rejectWithValue }) {
    try {
      const { user } = await authApi.login({
        user: payload,
      });
      return user;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async function (payload, { rejectWithValue }) {
    try {
      const { user } = await authApi.signup({
        user: payload,
      });
      return user;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const followUser = createAsyncThunk(
  "auth/followUser",
  async function (payload, { rejectWithValue }) {
    try {
      const { friends } = await userApi.follow({ friendId: payload.id });
      return friends;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    profile: null,
    error: null,
    status: null,
  },
  reducers: {
    logoutUser(state) {
      state.isAuth = false;
      state.profile = null;
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, auth)
      .addCase(registerUser.fulfilled, auth)
      .addCase(authenticate.fulfilled, (state, action) => {
        state.isAuth = true;
        state.profile = action.payload;
        state.status = null;
        state.error = null;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.profile.friends = action.payload;
        state.status = null;
        state.error = null;
      })
      .addCase(loginUser.pending, pending)
      .addCase(registerUser.pending, pending)
      .addCase(authenticate.pending, pending)
      .addCase(loginUser.rejected, rejectError)
      .addCase(registerUser.rejected, rejectError)
      .addCase(authenticate.rejected, rejectError)
      .addCase(followUser.rejected, rejectError);
  },
});

export const { logoutUser } = authSlice.actions;

export const isAuthSelector = (state) => state.auth.isAuth;

export const profileSelector = (state) => state.auth.profile;

export const friendsSelector = (state) => state.auth.profile?.friends;

export const tokenSelector = (state) => state.auth.profile?.token;

export const authStatusSelector = (state) => state.auth.status;

export const authErrorSelector = (state) => state.auth.error;
