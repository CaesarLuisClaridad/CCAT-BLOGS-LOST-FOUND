import { useState } from "react";
import { UseAuthContext } from "./UseAuthContext";
import { toast } from "react-hot-toast";

export const UseSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = UseAuthContext();

  const signup = async (username, email, password, confirmPassword, gender) => {
    setIsLoading(true);
    try{
      const response = await fetch(`https://ccat-blogs-lost-found-backend.onrender.com/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
          gender,
        }),
      });
  
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || 'Signup failed for an unknown reason');
      }
  
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOG_IN", payload: json });
        toast.success("Sign up successfully");
        setIsLoading(false);
      }
    }
    catch(error){
      toast.error(error.message);
    }
    finally{
      setIsLoading(false);
    }
   

   
  };
  return { signup, isLoading };
};
