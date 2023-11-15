import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { conversationApi, messageApi } from "6_shared/api";
import { rejectError, pending } from "6_shared/store/lib";

export const addMessage = createAsyncThunk(
  "conversation/addMessage",
  async function (payload, { rejectWithValue }) {
    try {
      return await messageApi.createMessage({
        conversationId: payload.conversationId,
        text: payload.text,
      });
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  "conversation/deleteMessage",
  async function (payload, { rejectWithValue }) {
    try {
      return await messageApi.deleteMessage({
        id: payload.id,
      });
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const fetchConversation = createAsyncThunk(
  "conversation/fetchConversation",
  async function (payload, { rejectWithValue }) {
    try {
      return await conversationApi.getOne({
        id: payload.id,
      });
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    current: null,
    error: null,
    status: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMessage.fulfilled, (state, action) => {
        state.current.messages = [...state.current.messages, action.payload];
        state.status = "fullfiled";
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.current.messages = state.current.messages.filter(
          (m) => m.id !== action.payload.id
        );
        state.status = "fullfiled";
      })
      .addCase(fetchConversation.fulfilled, (state, action) => {
        state.current = action.payload;
        state.status = "fullfiled";
      })
      .addCase(fetchConversation.pending, pending)
      .addCase(addMessage.rejected, rejectError)
      .addCase(deleteMessage.rejected, rejectError)
      .addCase(fetchConversation.rejected, rejectError);
  },
});

export const conversationCurrentSelector = (state) =>
  state.conversation.current;

export const conversationMembersSelector = (state) =>
  state.conversation.current?.members;

export const conversationMessagesSelector = (state) =>
  state.conversation.current.messages;

export const conversationErrorSelector = (state) => state.conversation.error;

export const conversationStatusSelector = (state) => state.conversation.status;
