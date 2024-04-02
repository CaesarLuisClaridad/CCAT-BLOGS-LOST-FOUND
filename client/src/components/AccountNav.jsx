import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const AccountNav = ({ selectedLink, setSelectedLink }) => {
  //array of links in account page
  const navLinks = [
    { to: "/profile", label: "Profile", icon: "bx bxs-user-account" },
    { to: "/userBlog", label: "Blog Post", icon: "bx bxs-book" },
    { to: "/userlostPost", label: "Lost&Found Post", icon: "bx bx-package" },
    { to: "/changePassword",label: "Change Password", icon: "bx bxs-lock-alt"},
  ];

  const handleLinkClick = (link) => {
    console.log(link);
    setSelectedLink(link);
  };

  return (
    <>
      <Nav
        defaultActiveKey="/home"
        className="d-flex justify-content-between flex-row flex-lg-column px-4 px-md-5 px-lg-1 py-3  "
      >
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="d-flex align-items-center no-underline no-border border-lg-only px-2"
          >
            <OverlayTrigger
              trigger="hover"
              placement="bottom"
              overlay={
                <Popover>
                  <Popover.Header as="h3"></Popover.Header>
                  <Popover.Body>
                    <strong>{link.label}</strong>
                  </Popover.Body>
                </Popover>
              }
            >           
              <i class={`${link.icon} account-icon p-2 p-lg-0 fs-5`}></i>
            </OverlayTrigger>
            <Nav.Link className="d-none d-lg-block w-100"  onClick={() => handleLinkClick(link.to)}>
              {link.label}
            </Nav.Link>
          </Link>
        ))}
      </Nav>
    </>
  );
};

export default AccountNav;
