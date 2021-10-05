import React from "react";
import PopupForm from "./PopupForm";
import PopupDelete from "./PopupDelete";
import ImageUpload from "./ImageUpload";
import defaultUser from "../assets/user.svg";

const Profile = (props) => {
  // Load profile.
  /*
  useEffect(() => {
    async function loadProfile() {
      const currentProfile = await findUser(props.user.email);

      props.setUser(currentProfile);
      setUser(currentProfile);
      //setFieldsNullToEmpty(currentProfile);
    }
    loadProfile();
    console.log(loadProfile());
  }, []);
  */
  return (
    <>
      <h1 className="display-6 mt-4">Profile</h1>
      <div className="container wrapper">
        <div className="container d-flex flex-row justify-content-center">
          <div className="col-xl-10 col-md-12">
            <div className="card-profile">
              <div className="row ms-0 me-0">
                <div className="card border-0 card-p col-sm-4 bg-profile user-profile">
                  <div className="card-body text-center text-white">
                    <div className="mb-4">
                      {props.user.imgUrl !== null ? (
                        <img
                          src={props.user.imgUrl}
                          className="img-radius"
                          alt="User-Profile"
                        />
                      ) : (
                        <img
                          src={defaultUser}
                          className="img-radius"
                          alt="User-Profile"
                        />
                      )}
                    </div>
                    <ImageUpload
                      currentEmail={props.email}
                      user={props.user}
                      setUserData={props.setUserData}
                    />
                    <hr />
                    <h6 className="fw-bold mb-3">{props.user.name}</h6>
                    <p>{props.user.email}</p>
                  </div>
                </div>
                <div className="col-sm-8 mt-3">
                  <div className="card-body">
                    <div className="justify-content-center mb-4">
                      <h4 className="mb-3">Profile Information</h4>
                      <PopupForm {...props} />
                      <PopupDelete {...props} />
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
    </>
  );
};

export default Profile;
