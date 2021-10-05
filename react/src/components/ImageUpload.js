import React, { useState } from "react";
import S3 from "react-aws-s3";
import { editUser } from "../data/repository";

//AWS S3 config data
const S3_BUCKET = "vibe-check-bucket";
const REGION = "us-east-2";
const ACCESS_KEY = "AKIAY2GYTGQRMNTBUBGO";
const SECRET_ACCESS_KEY = "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";

//Set the config data to the config variable.
const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};

//initialize the ReactS3Client with the config data
const ReactS3Client = new S3(config);

const ImageUpload = (props) => {
  //retrieve the local storage 'users'
  //let users = JSON.parse(localStorage.getItem("users"));

  //useState hook for file selection
  const [fileSelected, setFileSelected] = useState(null);

  //useState hook for alert message
  const [alertMessage, setAlertMessage] = useState(null);

  //event handler for file input
  const handleFileInput = (event) => {
    setFileSelected(event.target.files[0]);
  };

  //event handler for file upload
  const handleUpload = async (file) => {
    //if users is null set to empty array
    /*
    if (users === null) {
      users = [];
    }
    */
    setAlertMessage("Uploading...");

    //execute s3 file upload with new filename set as current user email
    await ReactS3Client.uploadFile(file, props.user.email)
      .then((data) => {
        console.log(data);
        alert("Upload complete");
        setAlertMessage(null);
      })
      .catch((err) => console.error(err));

    //reset file input value
    document.getElementById("fileUpload").value = "";

    //loop through the users and add a new imgUrl field for the new aws s3 hosting url
    let user = {};
    Object.keys(props.user).map((key) => (user[key] = props.user[key]));

    user["imgUrl"] =
      "https://vibe-check-bucket.s3-us-east-2.amazonaws.com/" + user.email;

    const userJSON = JSON.stringify(user);
    const newUser = await editUser(user);
    props.setUser(newUser);

    //set the newly assigned users to local storage
    //localStorage.setItem("users", JSON.stringify(users));

    //set the users data
    //props.setUserData(users);
  };

  //function to show alert message with the message parameter
  const showAlertMessage = (message) => {
    if (message) {
      return (
        <div className="alert-sm alert-warning my-2" role="alert">
          {message}
        </div>
      );
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor="fileUpload" className="form-label">
        Add your profile picture
      </label>
      <input
        className="form-control form-control-sm"
        id="fileUpload"
        type="file"
        onChange={handleFileInput}
      />
      <button
        className="btn btn-primary btn-sm mt-2"
        onClick={() => handleUpload(fileSelected)}
      >
        Upload
      </button>
      {showAlertMessage(alertMessage)}
    </div>
  );
};

export default ImageUpload;
