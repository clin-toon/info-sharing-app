import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  makeModalTrue,
  makeLoaderFalse,
  changeModalMessage,
} from "./modalSlices";

const api = import.meta.env.VITE_API_URL;

export const getSinglePost = createAsyncThunk(
  "singlePost",
  async (postId, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get(`${api}posts/get/single/${postId}`);
      dispatch(makeLoaderFalse());
      return res.data;
    } catch (error) {
      dispatch(makeLoaderFalse());
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Couldn't fetch post ",
          title: error.response ? error.response.data : "Server error ",
        })
      );
      return rejectWithValue(error.message);
    }
  }
);

// function to get user info that should be displayed at the author page
export const getUserInfo = createAsyncThunk(
  "userInfo",
  async (userId, { dispatch, rejectWithValue }) => {
    // this requires profile model id

    let apiURL;
    if (userId instanceof Object) {
      apiURL = `${api}profile/get/${userId.userId}`;
    } else {
      apiURL = `${api}profile/get/${userId}`;
    }

    try {
      const res = await axios.get(apiURL); // calling backend end point  for getting username

      dispatch(makeLoaderFalse());
      return res.data;
    } catch (error) {
      dispatch(makeLoaderFalse());
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Couldn't fetch user ",
          des: error.response ? error.response.data.msg : "Server error ",
        })
      );

      return rejectWithValue(error.message);
    }
  }
);

export const getUserNameOfPostOwner = createAsyncThunk(
  "postUserName",
  async (userId, { dispatch, rejectWithValue }) => {
    // this requires User model id
    let apiURL;
    if (userId instanceof Object) {
      apiURL = `${api}profile/get/username/${userId.userId}`;
    } else {
      apiURL = `${api}profile/get/username/${userId}`;
    }
    try {
      const res = await axios.get(apiURL); // get username of post owner

      dispatch(makeLoaderFalse());
      return res.data;
    } catch (error) {
      dispatch(makeLoaderFalse());
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Couldn't fetch user ",
          des: error.response ? error.response.data.msg : "Server error ",
        })
      );

      return rejectWithValue(error.message);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  "getPosts",
  async (postId, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get(`${api}posts/find/all`);
      dispatch(makeLoaderFalse());
      let filteredArr = res.data.filter((post) => post._id != postId);
      return filteredArr;
    } catch (error) {
      dispatch(makeLoaderFalse());
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Couldn't fetch postss ",
          des: error.response ? error.response.data : "Server error ",
        })
      );

      return rejectWithValue(error.message);
    }
  }
);

export const likePost = createAsyncThunk(
  "like",
  async ({ postId, userId }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.put(`${api}posts/like/${postId}/${userId}`);
      dispatch(getSinglePost(postId));
      dispatch(makeLoaderFalse());

      return res.data;
    } catch (error) {
      dispatch(makeLoaderFalse());
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Couldn't like post ",
          des: error.response ? error.response.data : "Server error ",
        })
      );
      return rejectWithValue(error.message);
    }
  }
);

export const removeLike = createAsyncThunk(
  "removeLike",
  async ({ postId, userId }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${api}posts/remove-like/${postId}/${userId}`
      );
      dispatch(getSinglePost(postId));
      dispatch(makeLoaderFalse());

      return res.data;
    } catch (error) {
      dispatch(makeLoaderFalse());
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Couldn't remove liked post ",
          des: error.response ? error.response.data : "Server error ",
        })
      );
      return rejectWithValue(error.message);
    }
  }
);

const singlePostSlice = createSlice({
  name: "single post",
  initialState: {
    allPosts: [],
    mainPost: {},
    postOwnerUsername: "",
    mainPostLikes: null,
    otherPosts: [],
    postOfUserId: "" || sessionStorage.getItem("id"),
    postOwner: {},
    mainPostId: null,
  },
  reducers: {
    sortPost: (state, action) => {
      state.otherPosts = action.payload;
    },
    changeMainPostId: (state, action) => {
      state.postOfUserId = action.payload;
    },
    changePostOwnerUserName: (state, action) => {
      state.postOwnerUsername = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.mainPost = action.payload;
        state.mainPostLikes = action.payload.likes;
        state.postOfUserId = action.payload.postedBy;
        sessionStorage.setItem("id", action.payload.postedBy);
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.postOwner = action.payload;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.otherPosts = action.payload;
      })
      .addCase(getUserNameOfPostOwner.fulfilled, (state, action) => {
        state.postOwnerUsername = action.payload.username;
      });
  },
});

export const { sortPost, changeMainPostId, changePostOwnerUserName } =
  singlePostSlice.actions;

export default singlePostSlice;
