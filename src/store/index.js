import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import dataReducer from './dataSlice';
import searchReducer from './searchSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    data: dataReducer,
    search: searchReducer
  }
})