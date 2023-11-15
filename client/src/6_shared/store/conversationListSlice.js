import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { conversationApi } from "6_shared/api";
import { rejectError, pending } from "6_shared/store/lib";

export const fetchConversationList = createAsyncThunk(
  "conversationList/fetchConversationList",
  async function (_, { rejectWithValue }) {
    try {
      const { conversations } = await conversationApi.getAll();
      return conversations;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const createConversation = createAsyncThunk(
  "conversationList/createConversation",
  async function (payload, { rejectWithValue }) {
    try {
      const conversation = await conversationApi.createConv({
        title: payload.title,
      });
      return conversation;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const deleteConversation = createAsyncThunk(
  "conversationList/deleteConversation",
  async function (payload, { rejectWithValue }) {
    try {
      return await conversationApi.deleteConv({
        id: payload.id,
      });
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const conversationListSlice = createSlice({
  name: "conversationList",
  initialState: {
    conversations: [],
    error: null,
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationList.fulfilled, (state, action) => {
        state.conversations = action.payload;
        state.status = "fullfiled";
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.conversations = [...state.conversations, action.payload];
        state.status = "fullfiled";
      })
      .addCase(deleteConversation.fulfilled, (state, action) => {
        state.conversations = state.conversations.filter(
          (c) => c.id !== action.payload.id
        );
        state.status = "fullfiled";
      })
      .addCase(fetchConversationList.pending, pending)
      .addCase(createConversation.rejected, rejectError)
      .addCase(deleteConversation.rejected, rejectError)
      .addCase(fetchConversationList.rejected, rejectError);
  },
});

export const conversationsSelector = (state) =>
  state.conversationList.conversations;

export const conversationsErrorSelector = (state) =>
  state.conversationList.error;

export const conversationsStatusSelector = (state) =>
  state.conversationList.status;
