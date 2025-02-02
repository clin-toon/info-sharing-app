import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import searchSlice from "../features/searchSlice";
import modalSlice from "../features/modalSlices";
import singlePostSlice from "../features/singlePostSlice";
import listenerMiddleware from "./middlewares/listenerMiddleware";
import commentSlice from "../features/commentsSlice";
import profileSlice from "../features/profileSlice";
import postSlice from "../features/postSlices";
import errorSlice from "../features/errorSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    search: searchSlice.reducer,
    modal: modalSlice.reducer,
    singlePost: singlePostSlice.reducer,
    comments: commentSlice.reducer,
    profile: profileSlice.reducer,
    posts: postSlice.reducer,
    error: errorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});

export default store;
