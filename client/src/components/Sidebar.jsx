import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Sidebar = () => {

  return (
    <>
      <div className="vh-100  overflow-hidden top-0 overflow-y-auto fixed-sidebar  " >
        <div className="d-flex align-items-center p-2">
          <div>
             <img src={logo} className="logo me-2" alt="Logo" />
          </div>
          <div>
             <span className="fs-6 fw-bold">CCAT-BLOGS</span>
          </div> 
        </div>
        <div className="list-group list-group-flush overflow-hidden">
          <NavLink to="/" className="list-group-item py-3 hover-active" activeClassName="active">
            <i class="bi bi-house-fill me-4"></i>
            <span>Blogs</span>
          </NavLink>

          <NavLink to="/blog" className="list-group-item py-3 hover-active" activeClassName="active">
            <i class="bi bi-info-square-fill me-4"></i>
            <span>About</span>
          </NavLink>

          <NavLink to="/post" className="list-group-item py-3 hover-active" activeClassName="active">
            <i class="bi bi-postcard-fill me-4"></i>
            <span>Post Blog</span>
          </NavLink>

          <NavLink to="/postItem" className="list-group-item py-3 hover-active" activeClassName="active">
            <i class="bi bi-pencil-square me-4"></i>
            <span>Post Item</span>
          </NavLink>

          <NavLink to="/allItemPost" className="list-group-item py-3 hover-active" activeClassName="active">
            <i class="bi bi-search me-4"></i>
            <span>Lost and Found</span>
          </NavLink>

          <NavLink to="/account" className="list-group-item py-3 hover-active" activeClassName="active">
            <i class="bi bi-person-fill me-4"></i>
            <span>Account</span>
          </NavLink>

        </div>
      </div>
    </>
  );
};

export default Sidebar;
