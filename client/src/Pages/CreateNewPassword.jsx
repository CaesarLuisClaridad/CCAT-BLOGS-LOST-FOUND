import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { UseAuthContext } from '../hooks/UseAuthContext';
import { useLocation } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateNewPassword = () => {
    const navigate = useNavigate();
    const {user} = UseAuthContext()
    const location = useLocation();
    const userId = location.state?.userId;
    const [newPassword, setNewPassword]= useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleCreateNewPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
          toast.error("New password do not match");
          return;
        }
        
        try{
            const response = await fetch(`http://localhost:5000/api/user/passwordReset/` + userId, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    newPassword: newPassword,
                    confirmNewPassword: confirmNewPassword
                })
            })

            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            console.log("Password Changed!", json);
            toast.success("Successfully created new password, Log in now!")
            navigate("/login");
        }
        catch(error){
            console.log("ERROR: ", error)
        }
    }

  return (
    <>
         <div className="user">
        <form className="d-flex flex-column user-form overflow-hidden p-4 px-md-4 rounded" onSubmit={handleCreateNewPassword} >
          <div className="text-center text-light">
            <div className="my-3 fw-bold">
              <h3>Create new Password</h3>
            </div>
          </div>

          <div>

            <div className="my-2">
              <label className="fs-6 text-light">Enter new password: </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="mt-2 w-100 outline-0 border-0 shadow rounded p-3"
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="my-2">
              <label className="fs-6 text-light">Confirm new password: </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="mt-2 w-100 outline-0 border-0 shadow rounded  p-3"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>

            <div className=" d-flex justify-content-end text-center ">
              <div className="me-2">
                <button className="border-0 w-100 mt-3 py-2 px-2 px-lg-4 text-light bg-secondary rounded user-btn">
                  <Link to="/login" className="text-light text-decoration-none">
                    Cancel
                  </Link>
                </button>
              </div>
              <div>
                <button type="submit" className="border-0 w-100 mt-3 py-2 px-2 px-lg-4 text-light bg-success rounded user-btn">
                    Create Password
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateNewPassword