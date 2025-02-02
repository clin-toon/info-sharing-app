import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  makeModalTrue,
  makeLoaderFalse,
  changeModalMessage,
} from "./modalSlices";

const api = import.meta.env.VITE_API_URL;

// function to get  comments of user
export const getCommentsOfPosts = createAsyncThunk(
  "comments",
  async (postId, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get(`${api}comments/get/${postId}`);
      dispatch(makeLoaderFalse());
      return res.data.allComments;
    } catch (error) {
      dispatch(makeLoaderFalse());
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Couldn't fetch comments ",
          des: error.response ? error.response.data : "Server error ",
        })
      );
      return rejectWithValue(error.message);
    }
  }
);

export const addCommentToPost = createAsyncThunk(
  "add-comments",
  async ({ commentVal, userId, postId }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post(`${api}comments/add/${postId}/${userId}`, {
        comment: commentVal,
      });

      dispatch(makeLoaderFalse());
      dispatch(getCommentsOfPosts(postId));
      return res.data;
    } catch (error) {
      dispatch(makeLoaderFalse());
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Couldn't add your comment ",
          des: error.response ? error.response.data : "Server error ",
        })
      );
      return rejectWithValue(error.message);
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    isLoading: false,
    userComment: "",
    commentsArray: [],
    showCommentModal: false,
  },
  reducers: {
    getUserComment: (state, action) => {
      state.userComment = action.payload;
    },
    showComments: (state, action) => {
      state.showCommentModal = true;
    },
    hideComments: (state, action) => {
      state.showCommentModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsOfPosts.fulfilled, (state, action) => {
        state.isLoading = true;
        state.commentsArray = action.payload;
      })
      .addCase(getCommentsOfPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCommentToPost.fulfilled, (state) => {
        state.userComment = "NIce";
      });
  },
});
export const { getUserComment, showComments, hideComments } =
  commentSlice.actions;

export default commentSlice;
