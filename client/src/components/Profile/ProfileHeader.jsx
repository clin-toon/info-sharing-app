import { useSelector, useDispatch } from "react-redux";

const ProfileHeader = ({}) => {
  const profile = useSelector((state) => state.profile);

  return (
    <div className=" mt-5">
      <div className=" mx-10 mt-3 p-3 flex justify items-center flex-row ">
        <section>
          <img
            src={profile.dp}
            alt="profile_picture"
            className="h-12 w-12 md:h-36 md:w-36 rounded-full"
          />
          <h1 className="text-lg font-bold mt-3">{profile.fullName} </h1>
          <h1 className="max-w-60 text-md">
            {profile.bio != "" ? profile.bio : "No bio"}
          </h1>
        </section>
        <section className="flex items-center justify-center mx-3">
          <section className="flex flex-col items-center mx-1">
            <h1 className="text-xl font-bold placeholder:">
              {profile.followers.length}
            </h1>
            <h1>Posts</h1>
          </section>

          <section className="flex flex-col items-center mx-1">
            <h1 className="text-xl font-bold placeholder:">
              {profile.followers.length}
            </h1>
            <h1>Followers</h1>
          </section>

          <section className="flex flex-col items-center">
            <h1 className="text-xl font-bold placeholder:">
              {profile.following.length}
            </h1>
            <h1>Following</h1>
          </section>
        </section>
      </div>
    </div>
  );
};

export default ProfileHeader;
