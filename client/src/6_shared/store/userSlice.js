import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "6_shared/api";
import { rejectError, pending } from "6_shared/store/lib";

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async function (_, { rejectWithValue }) {
    try {
      const { users } = await userApi.getAll();
      return users;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async function (payload, { rejectWithValue }) {
    try {
      const data = await userApi.getOne({
        id: payload.id,
      });
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    selected: null,
    users: [],
    error: null,
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = null;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.selected = action.payload;
        state.status = null;
        state.error = null;
      })
      .addCase(fetchUsers.pending, pending)
      .addCase(fetchUser.pending, pending)
      .addCase(fetchUsers.rejected, rejectError)
      .addCase(fetchUser.rejected, rejectError);
  },
});

// export const {} = userSlice.actions;

export const selectedUserSelector = (state) => state.user.selected;

export const usersSelector = (state) => state.user.users;

export const userStatusSelector = (state) => state.user.status;

export const userErrorSelector = (state) => state.user.error;
