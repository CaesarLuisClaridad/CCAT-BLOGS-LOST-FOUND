import { useState } from "react";
import { Link } from "react-router-dom";
import { UseAuthContext } from "../hooks/UseAuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../index.css";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const {user} = UseAuthContext();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const handleFindUser = async (e) => {
        e.preventDefault();
        
        try{
            const response = await fetch(`http://localhost:5000/api/user/findUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    username: username
                })
            })  
            
            if(!response.ok){
                const errorData = await response.json(); 
                toast.error(errorData.mssg); 
            } 
                const data = await response.json();
                console.log("Hello", data);
                navigate("/createNewPassword", { state: { userId: data.userId } });
                toast.success("User found!")        
            
        }
        catch(error){
            console.log(error);
        }
    }

  return (
    <>
      <div className="user">
        <form className="d-flex flex-column user-form overflow-hidden p-4 px-md-4 rounded" onSubmit={handleFindUser}>
          <div className="text-start text-light">
            <div className="my-3 fw-bold">
              <h3>Find your account</h3>
            </div>
          </div>

          <div>
            <div className="border-bottom border-top">
              <p className="m-0 py-2 text-light">
                Please enter your email and username to search for your account.
              </p>
            </div>

            <div className="my-2">
              <label className="fs-6 text-light">Email: </label>
              <input
                type="email"
                placeholder="Enter email address"
                className="mt-2 w-100 outline-0 border-0 shadow rounded p-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="my-2">
              <label className="fs-6 text-light">Username: </label>
              <input
                type="text"
                placeholder="Enter username"
                className="mt-2 w-100 outline-0 border-0 shadow rounded  p-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className=" d-flex justify-content-end text-center">
              <div className="me-2">
                <button className="border-0 w-100 mt-3 py-2 px-4 text-light bg-secondary rounded user-btn">
                  <Link to="/login" className="text-light text-decoration-none">
                    Cancel
                  </Link>
                </button>
              </div>
              <div>
                <button type="submit" className="border-0 w-100 mt-3 py-2 px-4 text-light bg-success rounded user-btn">
                  Search
                </button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
