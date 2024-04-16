import { useEffect, useState } from "react";
import BlogDetails from "../components/BlogDetails";
import { UseBlogContext } from "../hooks/UseBlogContext";
import { UseAuthContext } from "../hooks/UseAuthContext";
import Spinner from 'react-bootstrap/Spinner';

const HomePage = () => {
  const { blogs, dispatch } = UseBlogContext();
  const { user } = UseAuthContext();

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`https://ccat-blogs-lost-found-backend.onrender.com/api/all`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      console.log("API Response:", json);

      if (response.ok) {
        dispatch({ type: "SET_BLOG", payload: json });
      }
      
    };
    if (user) {
      fetchBlogs();
    }
  }, [dispatch, user]);


  return (
    <>
     <div className="d-flex justify-content-center align-items-center flex-column overflow-hidden">
      {user && (
        <div className="d-flex justify-content-center flex-column py-4">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => <BlogDetails key={blog._id} blog={blog} />)
          ) : (
            <div className="d-flex align-items-center justify-content-center">
              <Spinner animation="border" variant="success" />
            </div>
          )}
        </div>
      )}
    </div>
     
      {/* {user && (
        <div className="d-flex justify-content-center flex-column overflow-hidden py-4 ">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => <BlogDetails key={blog._id} blog={blog} />)
          ) : (
            <div className="d-flex align-items-center justify-content-center">
                <Spinner animation="border" variant="success" />
            </div>
                
          )}
        </div>
      )} */}
    </>
  );
};

export default HomePage;
