import React from "react";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { UseLogout } from "../hooks/UseLogout";
import { Link } from "react-router-dom";
import { UseAuthContext } from "../hooks/UseAuthContext";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Notification from "./Notification";

const Navbar = ({ Toggle }) => {
  const { logout } = UseLogout();
  const { user } = UseAuthContext();
  const [show, setShow] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/notif/notifications`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log("API response data:", data);
        setNotifications(data.notifications);
        setNotificationCount(data.unreadCount);
      } catch (error) {
        console.log("error in fetchNotification", error);
      }
    };
    fetchNotification();
  }, [user]);

  const handleToggleNotifications = () => {
    setIsNotificationsOpen((prev) => !prev);
    if (!isNotificationsOpen) {
      // This will open the notifications, so it will reset the count
      resetNotificationCount();
    }
  };

  const resetNotificationCount = async () => {
    // will mark the notification as read
    try {
      await fetch(`http://localhost:5000/notif/notificationCount`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      setNotificationCount(0);
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark border bg-light shadow position-sticky top-0 z-1">
        <div className="container-fluid d-flex justify-content-between">
          <div>
            {user && (
              <div className="py-2 px-1">
                <Link to="/" className="d-xl-none cursor-pointer">
                    <img src={logo} className="logo" alt="Logo" />
                </Link>
                <i
                  className="navbar-brand bi bi-justify-left text-success p-1 d-none d-xl-block"
                  onClick={Toggle}
                ></i>
                <button
                  className="navbar-toggler d-none d-lg-none"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsibleNavId"
                  aria-controls="collapsibleNavId"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                ></button>
              </div>
            )}
          </div>

          <div>
            {/*notification*/}
            <div className="d-flex align-items-center mx-2">
              {user && (
                <Dropdown
                  show={isNotificationsOpen}
                  onToggle={handleToggleNotifications}
                >
                  <Dropdown.Toggle
                    variant=""
                    id="dropdown-custom-components"
                    bsPrefix="p-0"
                    className="outline-0 border-0 p-0 m-0"
                  >
                    <div className="me-3 position-relative">
                      <i class="bx bxs-bell fs-4 notification"></i>
                      <span className="notification-count">
                        {notificationCount}
                      </span>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className=" p-0 overflow-hidden mt-2 custom-dropdown-menu">
                    <div className="pt-2 px-3">
                      <h3 className="m-0 fs-3 fw-bold ">Notifications</h3>
                    </div>
                    <Dropdown.Item>
                      <Notification />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}

              {user && (
                <div className="me-3 d-none d-md-block">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="btn btn-outline-success"
                      id="dropdown-basic"
                      className="d-flex align-items-center"
                    >
                      <i class="bx bx-user-circle"></i>
                      <span className="p-1">{user.username}</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleLogout}>
                        <span>Log out</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}

              {/*-Off-Canvas-*/}
              <div>
                <Button
                  variant="primary"
                  className="d-block d-xl-none"
                  onClick={handleShow}
                >
                  <i class="bi bi-list"></i>
                </Button>

                <Offcanvas placement="end" show={show} onHide={handleClose}>
                  <div className="d-flex justify-content-end p-2 fs-5">
                    <Offcanvas.Header closeButton></Offcanvas.Header>
                  </div>
                  <Offcanvas.Body>
                    <div className="vh-100 overflow-hidden top-0 overflow-y-auto">
                      <div className="list-group list-group-flush overflow-hidden">
                        <Link
                          to="/"
                          className="d-flex align-items-center list-group-item py-3"
                        >
                          <i class="bi bi-house-fill me-4 fs-3 "></i>
                          <span>Blogs</span>
                        </Link>

                        <Link
                          to="/blog"
                          className="d-flex align-items-center list-group-item py-3 text-end"
                        >
                          <i class="bi bi-info-square-fill me-4 fs-3"></i>
                          <span>About</span>
                        </Link>

                        <Link
                          to="/post"
                          className="d-flex align-items-center list-group-item py-3 text-end"
                        >
                          <i class="bi bi-postcard-fill me-4 fs-3"></i>
                          <span>Post Blog</span>
                        </Link>

                        <Link
                          to="/postItem"
                          className="d-flex align-items-center list-group-item py-3 text-end"
                        >
                          <i class="bi bi-pencil-square me-4 fs-3"></i>
                          <span>Post Item</span>
                        </Link>

                        <Link
                          to="/LFpage"
                          className="d-flex align-items-center list-group-item py-3 text-end"
                        >
                          <i class="bi bi-search me-4 fs-3"></i>
                          <span>Lost and Found</span>
                        </Link>

                        <Link
                          to="/account"
                          className="d-flex align-items-center list-group-item py-3 text-end"
                        >
                          <i class="bi bi-person-fill me-4 fs-3"></i>
                          <span>Account</span>
                        </Link>

                      
                      </div>

                      <div className="d-flex align-items-center p-3 d-lg-none border-top" onClick={handleLogout}>
                        <div className="me-4 fs-3">
                          <i class="bi bi-box-arrow-right"></i>
                        </div>
                        <div>
                          <span>Log Out</span>
                        </div>
                      </div>

                    </div>
                  </Offcanvas.Body>
                </Offcanvas>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
