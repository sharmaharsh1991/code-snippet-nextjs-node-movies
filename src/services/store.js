import { configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "./movies";
import userSlice from "./user";
export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});
