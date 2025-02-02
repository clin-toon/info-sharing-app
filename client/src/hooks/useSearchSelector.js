import { useSelector } from "react-redux";

const useSearchSelector = () => {
  const searchResultsArray = useSelector((state) => state.search.searchPosts); // getting search posts from store
  const success = useSelector((state) => state.search.failedMsg); // getting search posts from store
  const searchParameter = useSelector((state) => state.search.searchParameter);
  const hide = useSelector((state) => state.search.hide);
  return {
    searchResultsArray,
    success,
    searchParameter,
    hide,
  };
};

export default useSearchSelector;
