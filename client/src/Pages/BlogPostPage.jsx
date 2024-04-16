import { useEffect, useState } from "react";
import BlogDetails from "../components/BlogDetails";
import { UseBlogContext } from "../hooks/UseBlogContext";
import { UseAuthContext } from "../hooks/UseAuthContext";
import AccountNav from "../components/AccountNav";

const BlogPostPage = () => {
  const { blogs, dispatch } = UseBlogContext();
  const { user } = UseAuthContext();

  console.log("User in BlogPostPage:", user);
  console.log("Blogs in BlogPostPage:", blogs);
  console.log("Token in fetchUserBlogs:", user.token);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      const response = await fetch(`http://localhost:5000/api/user`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      console.log("user Post Page :", json);

      if (response.ok) {
        dispatch({ type: "SET_BLOG", payload: json });
      }
    };
    if (user) {
      fetchUserBlogs();
    }

    // Cleanup function to reset blogs when the component unmounts or when the user changes
    // para mawala yung prev data sa isang page
    return () => dispatch({ type: "SET_BLOG", payload: [] });
  }, [dispatch, user]);

  return (
    <>
      <div className="d-block d-lg-none border-bottom">
        <AccountNav />
      </div>
      {user && (
        <div className="container-fluid bg-light p-0 p-md-3 background home">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => <BlogDetails key={blog._id} blog={blog} />)
          ) : (
            <div className="d-flex justify-content-center align-items-center fw-bold fs-4 mt-2">No Blog post</div>
          )}
        </div>
      )}
    </>
  );
};

export default BlogPostPage;
