import React from "react";
import { UseAuthContext } from "../hooks/UseAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Spinner from 'react-bootstrap/Spinner';
import AccountNav from "./AccountNav";

const LostDetails = ({ item }) => {
  const { user } = UseAuthContext();

  return (
    <>
      <div
        className="d-flex justify-content-center my-3"
        data-aos="fade-up"
        data-aos-duration="700"
      >
        <div className="lost-found-info border rounded shadow-lg">
          <div className="d-flex align-items-center border-bottom px-3 py-3">
            <div className="">
              {item.user_id && (
                <img
                  src={item.user_id.profilePicture}
                  alt="user profile"
                  className="profile me-2"
                />
              )}
            </div>
            <div>
              {item.user_id && (
                <>
                  <h6 className="text-light m-0">{item.user_id.username}</h6>
                </>
              )}
              <span className="posted text-light m-0">Posted: </span>
              {item.createdAt && item.createdAt !== null ?(
                  <span className="posted text-light m-0">
                  {formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              ) : (
                <div className="d-flex align-items-center justify-content-center">
              <Spinner animation="border" variant="success" />
            </div>
              )}
              
            </div>
          </div>

          <div className="d-flex align-items-center flex-column flex-md-row px-2 py-2 py-md-3 ">
            <div className="d-flex justify-content-center justify-content-lg-start d-block d-sm-none my-1 m-md-0">
              <h2 className="fw-bold text-light  m-0 py-1">{item.what}</h2>
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-center mb-3 mb-lg-0 mb-md-0 ">
              <div className="d-flex justify-content-center m-auto m-md-0 imagecontainer rounded-5">
                <img
                  src={item.image}
                  alt="Lost item"
                  className="img-fluid item-image border rounded-2"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 d-flex align-self-start overflow-hidden">
              <div className="w-100 overflow-hidden">
                <div className="d-flex justify-content-center d-none d-md-block justify-content-lg-start my-1 m-md-0">
                  <h2 className="fw-bold text-light  m-0 py-1">{item.what}</h2>
                </div>
                <div className="w-100 py-2 ">
                  <div className="d-flex mb-3 me-3">
                    <div className="fs-6 fw-bold text-light  me-3">What: </div>
                    <div className=" w-100 rounded px-2 border-bottom">
                      <p className="m-0 text-color text-center">{item.name}</p>
                    </div>
                  </div>

                  <div className="d-flex mb-3  me-3">
                    <div className="fs-6 fw-bold text-light   me-3">
                      Where:{" "}
                    </div>
                    <div className=" w-100 rounded px-2 border-bottom">
                      <p className="m-0 text-color text-center">{item.where}</p>
                    </div>
                  </div>

                  <div className="d-flex flex-column mb-3  me-3">
                    <div className="fs-6 fw-bold text-light  me-3">
                      Contact:
                    </div>
                    <div className="rounded  px-2 my-1">
                      <div className="d-flex align-items-center w-100 border-bottom px-2 rounded my-1">
                        <i class="bx bxl-facebook-circle text-light fs-4 me-2"></i>
                        <div className="text-center w-100 my-1">
                          <p className="m-0 text-color">{item.facebook}</p>
                        </div>
                      </div>

                      <div className="d-flex align-items-center border-bottom px-2  w-100 rounded my-1">
                        <i class="bx bxs-phone text-light fs-4 me-2"></i>
                        <div className="text-center w-100 my-1">
                          <p className="m-0 text-color">{item.phonenumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" d-flex flex-row flex-md-column mb-3 px-2  me-3">
                    <div className="fs-6 fw-bold text-color  me-3">
                      Details:
                    </div>
                    <div className="description border-bottom mt-1 w-100 rounded px-2">
                      <p className=" m-0 py-1 text-center text-color">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LostDetails;
