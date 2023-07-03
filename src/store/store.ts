import { configureStore } from "@reduxjs/toolkit";
import candidateReducer from "./reducers/candidateSlice";
import authReducer from "./reducers/authSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    candidates: candidateReducer,
    auth: authReducer
  },
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
