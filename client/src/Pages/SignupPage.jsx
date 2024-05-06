import { useState } from "react";
import { UseSignup } from "../hooks/UseSignup";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import toast from "react-hot-toast";

const SignupPage = () => {
  const { signup, isLoading } = UseSignup();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("password");

  //handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(username, email, password, confirmPassword, gender);
    console.log(username, email, password, confirmPassword, gender);
  };

  //handle genfer
  const handleCheckBox = (gender) => {
    setGender(gender);
  };

  //handle view password
  const handleViewPassword = () => {
    setType(type === "password" ? "text" : "password");
    console.log(type);
  };

  return (
    <>
      <div className="user">
        <form
          className="d-flex flex-column user-form overflow-hidden p-4 p-md-4 rounded"
          onSubmit={handleSignup}
        >
          <h3 className="text-center my-2 fs-2 fw-bold text-light">Sign up</h3>
          <div>
            <div>
              <label className="fs-6 text-light">Username: </label>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Enter your username"
                className="mt-1 mb-1 w-100 outline-0 border-0 shadow rounded p-2 p-md-3"
              />
            </div>
            <div>
              <label className="fs-6 text-light">Email: </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="ex: name@ccat.com"
                pattern=".*@ccat\.com$"
                title="Email must end with @ccat.com"
                className="mt-1 mb-1 w-100 outline-0 border-0 shadow rounded p-2 p-md-3"
              />
            </div>

            <div>
              <label className="fs-6 text-light">Password</label>
              <div className="input-wrapper">
                <input
                  type={type}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Create a password"
                  className="mt-1 mb-1 w-100 outline-0 border-0 shadow rounded p-2 p-md-3"
                />
                <span onClick={handleViewPassword} className="input-icon">
                  <i
                    className={`bi ${
                      type === "password" ? "bi-eye-slash" : "bi-eye"
                    }`}
                  ></i>
                </span>
              </div>
              
            </div>

            <div>
              <label className="fs-6 text-light">Confirm Password</label>
              <div className="input-wrapper">
                <input
                  type={type}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  placeholder="Confirm your password"
                  className="mt-1 mb-1 w-100 outline-0 border-0 shadow rounded p-2 p-md-3"
                />
                <span onClick={handleViewPassword} className="input-icon">
                  <i
                    className={`bi ${
                      type === "password" ? "bi-eye-slash" : "bi-eye"
                    }`}
                  ></i>
                </span>
              </div>
             
            </div>

            <div className="d-flex align-items-center my-2">
              <div className="me-3">
                <input
                  type="radio"
                  name="gender"
                  onChange={() => handleCheckBox("male")}
                  checked={gender === "male"}
                  className="me-2"
                />
                <label
                  className={`fs-6 text-light ${
                    gender === "male" ? "selected" : ""
                  }`}
                >
                  Male
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  name="gender"
                  onChange={() => handleCheckBox("female")}
                  checked={gender === "female"}
                  className="me-2"
                />
                <label
                  className={`fs-6 text-light ${
                    gender === "female" ? "selected" : ""
                  }`}
                >
                  Female
                </label>
              </div>
            </div>

            <div className="mt-2 text-center">
              <button
                className="border-0 w-100 mt-1 py-2 px-4 text-light bg-success rounded user-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-end text-light pt-2">
            <Link to="/login" className="text-light">
              Go to login?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
