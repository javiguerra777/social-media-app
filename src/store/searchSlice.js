import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  suggestions: []
}

const searchSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setSuggestions(state, { payload }) {
      state.suggestions = payload;
    }
  }
});

export const { setSuggestions } = searchSlice.actions;

export default searchSlice.reducer;