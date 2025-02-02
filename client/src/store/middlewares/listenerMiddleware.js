import { createListenerMiddleware } from "@reduxjs/toolkit";
import { makeLoaderFalse, makeLoaderTrue } from "../../features/modalSlices";
import { setError } from "../../features/errorSlice";
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  predicate: (action) => {
    if (action.type.startsWith("gettingHomePagePosts")) {
      return false;
    }
    return action.type.endsWith("/pending");
  },

  effect: (action, { dispatch }) => {
    dispatch(makeLoaderTrue()); // Trigger modal or another action on pending
  },
});

listenerMiddleware.startListening({
  predicate: (action) => {
    return action.type.endsWith("/rejected");
  },

  effect: (action, { dispatch }) => {
    dispatch(setError("Server error. Please try again later."));
    dispatch(makeLoaderFalse()); // Optionally stop the loader after error
  },
});

export default listenerMiddleware;
