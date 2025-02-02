import React from "react";

const ProfileInfo = ({
  name,
  profilePicture,
  bio,
  email,
  password,
  onEdit,
}) => {
  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg"
          }
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
      </div>

      {/* Name */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold"></h3>
        <p className="text-gray-700">{"Ramesh Shrawan"}</p>
      </div>

      {/* Bio */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Bio</h3>
        <p className="text-gray-700">{"Muji randiko ban talai kina cahyo"}</p>
      </div>

      {/* Email */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Email</h3>
        <p className="text-gray-700">{"test@gmail.com"}</p>
      </div>

      {/* Password */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Password</h3>
        <p className="text-gray-700">********</p>
      </div>

      {/* Edit Profile Button */}
      <div className="flex justify-center mt-6">
        <button
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition duration-200"
          onClick={onEdit}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
