import React from "react";
import { useSelector } from "react-redux";

const useCommentSelector = (props) => {
  const everyCom = useSelector((state) => state.comments);
  const { isLoading, userComment, commentsArray, showCommentModal } = everyCom;
  return {
    isLoading,
    userComment,
    commentsArray,
    showCommentModal,
  };
};

export default useCommentSelector;
