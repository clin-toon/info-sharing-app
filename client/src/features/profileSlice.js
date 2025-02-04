import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  makeModalTrue,
  makeLoaderFalse,
  changeModalMessage,
} from "./modalSlices";
import axios from "axios";

const api = import.meta.env.VITE_API_URL;

export const profileFunc = createAsyncThunk(
  "profile",
  async ({ authUser, userToken }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get(`${api}profile/get/${authUser}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      dispatch(makeLoaderFalse());
      return res.data;
    } catch (error) {
      rejectWithValue(error);
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Something went wrong ",
          des: error.response ? error.reponse.data : "Server error",
        })
      );
      dispatch(makeLoaderFalse());
    }
    return rejectWithValue(error);
  }
);

export const updateFollowers = createAsyncThunk(
  "follow",
  async (
    { userId, token, username, postOwnerUserId },
    { dispatch, rejectWithValue }
  ) => {
    // console.log(userId, postOwnerUserId, username);
    console.log(username);
    try {
      const res = await axios.put(
        `${api}profile/followers/add/${username}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(makeLoaderFalse());
      dispatch(profileFunc({ authUser: postOwnerUserId, authToken: token }));
      return res.data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Sometning went wrong ",
          des: error.response ? error.reponse.data : "Server error",
        })
      );
      return rejectWithValue(error);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    fullName: null,
    followers: [],
    following: [],
    bio: null,
    dp: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profileFunc.fulfilled, (state, action) => {
        if (action.payload) {
          const { fullName, followers, following, bio, dp } = action.payload;
          state.fullName = fullName;
          state.followers = followers;
          state.following = following;
          state.bio = bio;
          state.dp = dp;
        }
      })
      .addCase(profileFunc.rejected, (state, action) => {})
      .addCase(profileFunc.pending, (state, action) => {
        state.fullName = null;
        state.followers = [];
        state.following = [];
        state.bio = null;
        state.dp = null;
      });
  },
});

export default profileSlice;
