import React from "react";
import { UseLostandFoundContext } from "../hooks/UseLostandFoundContext";
import { UseAuthContext } from "../hooks/UseAuthContext";
import { useEffect } from "react";
import LostDetails from "../components/LostDetails";
import Spinner from "react-bootstrap/Spinner";
import LostandFoundNav from "../components/LostandFoundNav";


const AllFoundItem = () => {
  const { item, dispatch } = UseLostandFoundContext();
  const { user } = UseAuthContext();

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(`https://ccat-blogs-lost-found-backend.onrender.com/item/getAllItem`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      console.log("Item Response:", json);
      ("");

      if (response.ok) {
        dispatch({ type: "SET_ITEM", payload: json });
      }
    };
    if (user) {
      fetchItems();
    }
  }, [dispatch, user]);

  // Filter items marked as "Found"
  const foundItems = item.filter((i) => i.what === "Found");

  return (
    <>
     <div className="d-block d-xl-none border-bottom">
      <LostandFoundNav />
    </div>
      {user && (
        <div className="container d-flex justify-content-center w-100 lost-found LFbackground">
          {foundItems.length > 0 ? (
            <div className="w-100">
              {foundItems.map((item) => <LostDetails key={item._id} item={item} />)}
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-center">
              <Spinner animation="border" variant="success" />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllFoundItem;
