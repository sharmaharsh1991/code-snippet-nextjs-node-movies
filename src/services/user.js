import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  moviesList: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    unMountStore: (state) => {
      state.moviesList = true;
    },
    mountStore: (state) => {
      state.moviesList = false;
    },
  },
});

export const { unMountStore, mountStore } = userSlice.actions;

export default userSlice.reducer;
