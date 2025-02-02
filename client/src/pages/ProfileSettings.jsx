import React, { useState } from "react";
import UserSideBarDashBoard from "../components/Normal/UserSideBarDashBoard";
import ProfileInfo from "../components/Profile/ProfileInfo";
import EditProfileModal from "../components/Profile/EditProfileModal";

const ProfileSettings = () => {
  const [editProfile, setEditProfile] = useState(false);

  const handleEditProfile = () => {
    setEditProfile(true);
  };

  const handleCancelProfile = () => {
    setEditProfile(false);
  };

  return (
    <>
      {editProfile && <EditProfileModal onCancel={handleCancelProfile} />}
      <div className="relative">
        <div className="absolute -top-4">
          <UserSideBarDashBoard />
        </div>

        <div className="mt-4 sm:translate-x-72 sm:w-3/4">
          <ProfileInfo onEdit={handleEditProfile} />
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
