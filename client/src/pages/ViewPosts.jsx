import React, { useEffect, useState } from "react";
import UserSideBarDashBoard from "../components/Normal/UserSideBarDashBoard";
import DeleteConfirmationModal from "../components/YourPosts/DeleteConfirmationModal";
import EditBlog from "../components/YourPosts/EditBlog";
import YourPostElem from "../components/YourPosts/YourPostElem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPostsOfUser } from "../features/postSlices";
import ErrorComp from "../components/Reusable/ErrorComp";
import useAppSelector from "../hooks/useAppSelector";

const ViewPosts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleEditPost = () => {
    setShowEdit(true);
  };

  const posts = useSelector((state) => state.posts.posts);

  const { authUser, authToken, errorMessage } = useAppSelector();

  const cancelEdit = () => [setShowEdit(false)];
  const handleDeletePost = () => {
    setShowDelete(true);
  };

  const cancelDeletePost = () => {
    setShowDelete(false);
  };

  const handleCreatePost = () => {
    navigate("/dashboard/create-post");
  };

  useEffect(() => {
    dispatch(getPostsOfUser({ authUser, authToken }));
  }, []);

  return (
    <>
      {showDelete && <DeleteConfirmationModal onCancel={cancelDeletePost} />}
      {showEdit && <EditBlog cancelEdit={cancelEdit} />}
      <div className="relative">
        <div className="absolute -top-4">
          <UserSideBarDashBoard />
        </div>

        {errorMessage === null ? (
          <div className="sm:flex flex-wrap items-center justify-start sm:translate-x-80 sm:w-3/4">
            {posts.length === 0 ? (
              <h1 className="h-[35vh] my-16">
                There are no posts to display.{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={handleCreatePost}
                >
                  Create one{" "}
                </span>
              </h1>
            ) : (
              posts.map((post) => {
                return (
                  <YourPostElem
                    onDelete={handleDeletePost}
                    onEdit={handleEditPost}
                    title={post.postTitle}
                    des={post.postDescription}
                    cat={post.postCategory}
                    thumbnail={post.thumbnail}
                    date={post.createdAt}
                    key={post._id}
                    pId={post._id}
                  />
                );
              })
            )}
          </div>
        ) : (
          <ErrorComp />
        )}
      </div>
    </>
  );
};

export default ViewPosts;
