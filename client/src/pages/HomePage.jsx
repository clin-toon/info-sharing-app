import React, { useEffect, useState } from "react";
import Trending from "../components/Normal/Trending";
import About from "../components/Normal/About";
import Hero from "../components/Normal/Hero";
import { useDispatch, useSelector } from "react-redux";
import { homePagePosts } from "../features/postSlices";
import { profileFunc } from "../features/profileSlice";
import { displayOnlyFollowingPost } from "../features/postSlices";
import ErrorComp from "../components/Reusable/ErrorComp";
import useAppSelector from "../hooks/useAppSelector";

const HomePage = () => {
  const [showAllPosts, setShowAllPosts] = useState(true);
  const [failedToFetchPosts, setFailedToFetchPosts] = useState(false);
  const dispatch = useDispatch();

  const { isLoggedIn, allPosts, userToken, authUser, errorMessage } =
    useAppSelector();

  useEffect(() => {
    if (showAllPosts) {
      dispatch(homePagePosts(isLoggedIn));
    }
    if (authUser != null) {
      dispatch(profileFunc({ authUser, userToken }));
    }
  }, [isLoggedIn, showAllPosts]);

  return (
    <>
      <section className="container mx-auto">
        <Hero />
      </section>

      <main className=" container flex justify-center flex-col items-center my-2 mx-auto  ">
        {errorMessage === null ? (
          <section className=" md:mx-20 ">
            <div className="flex items-center justify-between my-5">
              {failedToFetchPosts ? (
                <h1 className="text-xl font-bold my-3 text-center mx-2 ">
                  Oops! Something went wrong. Unable to fetch posts.
                </h1>
              ) : (
                <div className="flex items-center justify-center">
                  <h1
                    className={`text-2xl font-bold my-1 text-center mx-2 cursor-pointer hover:text-gray-500 ${
                      showAllPosts && " text-gray-500"
                    } `}
                  >
                    Popular Posts
                  </h1>
                </div>
              )}
            </div>
            <div className="  flex flex-col sm:flex-row flex-wrap justify-between ">
              {allPosts.length === 0 ? (
                <h1 className="text-xl ml-10">Fetching posts.....</h1>
              ) : (
                allPosts.map((post) => {
                  return (
                    <Trending
                      key={post._id}
                      thumbnail={post.thumbnail}
                      title={post.postTitle}
                      postId={post._id}
                      date={post.createdAt}
                      userId={post.postedBy}
                    />
                  );
                })
              )}
            </div>
          </section>
        ) : (
          <ErrorComp />
        )}

        <section className="items-center flex justify-center">
          {!isLoggedIn && <About />}
        </section>
      </main>
    </>
  );
};

export default HomePage;
