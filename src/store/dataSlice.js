import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: []
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setAllUsers(state, { payload }) {
      state.users = payload;
    }
  }
});

export const { setAllUsers } = dataSlice.actions;

export default dataSlice.reducer;