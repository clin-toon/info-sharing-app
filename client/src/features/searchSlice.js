import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  makeModalTrue,
  makeLoaderFalse,
  changeModalMessage,
} from "./modalSlices";

const api = import.meta.env.VITE_API_URL;
export const searchForPosts = createAsyncThunk(
  "search/searchForPosts",
  async (searchValue, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.get(`${api}posts/search?q=${searchValue}`);

      dispatch(makeLoaderFalse());
      return res.data.results;
    } catch (error) {
      dispatch(makeLoaderFalse());
      dispatch(makeModalTrue());
      dispatch(
        changeModalMessage({
          title: "Something went wrong ",
          des: `${error.response ? error.response.data : "Server error "}`,
        })
      );
      return rejectWithValue(error.response.data);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchParameter: "",
    searchPosts: [],
    selectedLink: null,
    failedMsg: false,
    hide: false,
  },
  reducers: {
    getSearchElem: (state, action) => {
      state.searchParameter = action.payload;
    },
    changeSelectedLink: (state, action) => {
      state.selectedLink = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchForPosts.pending, (state) => {
        state.success = true;
        state.hide = true;
      })
      .addCase(searchForPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchPosts = action.payload;
        state.failedMsg = false;
        state.hide = false;
      })
      .addCase(searchForPosts.rejected, (state) => {
        state.searchPosts = [];
        state.failedMsg = true;
        state.hide = false;
      });
  },
});

export const { getSearchElem, changeSelectedLink } = searchSlice.actions;
export default searchSlice;
