import { useEffect } from "react";
import UserSideBarDashBoard from "../components/Normal/UserSideBarDashBoard";
import ProfileHeader from "../components/Profile/ProfileHeader";
import YourPostElem from "../components/YourPosts/YourPostElem";
import { useSelector, useDispatch } from "react-redux";
import { profileFunc } from "../features/profileSlice";
import ErrorComp from "../components/Reusable/ErrorComp";
import useAppSelector from "../hooks/useAppSelector";

const YourProfile = () => {
  const dispatch = useDispatch();
  const { authUser, authToken, errorMessage } = useAppSelector();
  useEffect(() => {
    dispatch(profileFunc({ authUser, authToken }));
  }, []);

  return (
    <div className="relative">
      <div className="absolute -top-4">
        <UserSideBarDashBoard />
      </div>
      {errorMessage === null ? (
        <div className="sm:translate-x-80 sm:w-3/4">
          <ProfileHeader />
        </div>
      ) : (
        <ErrorComp />
      )}
    </div>
  );
};

export default YourProfile;
