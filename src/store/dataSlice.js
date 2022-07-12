import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  comments: [],
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setAllUsers(state, { payload }) {
      state.users = payload;
    },
    setAllComments(state, { payload }) {
      state.comments = payload;
    }
  }
});

export const { setAllUsers, setAllComments } = dataSlice.actions;

export default dataSlice.reducer;