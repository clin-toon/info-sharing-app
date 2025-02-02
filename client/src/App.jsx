import "./App.css";
import React, { Suspense, useEffect } from "react";
import ServerErrorModal from "./components/Reusable/ServerErrorModal";
const HomePage = React.lazy(() => import("./pages/HomePage"));
const SinglePostView = React.lazy(() => import("./pages/SinglePostView"));
const SearchResult = React.lazy(() => import("./pages/SearchResult"));
const NavigationBar = React.lazy(() =>
  import("./components/Reusable/NavigationBar")
);
const Footer = React.lazy(() => import("./components/Reusable/Footer"));
const CreatePost = React.lazy(() => import("./pages/CreatePost"));
const ViewPosts = React.lazy(() => import("./pages/ViewPosts"));
const SavedPosts = React.lazy(() => import("./pages/SavedPosts"));
const YourProfile = React.lazy(() => import("./pages/YourProfile"));
const ProfileSettings = React.lazy(() => import("./pages/ProfileSettings"));
const Trending = React.lazy(() => import("./components/Normal/Trending"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const ScrollToTop = React.lazy(() => import("./pages/ScrollToTop"));
const SignUp = React.lazy(() => import("./components/Normal/SignUp"));
const Login = React.lazy(() => import("./components/Normal/Login"));
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/Reusable/Loader";
import FallbackUI from "./components/Reusable/FallBackUI";
import ErrorComp from "./components/Reusable/ErrorComp";
import useAppSelector from "./hooks/useAppSelector";

function App() {
  useEffect(() => {
    window.innerHeight = 0;
  }, []);

  const { isLoggedIn, showLoader, showModal, modalMsg, errorMessage } =
    useAppSelector();

  return (
    <>
      <Suspense fallback={<FallbackUI />}>
        <BrowserRouter
          future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
        >
          <ScrollToTop />
          <header className="sticky top-0 z-50">
            <NavigationBar />
          </header>
          {showLoader && <Loader />}
          {showModal && <ServerErrorModal msg={modalMsg} />}
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/single-post/:id"
                element={
                  errorMessage === null ? (
                    <SinglePostView />
                  ) : (
                    <ErrorComp errorMessage={errorMessage} />
                  )
                }
              />
              <Route path="/trending-posts" element={<Trending />} />
              <Route path="/search" element={<SearchResult />} />
              <Route
                path="/dashboard/"
                element={
                  isLoggedIn ? (
                    errorMessage === null ? (
                      <CreatePost />
                    ) : (
                      <ErrorComp />
                    )
                  ) : (
                    <NotFoundPage />
                  )
                }
              ></Route>
              <Route
                path="/signup"
                element={!isLoggedIn ? <SignUp /> : <HomePage />}
              />
              <Route
                path="/login"
                element={!isLoggedIn ? <Login /> : <HomePage />}
              />
              <Route
                path="/dashboard/create-post"
                element={isLoggedIn ? <CreatePost /> : <NotFoundPage />}
              ></Route>
              <Route
                path="/dashboard/your-post/:id"
                element={isLoggedIn ? <ViewPosts /> : <NotFoundPage />}
              ></Route>
              <Route
                path="/dashboard/profile/:id"
                element={isLoggedIn ? <YourProfile /> : <NotFoundPage />}
              ></Route>
              <Route
                path="/dashboard/settings"
                element={isLoggedIn ? <ProfileSettings /> : <NotFoundPage />}
              ></Route>

              <Route
                path="/dashboard/saved-posts/:id"
                element={
                  isLoggedIn ? <SavedPosts saved={true} /> : <NotFoundPage />
                }
              ></Route>

              <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
          </main>
          <footer className="">{!isLoggedIn && <Footer />}</footer>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
