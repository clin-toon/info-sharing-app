import React from "react";
import UserSideBarDashBoard from "../components/Normal/UserSideBarDashBoard";
import CreateBlog from "../components/Normal/CreateBlog";

const CreatePost = () => {
  return (
    <>
      <div className="flex ">
        <div>
          <UserSideBarDashBoard />
        </div>

        <div className="sm:transform sm:translate-x-96">
          <CreateBlog />
        </div>
      </div>
    </>
  );
};

export default CreatePost;
