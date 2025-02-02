import React, { useEffect } from "react";
import Post from "../components/SinglePost/Post";
import Trending from "../components/Normal/Trending";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  changeMainPostId,
  getSinglePost,
  getUserNameOfPostOwner,
  sortPost,
} from "../features/singlePostSlice";
import { getAllPosts } from "../features/singlePostSlice";
import { getCommentsOfPosts } from "../features/commentsSlice";
import { getUserInfo } from "../features/singlePostSlice";
import useSinglePost from "../hooks/useSinglePost";

const SinglePostView = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { mainPost, postOfUserId, otherPosts, postOwner, mainPostId } =
    useSinglePost();
  const {
    createdAt,
    postCategory,
    postDescription,
    postTitle,
    thumbnail,
    _id,
    postedBy,
  } = mainPost;

  const { fullName, dp } = postOwner;

  const sortAlphabetically = () => {
    let newArrPosts = [...otherPosts];
    newArrPosts.sort((a, b) => {
      const titleA = a.postTitle.toLowerCase();
      const titleB = b.postTitle.toLowerCase();
      return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
    });

    dispatch(sortPost(newArrPosts));
  };

  const sortDateWise = () => {
    let newArrPosts = [...otherPosts];
    newArrPosts.sort((a, b) => {
      const dateA = new Date(a.createdAt); // Convert string to Date object
      const dateB = new Date(b.createdAt); // Convert string to Date object
      return dateB - dateA;
    });

    dispatch(sortPost(newArrPosts));
  };
  const handleChange = (e) => {
    if (e.target.value === "latest") {
      sortDateWise();
    } else {
      sortAlphabetically();
    }
  };

  useEffect(() => {
    let postId = location.pathname.split("/")[2];
    dispatch(getSinglePost(mainPostId || postId));
    dispatch(getAllPosts(mainPostId || postId));
    dispatch(getCommentsOfPosts(mainPostId || postId));
  }, [postOfUserId, mainPostId]);

  return (
    <>
      <main className="container sm:flex mx-auto ">
        <article className="sm:w-1/2 bg-white">
          <Post
            title={postTitle}
            des={postDescription}
            cat={postCategory}
            time={createdAt}
            thumbnail={thumbnail}
            author={fullName}
            postId={_id}
            picture={dp}
          />
        </article>

        <section className="my-2 mx-10 sm:w-1/2">
          <div className="flex items-center justify-between ">
            <h1 className="text-xl font-bold my-2 text-left mx-2">
              Other Posts
            </h1>
            <div>
              <span>Sort by :</span>
              <select
                name=""
                id=""
                className="h-10 bg-gray-50 outline-none"
                onChange={handleChange}
              >
                <option value="select" disabled>
                  Select
                </option>
                <option value="latest">Latest</option>
                <option value="A-Z">A-Z </option>
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap justify-between">
            {otherPosts.map((post) => {
              const {
                thumbnail,
                postTitle,
                postDescription,
                postCategory,
                createdAt,
                postedBy,
                _id,
              } = post;

              return (
                <Trending
                  key={_id}
                  title={postTitle}
                  des={postDescription}
                  cat={postCategory}
                  date={createdAt}
                  thumbnail={thumbnail}
                  postId={_id}
                  userId={postedBy}
                />
              );
            })}
          </div>
        </section>
      </main>
      {/* <PromptUserModal /> */}
    </>
  );
};

export default SinglePostView;
