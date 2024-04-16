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
      const response = await fetch(`https://ccat-blogs-lost-found-backend.onrender.com/api/user`, {
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
      <div className="d-flex justify-content-center align-items-center flex-column overflow-hidden" style={{ minHeight: "100vh" }}>
        {user ? (
          <div className="d-flex justify-content-center flex-column py-4">
            {blogs && blogs.length > 0 ? (
              blogs.map((blog) => <BlogDetails key={blog._id} blog={blog} />)
            ) : (
              <div className="d-flex justify-content-center align-items-center fw-bold fs-4 mt-2">No Blog post</div>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default BlogPostPage;
