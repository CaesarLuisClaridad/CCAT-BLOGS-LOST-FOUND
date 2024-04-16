import React from "react";
import { Link, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

const LostandFoundNav = ({ selectedItemLink, setSelectedItemLink }) => {
  const ItemLinks = [
    { to: "/LFpage", label: "All", icon: "bi bi-basket" },
    { to: "/allFoundItem", label: "Found", icon: "bi bi-luggage" },
    { to: "/allLostItem", label: "Lost", icon: "bi bi-search" },
  ];

 
  const handleItemLinkClick = (link) => {
    console.log(link);
    if (setSelectedItemLink) {
      setSelectedItemLink(link);
    }
  };

  return (
    <>
      <Nav
        defaultActiveKey="/home"
        className="d-flex justify-content-evenly flex-row flex-xl-column px-1 px-md-5 px-lg-1 py-3  text-success "
      >
        {ItemLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}        
            className="d-flex align-items-center no-underline no-border border-lg-only px-2 hover-active"
            activeClassName="active" 
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
              <i class={`${link.icon} account-icon p-2 p-lg-0 fs-5 hover-active`}></i>
            </OverlayTrigger>

            <Nav.Link className="d-none d-xl-block w-100 hover-active" onClick={() => handleItemLinkClick(link.to)}>
              {link.label}
            </Nav.Link>
          </NavLink>
        ))}
      </Nav>
    </>
  );
};

export default LostandFoundNav;
