import React, { useEffect } from "react";
import SearchRes from "../components/Normal/SearchRes";
import { useDispatch } from "react-redux";
import { searchForPosts } from "../features/searchSlice";
import NoSearchResults from "../components/Normal/NoSearchResults";
import { useLocation } from "react-router-dom";
import FailedSearch from "../components/Normal/FailedSearch";
import useSearchSelector from "../hooks/useSearchSelector";

const SearchResult = () => {
  let loading = true;
  const dispatch = useDispatch();
  const location = useLocation();

  const { searchResultsArray, success, searchParameter, hide } =
    useSearchSelector();

  useEffect(() => {
    if (searchParameter === "") {
      let params = location.search.split("=")[1];
      dispatch(searchForPosts(params));
      return;
    }

    dispatch(searchForPosts(searchParameter));
  }, [searchParameter]);

  return (
    <>
      {!hide && (
        <main className="sm:mx-52">
          {loading && <p></p>}
          {success === true ? (
            <FailedSearch />
          ) : (
            <div>
              {searchResultsArray.length === 0 ? (
                <NoSearchResults />
              ) : (
                searchResultsArray.map((post) => {
                  const {
                    createdAt,
                    postCategory,
                    postDescription,
                    postTitle,
                    postedBy,
                    thumbnail,
                    _id,
                  } = post;

                  return (
                    <SearchRes
                      key={_id}
                      title={postTitle}
                      des={postDescription}
                      cat={postCategory}
                      time={createdAt}
                      thumbnail={thumbnail}
                      author={postedBy.username}
                      userId={postedBy._id}
                      postId={_id}
                    />
                  );
                })
              )}
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default SearchResult;
