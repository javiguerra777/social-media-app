import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  name: '',
  email: '',
  uid: 0,
  displayFooter: false,
  profilepic: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleLoggedIn(state) {
      state.loggedIn = !state.loggedIn;
    },
    updateUser(state, { payload: { email, id, name, profilepic } }) {
      state.email = email;
      state.uid = id;
      state.name = name;
      state.profilepic = profilepic
    },
    toggleDisplayFooter(state) {
      state.displayFooter = !state.displayFooter;
    }
  }
});

export const { toggleLoggedIn, updateUser, toggleDisplayFooter } = userSlice.actions;

export default userSlice.reducer;