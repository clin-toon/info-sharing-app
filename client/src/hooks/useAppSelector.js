import { useSelector } from "react-redux";

const useAppSelector = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const authUser = useSelector((state) => state.auth.user);
  const authToken = useSelector((state) => state.auth.token);
  const allPosts = useSelector((state) => state.posts.lauda);

  const follwingUserAccounts = useSelector((state) => state.profile.following);
  const showLoader = useSelector((state) => state.modal.isLoading);
  const showModal = useSelector((state) => state.modal.showModal);
  const modalMsg = useSelector((state) => state.modal.modalMessage);
  const errorMessage = useSelector((state) => state.error.errorMessage);

  return {
    isLoggedIn,
    showLoader,
    showModal,
    modalMsg,
    errorMessage,
    authToken,
    allPosts,
    authUser,
    follwingUserAccounts,
  };
};

export default useAppSelector;
