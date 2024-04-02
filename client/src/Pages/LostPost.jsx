import React from "react";
import { UseLostandFoundContext } from "../hooks/UseLostandFoundContext";
import { UseAuthContext } from "../hooks/UseAuthContext";
import { useEffect } from "react";
import LostDetails from "../components/LostDetails";
import AccountNav from "../components/AccountNav";

const LostAndFoundPage = () => {
  const { item, dispatch } = UseLostandFoundContext();
  const { user } = UseAuthContext();

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(
        `https://ccat-blogs-lost-found-backend.onrender.com/item/getUserPost/` + item.user_id,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      console.log("Item Response:", json);
      

      if (response.ok) {
        dispatch({ type: "SET_ITEM", payload: json });
      }
    };
    if (user) {
      fetchItems();
    }
  }, [dispatch, user]);

  return (
    <>
      <div className="d-block d-lg-none border-bottom">
        <AccountNav />
      </div>
      <div className="container d-flex justify-content-center w-100 lost-found LFbackground">
        <div className="w-100">
          {item && item.length > 0 ? (
            item.map((item) => <LostDetails key={item._id} item={item} />)
          ) : (
            <div className="d-flex justify-content-center align-items-center fw-bold fs-4 mt-2">
              No Item Post
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LostAndFoundPage;
