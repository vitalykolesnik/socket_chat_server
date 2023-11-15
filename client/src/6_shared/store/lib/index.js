export const rejectError = (state, action) => {
  state.error = action.payload;
  state.status = "error";
};

export const pending = (state) => {
  state.error = null;
  state.status = "pending";
};

export const auth = (state, action) => {
  state.isAuth = true;
  state.profile = action.payload;
  state.status = null;
  state.error = null;
};
