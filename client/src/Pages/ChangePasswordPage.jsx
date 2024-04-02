import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { UseAuthContext } from "../hooks/UseAuthContext";
import { toast } from "react-hot-toast";
import AccountNav from "../components/AccountNav";

const ChangePasswordPage = (e) => {
  const { user } = UseAuthContext();
  const [currentPassword, setCurrentPassword] = useState(user.password);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [type, setType] = useState("password");

  //handle Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();

    //check if the new password is match before sending the request
    if (newPassword !== confirmNewPassword) {
      toast.error("New password do not match");
      return;
    }
    try {
     
      const response = await fetch(
        `http://localhost:5000/api/user/updatePassword/` + user.id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Parse the JSON to access the error message
        toast.error(errorData.mssg);
        return; // Stop further execution
      }

      const data = await response.json();
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error("An unexpected error occurred."); // Fallback error message
    }
  };

  const handleViewPassword = () => {
    setType(type === "password" ? "text" : "password");
  };
  return (
    <>
      <div className="d-block d-lg-none">
        <AccountNav />
      </div>
      <div className="container d-flex align-items-center justify-content-center ">
        <div className="change-password-container mt-5 rounded-3 overflow-hidden">

          <div className="py-3 py-lg-4 px-4 px-lg-5">
            <div className="fs-3 text-center fw-bold mb-3">
              <span>Change Password</span>
            </div>

            <form onSubmit={handleChangePassword}>
              <div className="mb-2">
                <label className="mb-2 ">Current Password: </label> <br />
                <div className="input-wrapper">
                  <Form.Control
                    required
                    type={type}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <span className="input-icon" onClick={handleViewPassword}>
                    <i
                      className={`bi ${
                        type === "password" ? "bi-eye-slash" : "bi-eye"
                      }`}
                    ></i>
                  </span>
                </div>
              </div>

              <div className="mb-2">
                <label className="mb-2">New Password: </label> <br />
                <div className="input-wrapper">
                  <Form.Control
                    required
                    type={type}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <span className="input-icon" onClick={handleViewPassword}>
                    <i
                      className={`bi ${
                        type === "password" ? "bi-eye-slash" : "bi-eye"
                      }`}
                    ></i>
                  </span>
                </div>
              </div>

              <div className="mb-2">
                <label className="mb-2">Confirm Password: </label> <br />
                <div className="input-wrapper">
                  <Form.Control
                    required
                    type={type}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
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

              <div className="mt-4">
                <button className="btn btn-success" type="submit">
                  Change Password
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordPage;
