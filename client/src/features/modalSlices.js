import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isLoading: false,
    showModal: false,
    modalMessage: {
      title: "",
      des: "",
    },
  },
  reducers: {
    makeLoaderFalse: (state) => {
      state.isLoading = false;
    },
    makeLoaderTrue: (state) => {
      state.isLoading = true;
    },
    makeModalFalse: (state) => {
      state.showModal = false;
    },
    makeModalTrue: (state) => {
      state.showModal = true;
    },
    changeModalMessage: (state, action) => {
      state.modalMessage.title = action.payload.title;
      state.modalMessage.des = action.payload.des;
    },
  },
});

export const {
  makeModalFalse,
  makeModalTrue,
  makeLoaderFalse,
  makeLoaderTrue,
  changeModalMessage,
} = modalSlice.actions;

export default modalSlice;
