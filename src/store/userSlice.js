/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: false,
  name: '',
  email: '',
  uid: 0,
  displayFooter: false,
  profilepic: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleLoggedIn(state) {
      state.loggedIn = !state.loggedIn;
    },
    updateUser(
      state,
      { payload: { email, userid, name, profilepic } },
    ) {
      state.email = email;
      state.uid = userid;
      state.name = name;
      state.profilepic = profilepic;
    },
    updatePicture(state, { payload }) {
      state.profilepic = payload;
    },
    toggleDisplayFooter(state) {
      state.displayFooter = !state.displayFooter;
    },
  },
});

export const {
  toggleLoggedIn,
  updateUser,
  toggleDisplayFooter,
  updatePicture,
} = userSlice.actions;

export default userSlice.reducer;
