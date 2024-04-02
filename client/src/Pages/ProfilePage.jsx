import React from "react";
import { useState } from "react";
import { UseAuthContext } from "../hooks/UseAuthContext";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";
import AccountNav from "../components/AccountNav";

const ProfilePage = () => {
  const { user, dispatch } = UseAuthContext();
  const [editMode, setEditMode] = useState(false);
  const [editUsername, setEditUsername] = useState(user.username);
  const [editEmail, setEditEmail] = useState(user.email);

  const handleEditInformation = () => {
    setEditMode(true);
  };

  const handleEditClose = () => {
    setEditMode(false);
  }

  const handleSaveChanges = async () => {
    const updatedInformation = {username: editUsername, email: editEmail};
    console.log(user.id);
    const response = await fetch(`http://localhost:5000/api/user/editinfo/` + user.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify(updatedInformation)
    })
    if(response.ok){
      const updatedInformationFromServer = await response.json();
      dispatch({type: 'UPDATE_INFORMATION', payload: updatedInformationFromServer})
      localStorage.setItem('user', JSON.stringify(updatedInformationFromServer));
      setEditMode(false);
      toast.success('Updated Information Success')
    }else {
      // Handle error
      toast.error("Failed to update information");
    }
   
  }

  return (
    <>
    <div className="d-block d-lg-none border-bottom">
      <AccountNav/>
    </div>
      <div className="container p-3 p-md-5">
        <div className=" text-center fs-2 fw-bold mb-3">
          <span className="account-title ">My profile</span>
        </div>
        <div>
          <div className="row flex-column flex-lg-row align-items-center border account-info-container">
            <div className="col-12 col-md-5 d-flex align-items-center flex-column p-3  p-lg-5">
              <img src={user.profilePicture} className="w-75 mt-3" />
              <div className="text-center mt-3 fs-5 fw-bold account-username">
                <span>{user.username} </span>
              </div>
            </div>

            <div className="col-12 col-md-7 p-3 p-lg-5 ">
              <div className="mb-2">
                <div className="mb-1 fw-bold">
                  <label>Username: </label>
                  <br />
                </div>
                <div className="account-info text-center fs-6 p-2 rounded-2">
                  {editMode && user.username ? (
                    <Form.Control
                      as="textarea"
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <span>{user.username}</span>
                  )}
                </div>
              </div>

              <div>
                <div className="mb-1 fw-bold">
                  <label>Email: </label>
                  <br />
                </div>
                <div className="account-info text-center fs-6 p-2 rounded-2">
                  {editMode && user.username ? (
                    <Form.Control
                      as="textarea"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <span>{user.email}</span>
                  )}
                </div>
              </div>

             
            </div>
            <div className="text-end mb-3">
              {editMode && user.username ? (
                <div className="d-flex justify-content-end">
                  <div className="me-2">
                    <button className="btn btn-secondary" onClick={handleEditClose}>Cancel</button>
                  </div>
                  <div>
                    <button className="btn btn-success" onClick={handleSaveChanges}>Save Changes</button>
                  </div>
                </div>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={handleEditInformation}
                >
                  Edit Information
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
