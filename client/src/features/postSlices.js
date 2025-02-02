import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  makeModalTrue,
  makeLoaderFalse,
  changeModalMessage,
} from "./modalSlices";

const api = import.meta.env.VITE_API_URL;
export const getPostsOfUser = createAsyncThunk(
  "gettingPosts",

  async ({ authUser, authToken }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get(`${api}posts/get/${authUser}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      dispatch(makeLoaderFalse());
      return res.data;
    } catch (error) {
      dispatch(makeLoaderFalse());
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Couldn't fetch posts",
          des: error.message ? error.message.data : "Server error ",
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const editPostOfUser = createAsyncThunk(
  "geditingAndGetingPosts",

  async ({ postId, userId, token, form }, { dispatch, rejectWithValue }) => {
    try {
      await axios.put(`${api}posts/update/${postId}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(makeLoaderFalse());
      const data = await dispatch(
        getPostsOfUser({ authUser: userId, authToken: token })
      );
      return data.payload;
    } catch (error) {
      console.log(error);
      dispatch(makeLoaderFalse());
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Couldn't fetch posts",
          des: error.message ? error.message.data : "Server error ",
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const deletePostsOfUser = createAsyncThunk(
  "deletingPostOfUsers",

  async ({ postId, userId, token }, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${api}posts/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(makeLoaderFalse());
      const data = await dispatch(
        getPostsOfUser({ authUser: userId, authToken: token })
      );
      return data.payload;
    } catch (error) {
      dispatch(makeLoaderFalse());
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Couldn't fetch posts",
          des: error.message ? error.message.data : "Server error ",
        })
      );
      return rejectWithValue(error);
    }
  }
);

export const homePagePosts = createAsyncThunk(
  "gettingHomePagePosts",

  async ({ isLoggedIn }, { dispatch, rejectWithValue }) => {
    try {
      if (isLoggedIn) {
        try {
          const res = await axios.get(`${api}posts/find/all`);
          dispatch(makeLoaderFalse());

          return res.data;
        } catch (error) {
          rejectWithValue(error);
        }
      } else {
        try {
          const res = await axios.get(`${api}posts/home-page`);
          dispatch(makeLoaderFalse());
          return res.data;
        } catch (error) {
          dispatch(makeLoaderFalse());
          dispatch(
            changeModalMessage({
              title: "Something went wrong.",
              des: "Server error. Failed to fetch posts ",
            })
          );
          return rejectWithValue(error);
        }
      }
    } catch (error) {
      dispatch(makeLoaderFalse());
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Couldn't fetch posts",
          des: error.message ? error.message.data : "Server error ",
        })
      );
      return rejectWithValue(error);
    }
  }
);

const postSlice = createSlice({
  name: "Posts",
  initialState: {
    posts: [],
    lauda: [],
    isLoading: false,
    idOfEditingPost: null,
    idOfDeletingPost: null,
    allPosts: [],
  },
  reducers: {
    changePostId: (state, action) => {
      state.idOfEditingPost = action.payload;
    },
    changeDeletePostId: (state, action) => {
      state.idOfDeletingPost = action.payload;
    },
    displayOnlyFollowingPost: (state, action) => {
      state.lauda = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsOfUser.fulfilled, (state, action) => {
        (state.isLoading = false), (state.posts = action.payload || []);
      })
      .addCase(getPostsOfUser.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(editPostOfUser.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(deletePostsOfUser.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(homePagePosts.fulfilled, (state, action) => {
        state.lauda = action.payload || [];
      })
      .addCase(homePagePosts.pending, (state, action) => {
        state.lauda = [];
      })
      .addCase(homePagePosts.rejected, (state, action) => {
        state.lauda = [];
      });
  },
});

export const { changePostId, changeDeletePostId, displayOnlyFollowingPost } =
  postSlice.actions;
export default postSlice;
