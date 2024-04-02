import React from "react";
import { Link } from "react-router-dom";
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
        className="d-flex justify-content-between flex-row flex-lg-column px-4 px-md-5 px-lg-1 py-3  text-success "
      >
        {ItemLinks.map((link) => (
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

            <Nav.Link className="d-none d-lg-block w-100" onClick={() => handleItemLinkClick(link.to)}>
              {link.label}
            </Nav.Link>
          </Link>
        ))}
      </Nav>
    </>
  );
};

export default LostandFoundNav;
