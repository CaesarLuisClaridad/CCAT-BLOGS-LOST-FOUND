import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { UseLogout } from "../hooks/UseLogout";
import { UseAuthContext } from "../hooks/UseAuthContext";
import "../index.css";

const NavSection = () => {
  const { logout } = UseLogout();
  const { user } = UseAuthContext();

  // handling logout
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Navbar expand="lg" className="shadow bg-light text-success sticky-top">
        <Container fluid className=" d-flex align-items-center justify-content-between ">
          <div className="d-flex justify-content-between w-100 w-sm-75 align-items-center ">
            <Link to="/" className="text-decoration-none">
              <Navbar.Brand className="d-flex align-items-center fs-4 fw-bold text-success">
                <img src={logo} className="logo me-2" alt="Logo" />
                CCAT Stories
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="shadow-none bg-white"
            />
          </div>

          <Navbar.Collapse
            id="basic-navbar-nav"
            className="ms-auto d-lg-flex flex-lg-row flex-column"
          >
            <Nav className="flex-column flex-lg-row">
              {user && (
                <div className="flex-column d-lg-flex flex-lg-row">
                  <Link
                    to="/"
                    className="text-decoration-none my-auto mx-2 fs-6 d-flex justify-content-end justify-content-lg-start"
                  >
                    <Nav.Link href="#home" className="text-success font">
                      Home
                    </Nav.Link>
                  </Link>
                  <Link
                    to="/blog"
                    className="text-decoration-none text-black  my-auto mx-2 fs-6 d-flex justify-content-end justify-content-lg-start"
                  >
                    <Nav.Link href="#link" className="text-success font">
                      About
                    </Nav.Link>
                  </Link>
                  <Link
                    to="/post"
                    className="text-decoration-none text-black  my-auto mx-2 fs-6 d-flex justify-content-end justify-content-lg-start"
                  >
                    <Nav.Link
                      href="#link"
                      className="text-success font"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Post Blog
                    </Nav.Link>
                  </Link>
                  <Link
                    to="/postItem"
                    className="text-decoration-none text-black  my-auto mx-2 fs-6 d-flex justify-content-end justify-content-lg-start"
                  >
                    <Nav.Link
                      href="#link"
                      className="text-success font"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Post Item
                    </Nav.Link>
                  </Link>
                  <Link
                    to="/LFpage"
                    className="text-decoration-none my-auto mx-2 fs-6 d-flex justify-content-end justify-content-lg-start"
                  >
                    <Nav.Link
                      href="#home"
                      className="text-success"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Lost & Found
                    </Nav.Link>
                  </Link>

                  <Link
                    to="/account"
                    className="text-decoration-none my-auto mx-2 fs-6 d-flex justify-content-end justify-content-lg-start"
                  >
                    <Nav.Link
                      href="#home"
                      className="text-success"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Account
                    </Nav.Link>
                  </Link>
                </div>
              )}
              {!user && (
                <div className="d-flex">
                  <Link
                    to="/login"
                    className="text-decoration-none my-auto mx-2 fs-6"
                  >
                    <Nav.Link
                      href="#home"
                      className="text-success"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Log In
                    </Nav.Link>
                  </Link>
                  <Link
                    to="/signup"
                    className="text-decoration-none my-auto mx-2 fs-6"
                  >
                    <Nav.Link
                      href="#home"
                      className="text-success"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Sign up
                    </Nav.Link>
                  </Link>
                </div>
              )}
              {user && (
                <div className="d-flex flex-column d-lg-flex flex-lg-row ">
                  <div className="my-auto text-decoration-underline text-primary d-none d-lg-block">
                    {user && <span>{user.email}</span>}
                  </div>
                  <div className="d-flex justify-content-end justify-content-lg-start">
                      <span
                        className="my-auto text-decoration-underline text-primary cursor-pointer"
                        onClick={handleLogout}
                        style={{ whiteSpace: "nowrap", cursor: "pointer" }}
                      >
                        Log out
                      </span>
                  </div>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavSection;
