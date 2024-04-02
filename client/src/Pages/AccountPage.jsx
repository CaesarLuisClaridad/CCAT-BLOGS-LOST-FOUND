import { useState } from "react";
import { UseAuthContext } from "../hooks/UseAuthContext";
import BlogPostPage from "./BlogPostPage";
import LostPost from "./LostPost";
import ProfilePage from "./ProfilePage";
import ChangePasswordPage from "./ChangePasswordPage";
import AccountNav from "../components/AccountNav";

const AccountPage = () => {
 
  const [selectedLink, setSelectedLink] = useState("/profile");
    const { user } = UseAuthContext();

  return (
    <>
      <div className="bg-light">
        {user && (
          <div className="container">
            <div className="row flex-column flex-lg-row">
              <div className="col-12 col-md-3 col-lg-2 border py-1 p-0 d-none d-lg-block ">
                  <AccountNav selectedLink={selectedLink} setSelectedLink={setSelectedLink}/>
              </div>
              <div className="col border p-0 vh-100">
                {selectedLink === "/profile" &&  (
                  <div>
                    <ProfilePage />
                  </div>
                )}
                {selectedLink === "/userBlog" &&  (
                  <div>
                    <BlogPostPage />
                  </div>
                )}
                {selectedLink === "/userlostPost" &&  (
                  <div>         
                    <LostPost />
                  </div>
                )}
                {selectedLink === "/changePassword" &&  (
                  <div>                
                    <ChangePasswordPage />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AccountPage;
