import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Sidebar = () => {
  return (
    <>
      <div className="vh-100 overflow-hidden top-0 overflow-y-auto position-fixed" >
        <div className="d-flex align-items-center p-2">
          <div>
             <img src={logo} className="logo me-2" alt="Logo" />
          </div>
          <div>
             <span className="fs-5 fw-bold">CCAT-BLOGS</span>
          </div> 
        </div>
        <div className="list-group list-group-flush overflow-hidden">
          <Link to="/" className="list-group-item py-3">
            <i class="bi bi-house-fill me-4"></i>
            <span>Blogs</span>
          </Link>

          <Link to="/blog" className="list-group-item py-3">
            <i class="bi bi-info-square-fill me-4"></i>
            <span>About</span>
          </Link>

          <Link to="/post" className="list-group-item py-3">
            <i class="bi bi-postcard-fill me-4"></i>
            <span>Post Blog</span>
          </Link>

          <Link to="/postItem" className="list-group-item py-3">
            <i class="bi bi-pencil-square me-4"></i>
            <span>Post Item</span>
          </Link>

          <Link to="/allItemPost" className="list-group-item py-3">
            <i class="bi bi-search me-4"></i>
            <span>Lost and Found</span>
          </Link>

          <Link to="/account" className="list-group-item py-3">
            <i class="bi bi-person-fill me-4"></i>
            <span>Account</span>
          </Link>

        </div>
      </div>
    </>
  );
};

export default Sidebar;
