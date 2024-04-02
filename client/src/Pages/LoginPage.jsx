import { useState } from "react";
import { UseLogin } from "../hooks/UseLogin";
import { Link } from "react-router-dom";
import { UseAuthContext } from "../hooks/UseAuthContext";
import { UseNotificationContext } from "../hooks/UseNotification";
import logo from "../assets/logo.png";
import Spinner from "react-bootstrap/Spinner";
import "../index.css";

const LoginPage = () => {
  const { user } = UseAuthContext();
  const { login, isLoading } = UseLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState('password');

  //handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password, user);
    setEmail("");
    setPassword("");
    console.log(email, password, user);
  };

  //handle viewpassword
  const handleViewPassword = () => {
    setType(type === "password" ? "text" : "password")

  }
  return (
    <>
      <div className="user">
        <form
          className="d-flex flex-column user-form overflow-hidden p-4 px-md-4 rounded"
          onSubmit={handleLogin}
        >
          <div className="text-center text-light">
            <img src={logo} alt="login" className="loginlogo mt-3" />
            <div className="mt-2">
              <p className="m-0 fw-bold">CAVITE STATE UNIVERSITY</p>
              <p className="m-0 fw-bold">CCAT CAMPUS</p>
              <p className="m-0 fw-bold text-warning">BLOGS AND LOST & FOUND</p>
            </div>
          </div>
          <div>
            <div className="my-2">
              <label className="fs-6 text-light">Email: </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Enter email address"
                className="mt-1 w-100 outline-0 border-0 shadow rounded p-3"
              />
            </div>
            <div className="my-2">
              <label className="fs-6 text-light">Password</label>
              <div className="input-wrapper">
                <input
                  type={type}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Enter password"
                  className="mt-1 w-100 outline-0 border-0 shadow rounded  p-3"
                />
                <span className="input-icon" onClick={handleViewPassword}>
                  <i onClick={handleViewPassword} className={`bi ${type === "password" ? "bi-eye-slash" : "bi-eye"}`}></i>
                </span>
              </div>
              
             
            </div>
            <div className=" text-center">
              <button
                className="border-0 w-100 mt-3 py-2 px-4 text-light bg-success rounded user-btn"
                disabled={isLoading}
              >
                {isLoading ? <Spinner animation="border" variant="light" /> : "Log In"}
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-between text-light pt-4">
            <div>
                <Link to="/forgotPassword" className="text-light">
                  Forgot Password?
                </Link>
            </div>
            <div>
                <Link to="/signup" className="text-light">
                  Create account?
                </Link>
            </div>
            
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
