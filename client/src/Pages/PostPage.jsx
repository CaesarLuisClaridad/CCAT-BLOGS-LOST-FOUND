import { useState } from "react";
import { Link } from "react-router-dom";
import { UseBlogContext } from "../hooks/UseBlogContext";
import { UseAuthContext } from "../hooks/UseAuthContext";
import {toast} from 'react-hot-toast';
import Spinner from 'react-bootstrap/Spinner';

const PostPage = () => {
  const {user} = UseAuthContext();
  const {dispatch} = UseBlogContext()
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isloading, setIsLoading] = useState(null);
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    console.log("hello");
    e.preventDefault();

    if(!user){
      setError("User must be logged in");
      return;
    }
    setIsLoading(true);

    const blog = { title, body };
    const response = await fetch(`https://ccat-blogs-lost-found-backend.onrender.com/api`, {
      method: "POST",
      body: JSON.stringify(blog),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.err)
      toast.error(json.err)
      setEmptyFields(json.emptyFields);
      console.log(json);
      setIsLoading(false);
    }

    if (response.ok) {
      setTitle("");
      setBody("");
      setEmptyFields([]);
      setIsLoading(false);
      toast.success('Blog uploaded!')
      dispatch({type:'CREATE_BLOG', payload: json})
      console.log("blog added", json);
    }
  };

  return (
    <>
      <div className="form-container">
        <div className="form-content mx-3">
          <div className="form-text p-4">
          <form action="/" onSubmit={handleSubmit}>
            <h3 className="text-light">Anong kwento mo?</h3>
            <div className="label-input">
              <label className="text-light">Title</label>
              <br />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your story title"
                className={emptyFields.includes('title') ? "error" : ""}
              />
            </div>
            <div className="label-input">
              <label className="text-light">body</label>
              <br />
              <textarea
                rows="4" 
                cols="50" 
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Tell us your story..."
                className={emptyFields.includes('body') ? "error" : ""}
              />
            </div>
            <div className="footer-form">
            <Link to="/" className="gohome">Go to Home</Link>
            <button  className="submitbtn" disabled={isloading}>
              {isloading ? <Spinner animation="border" variant="success" /> : "Submit"}</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
