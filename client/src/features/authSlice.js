import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  makeModalTrue,
  makeLoaderFalse,
  changeModalMessage,
} from "./modalSlices";
import { profileFunc } from "./profileSlice";

const api = import.meta.env.VITE_API_URL;

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post(`${api}auth/login`, credentials);
      dispatch(makeLoaderFalse());
      const userId = res.data.user.userId;
      const token = res.data.jwt;
      dispatch(profileFunc({ authUser: userId, userToken: token }));
      return res.data;
    } catch (error) {
      dispatch(makeLoaderFalse());

      if (error.response.status === 429) {
        dispatch(makeLimitErrorTrue());
        return rejectWithValue(error.response.data);
      }
      dispatch(makeLimitErrorFalse());
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Failed to Login",
          des: `Log in failed. ${
            error.response ? error.response.data.message : "Server error "
          }`,
        })
      );

      return rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (details, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post(`${api}auth/register`, details);
      dispatch(makeLoaderFalse());
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Created Account",
          des: "Your account has been created succesfully.",
        })
      );
      return res.data;
    } catch (error) {
      dispatch(makeLoaderFalse());
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Failed to create account  ",
          des: ` Account creation failed. ${
            error.response ? error.response.data : "Server error "
          } `,
        })
      );
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: "" || JSON.parse(localStorage.getItem("user")),
    token: "" || localStorage.getItem("userToken"),
    isLoggedIn: null || JSON.parse(localStorage.getItem("isLoggedIn")),
    username: "" || JSON.parse(localStorage.getItem("username")),
    rateLimitError: false,
  },
  reducers: {
    logout: (state) => {
      state.user = "";
      state.token = "";
      state.isLoggedIn = null;
      localStorage.removeItem("user"); // Remove from local storage
      localStorage.removeItem("userToken");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
    },
    makeLimitErrorTrue: (state) => {
      state.rateLimitError = true;
    },
    makeLimitErrorFalse: (state) => {
      state.rateLimitError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user.userId;
      state.token = action.payload.jwt;
      state.username = action.payload.user.username;
      localStorage.setItem("userToken", action.payload.jwt);
      localStorage.setItem("user", JSON.stringify(action.payload.user.userId));
      localStorage.setItem(
        "username",
        JSON.stringify(action.payload.user.username)
      );
      localStorage.setItem("isLoggedIn", true);
    });
  },
});

export const { logout, makeLimitErrorFalse, makeLimitErrorTrue } =
  authSlice.actions;
export default authSlice;
