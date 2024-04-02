import React from "react";
import { useState, useRef } from "react";
import { UseAuthContext } from "../hooks/UseAuthContext";
import { UseLostandFoundContext } from "../hooks/UseLostandFoundContext";
import {toast} from 'react-hot-toast';
import imageUpload from "../assets/ImageUpload.png"
import Spinner from 'react-bootstrap/Spinner';


const ItemPostPage = () => {
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = UseAuthContext();
  const { dispatch } = UseLostandFoundContext();
  const [itemImage, setItemImage] = useState("");
  const [itemName, setItemName] = useState("");
  const [what, setWhat] = useState("");
  const [where, setWhere] = useState("");
  const [description, setDescription] = useState("");
  const [facebook, setFacebook] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");

  //transdforming file into url
  const transformFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  //handling image click
  const handleImageClick = () => {
    console.log("click");
    inputRef.current.click();
  };

  //handling image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const dataUrl = await transformFile(file);
      setItemImage(dataUrl);
    }
  };

  //handling submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting");
    if (!user) {
      setError("User must be logged in");
      return;
    }

    setIsLoading(true);

    console.log("Image String:", itemImage);

    //making a formdata to bundle pieces of data into one single package to send via an HTTP request
    const formData = new FormData();
    formData.append("file", itemImage);
    formData.append("what", what);
    formData.append("itemName", itemName);
    formData.append("where", where);
    formData.append("description", description);
    formData.append("facebook", facebook);
    formData.append("phonenumber", phonenumber);

    //connecting to backend
    const response = await fetch(`https://ccat-blogs-lost-found-backend.onrender.com/item/postItem`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      setIsLoading(false);
      setItemName("");
      setItemImage("");
      setWhat("");
      setWhere("");
      setDescription("");
      setFacebook("");
      setPhoneNumber("");
      dispatch({ type: "CREATE_ITEM", payload: json });
      console.log("ITEM added", json);
      toast.success('Item successfully uploaded!')
    } else {
      console.error("Failed to submit item:", json); // Log the error for debugging
      toast.error(json.error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center full-height-center w-100">
        <form
          onSubmit={handleSubmit}
          className="formwidth border p-3 px-md-4 px-md-3 shadow rounded-2 overflow-hidden"
        >
          <div className="row ">
            <div className="col-12 col-md-6 d-flex flex-column align-items-center overflow-hidden">
              <div className="d-flex flex-column align-items-center  h-100 overflow-hidden ">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={inputRef}
                  className="uploadbtn border"
                  style={{ display: "none" }}
                />
                <div
                  onClick={handleImageClick}
                  className="d-flex align-items-center overflow-hidden p-0 m-0"
                  style={{ cursor: "pointer", height: '100%' }}
                >
                  {itemImage ? (
                    <img
                      src={itemImage}
                      alt="image"
                      className=" uploadimage overflow-hidden"
                    />
                  ) : (
                    <img
                      src={imageUpload}
                      className=" uploadimage overflow-hidden"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 mt-4 ">
              <div className="d-flex flex-column  mb-1">
                <label className="form-label text-light m-0 mb-1">Type:</label>
                <select
                  className="w-50 px-2 py-2 outline-0 border-0 no-border-focus rounded select"
                  onChange={(e) => setWhat(e.target.value)}
                  value={what}
                >
                  <option value="" className="select">Select a type</option>
                  <option value="Found" className="select">Found</option>
                  <option value="Lost" className="select">Lost</option>
                </select>
              </div>
              <div className="mb-1 ">
                <label className="form-label text-light m-0">Item Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="(e.g., Wallet, Keys)"
                  onChange={(e) => setItemName(e.target.value)}
                  value={itemName}
                />
              </div>
              <div className="d-flex flex-column mb-2">
                <label className="form-label text-light m-0">Where: </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="(e.g., Library, Canteen)"
                  onChange={(e) => setWhere(e.target.value)}
                  value={where}
                />
              </div>
              <div className="d-flex flex-column mb-1">
                <label className="form-label text-light m-0">Contact: </label>
                <div className="d-flex align-items-center my-1 bg-light  rounded">
                    <i class='bx bxl-facebook-circle fs-3 mx-1 icon'></i>
                    <input
                      type="text"
                      className="bg-transparent border-0 outline-0 no-border-focus w-100 p-2"
                      placeholder="Username or profile link"
                      onChange={(e) => setFacebook(e.target.value)}
                      value={facebook}
                    />
                </div>

                <div className="d-flex align-items-center bg-light my-1  rounded">
                  <i class='bx bxs-phone fs-3 mx-1 icon'></i>
                    <input
                      type="text"
                      className="bg-transparent border-0 outline-0 no-border-focus w-100 p-2"
                      placeholder="(+1234567890)(no-space)"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      value={phonenumber}
                    />
                </div>
               
              </div>

              <div className="mb-3">
                <label className="form-label text-light m-0">Description:</label>
                <textarea
                  className="form-control"
                  placeholder="Details e.g., color, brand, condition"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  rows="3"
                ></textarea>
              </div>

              <div className="text-end">
                <button type="submit" className="px-5 py-2 uploadbtn rounded-1" disabled={isLoading}>
                  {isLoading ?  <Spinner animation="border" variant="success" /> : "Upload"}
                </button>
              </div>
            </div>
          </div>
        </form>

      
      </div>
    </>
  );
};

export default ItemPostPage;
