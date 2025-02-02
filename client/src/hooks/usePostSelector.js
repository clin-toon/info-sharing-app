import { useSelector } from "react-redux";

const usePostSelector = () => {
  const posts = useSelector((state) => state.posts);
  const everyPosts = useSelector((state) => state.posts.posts);
  const { lauda, isLoading, idOfEditingPost, idOfDeletingPost, allPosts } =
    posts;

  return {
    everyPosts,
    lauda,
    isLoading,
    idOfDeletingPost,
    idOfEditingPost,
    allPosts,
  };
};

export default usePostSelector;
