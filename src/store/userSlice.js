import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  name: '',
  email: '',
  uid: 0,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleLoggedIn(state) {
      state.loggedIn = !state.loggedIn
    },
    updateUser(state, { payload: { email, id, name } }) {
      state.email = email;
      state.uid = id;
      state.name = name;
    }
  }
});

export const { toggleLoggedIn, updateUser } = userSlice.actions;

export default userSlice.reducer;