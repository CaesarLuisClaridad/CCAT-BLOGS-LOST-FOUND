import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { UseBlogContext } from "../hooks/UseBlogContext";
import { UseAuthContext } from "../hooks/UseAuthContext";
import { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-hot-toast";
import Spinner from "react-bootstrap/Spinner";
import "../index.css";

const BlogDetails = ({ blog }) => {
  const { user } = UseAuthContext();
  const { dispatch } = UseBlogContext();
  const [islike, setLike] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(blog.title);
  const [editBody, setEditBody] = useState(blog.body);

  //handle the edit blog
  const handleEdit = () => {
    setEditMode(true);
  };

  const handleEditClose = () => {
    setEditMode(false);
  };

  const handleSaveChanges = async () => {
    const updatedBlog = { title: editTitle, body: editBody };
    const response = await fetch(`http://localhost:5000/api/` + blog._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(updatedBlog),
    });

    if (response.ok) {
      const updatedBlogFromServer = await response.json();
      updatedBlogFromServer.user_id = blog.user_id;
      dispatch({ type: "UPDATE_BLOG", payload: updatedBlogFromServer });
      setEditMode(false); // Close the modal
      toast.success("Blog updated successfully");
    } else {
      // Handle error
      toast.error("Failed to update the blog");
    }
  };

  //handle the delete button
  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(`http://localhost:5000/api/` + blog._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_BLOG", payload: json });
      console.log(json.err);
    }
  };

  //handle the like
  const handleLike = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/like/` + blog._id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ user_id: user.id, like: islike ? -1 : 1 }),
        }
      );

      if (response.ok) {
        const json = await response.json();
        const updatedBlog = { ...blog, like: json.likes };
        dispatch({ type: "UPDATE_LIKES", payload: updatedBlog });

        console.log("Current log in: ", user)
        console.log('User Username:', user.id);
        console.log('Blog Owner Username:', blog.user_id);
       
        setLike(!islike);
        localStorage.setItem(
          `liked_${blog._id}`,
          JSON.stringify({ email: user.email, like: !islike })
        );

        console.log(updatedBlog);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      const liked = localStorage.getItem(`liked_${blog._id}`);
      if (liked) {
        const { email, like } = JSON.parse(liked);
        if (email === user.email) {
          setLike(like);
        }
      }
    }
  }, [user, blog._id]);

  return (
    <>
      <div className="blog rounded-1 mx-3 mx-lg-auto shadow-lg" data-aos="fade-up">
        <div className="d-flex align-items-center justify-content-between py-3  px-3 w-100 border-bottom bg-success">
          <div>
            <div className="d-flex">
              <div>
                {blog.user_id ? (
                  <img
                    src={blog.user_id.profilePicture}
                    className="profile me-2"
                    alt="Profile"
                  />
                ) : (
                  <Spinner animation="border" variant="success" />
                )}
              </div>

              <div>
                {blog.user_id && (
                  <>
                    <h6 className="text-light m-0">{blog.user_id.username}</h6>
                  </>
                )}
                <span className="posted text-light">Posted: </span>
                <span className="posted text-light">
                  {formatDistanceToNow(new Date(blog.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
            </div>
          </div>

          {user && user.username === blog.user_id.username ? (
            <Dropdown>
              <Dropdown.Toggle
                variant=""
                id="dropdown-custom-components"
                bsPrefix="p-0"
                className="outline-0 border-0"
              >
                {editMode ? (
                  <i
                    class="bi bi-x-lg text-light"
                    onClick={handleEditClose}
                  ></i>
                ) : (
                  <i
                    className="bx bx-dots-horizontal-rounded outline-0 text-light"
                    style={{ cursor: "pointer", fontSize: "24px" }}
                  ></i>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" onClick={handleEdit}>
                  <i class="bi bi-pencil-square me-2"></i>
                  Edit blog
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2" onClick={handleDelete}>
                  <i class="bi bi-trash3-fill me-2" />
                  Delete Blog
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : null}
        </div>

        <div className="blog-info border-1 overflow-hidden">
          <div className="blog-header py-3 overflow-hidden">
            <div className="title">Title:</div>
            {editMode && user.username === blog.user_id.username ? (
              <input
                type="text"
                className="w-75 outline-0 p-3 form-control m-auto"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              <h4 className="fs-5">{blog.title}</h4>
            )}
          </div>
          <div className="about py-5">
            <div className="body">About:</div>
            {editMode && user.username === blog.user_id.username ? (
              <textarea
                rows="4"
                cols="50"
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                className="form-control"
              ></textarea>
            ) : (
              <p className="bodytext p-2">{blog.body}</p>
            )}
          </div>
        </div>

        {editMode && user.username === blog.user_id.username ? (
          <div className="py-2 text-end pe-3">
            <button className="btn btn-success" onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
        ) : null}

        <div className="py-2 blog-details-footer">
          <div className="d-flex align-items-center px-2">
            <div className="me-1">
              {islike ? (
                <i
                  class="bx bxs-heart fs-4 text-danger"
                  value={islike}
                  onClick={handleLike}
                ></i>
              ) : (
                <i
                  class="bx bx-heart fs-4 text-danger"
                  value={islike}
                  onClick={handleLike}
                ></i>
              )}
            </div>

            <div className="fs-6">
              <span>{blog.like}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;
