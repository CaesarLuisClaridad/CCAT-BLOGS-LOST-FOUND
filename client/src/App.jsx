import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import PostPage from "./Pages/PostPage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import AccountPage from "./Pages/AccountPage";
import BlogPostPage from "./Pages/BlogPostPage";
import LostPost from "./Pages/LostPost";
import ProfilePage from "./Pages/ProfilePage";
import ItemPostPage from "./Pages/ItemPostPage";
import LostAndFoundPage from "./Pages/LostAndFoundPage";
import ChangePasswordPage from "./Pages/ChangePasswordPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import CreateNewPassword from "./Pages/CreateNewPassword";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AllFoundItem from "./Pages/AllFoundItem";
import AllLostItem from "./Pages/AllLostItem";
import { UseAuthContext } from "./hooks/UseAuthContext";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Notification from "./components/Notification";
import AllItemPost from "./Pages/AllItemPost";

function App() {
  const { user } = UseAuthContext();
  const [toggle, setToggle] = useState(true);

  const Toggle = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  return (
    <>
      <div className="container-fluid min-vh-100">
        <BrowserRouter>
          <div className="row p-0 ">
            {toggle && user && (
              <div className="col-2 p-0 overflow-hidden border d-none d-xl-block">
                <Sidebar Toggle={Toggle} />
              </div>
            )}
            <div className="col p-0 m-0 ">
              {user && <Navbar Toggle={Toggle} />}
              <Toaster
                containerStyle={{
                  position: "relative", // Use fixed to position relative to the viewport
                  top: "20px",
                  left: "50%", // Center horizontally
                  transform: "translateX(-50%)", // Adjust for true centering
                  maxWidth: "90%", // Prevents overflow by limiting width
                  zIndex: 9999, // Ensures toast is above other content
                }}    
              />
              <Routes>
                <Route
                  path="/"
                  element={user ? <HomePage /> : <Navigate to="/login" />}
                />
                <Route
                  path="/blog"
                  element={user ? <AboutPage /> : <Navigate to="/login" />}
                />
                <Route
                  path="/post"
                  element={user ? <PostPage /> : <Navigate to="/login" />}
                />
                <Route
                  path="/postItem"
                  element={user ? <ItemPostPage /> : <Navigate to="/login" />}
                />
                <Route
                  path="/account"
                  element={user ? <AccountPage /> : <Navigate to="/" />}
                />
                <Route
                  path="/profile"
                  element={user ? <ProfilePage /> : <Navigate to="/" />}
                />
                <Route
                  path="/userBlog"
                  element={user ? <BlogPostPage /> : <Navigate to="/" />}
                />
                <Route
                  path="/changePassword"
                  element={user ? <ChangePasswordPage /> : <Navigate to="/" />}
                /> 
                <Route
                  path="/userlostPost"
                  element={user ? <LostPost /> : <Navigate to="/" />}
                />
                <Route
                  path="/notifications"
                  element={user ? <Notification /> : <Navigate to="/" />}
                />
                <Route
                  path="/login"
                  element={!user ? <LoginPage /> : <Navigate to="/blog" />}
                />
                <Route
                  path="/signup"
                  element={!user ? <SignupPage /> : <Navigate to="/" />}
                />
                 <Route
                  path="/forgotPassword"
                  element={!user ? <ForgotPasswordPage /> : <Navigate to="/" />}
                />
                 <Route
                  path="/createNewPassword"
                  element={!user ? <CreateNewPassword /> : <Navigate to="/" />}
                />
                 <Route
                  path="/allFoundItem"
                  element={user ? <AllFoundItem /> : <Navigate to="/" />}
                />
                 <Route
                  path="/allLostItem"
                  element={user ? <AllLostItem /> : <Navigate to="/" />}
                />
                 <Route
                  path="/LFpage"
                  element={
                    user ? <LostAndFoundPage /> : <Navigate to="/login" />
                  }
                />
                 <Route
                  path="/allItemPost"
                  element={
                    user ? <AllItemPost /> : <Navigate to="/login" />
                  }
                />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
