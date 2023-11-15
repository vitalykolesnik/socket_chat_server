import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "6_shared/store/userSlice";
import { conversationSlice } from "6_shared/store/conversationSlice";
import { conversationListSlice } from "6_shared/store/conversationListSlice";
import { authSlice } from "6_shared/store/authSlice";

export function makeStore() {
  const store = configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [conversationSlice.name]: conversationSlice.reducer,
      [conversationListSlice.name]: conversationListSlice.reducer,
    },
  });

  return store;
}

export const appStore = makeStore();
