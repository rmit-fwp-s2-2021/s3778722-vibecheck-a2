import React from "react";
import defaultUser from "../assets/user.svg";

const Home = (props) => {
  return (
    <div className="App">
      <h1 className="display-6 mt-4">Home</h1>

      <div className="container">
        <div className="container d-flex flex-row justify-content-center">
          <div className="col-xl-6 col-md-8">
            <div className="card-profile">
              <div className="row ms-0 me-0">
                <div className="card border-0 card-p col-sm-4 bg-profile-2 user-profile">
                  <div className="card-body text-center text-white">
                    <div className="mb-4">
                      {props.user.imgUrl === null ? (
                        <img
                          src={defaultUser}
                          className="img-radius"
                          alt="User-Profile"
                        />
                      ) : (
                        <img
                          src={props.user.imgUrl}
                          className="img-radius"
                          alt="User-Profile"
                        />
                      )}
                    </div>
                    <h6 className="fw-bold mb-3">{props.user.name}</h6>
                    <p>{props.user.email}</p>
                  </div>
                </div>
                <div className="col-sm-8 mt-3">
                  <div className="card-body">
                    <div className="justify-content-center mb-4">
                      <h4 className="mb-3">My Profile</h4>
                    </div>
                    <hr />
                    <div className="justify-content-center">
                      <p className="mb-3 fw-bold">Email</p>
                      <h6 className="text-muted mb-3">{props.user.email}</h6>
                    </div>
                    <div className="justify-content-center">
                      <p className="mb-3 fw-bold">Name</p>
                      <h6 className="text-muted mb-3">{props.user.name}</h6>
                    </div>
                    <div className="justify-content-center">
                      <p className="mb-3 fw-bold">Date joined</p>
                      <h6 className="text-muted mb-3">{props.user.date}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
