import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { editUser } from "../data/repository";

const PopupForm = (props) => {
  //useState hook for showing the modal popup
  const [show, setShow] = useState(false);

  //event handler to close the modal pop up
  const handleClose = () => setShow(false);

  //event handler to show the modal pop up
  const handleShow = () => {
    setShow(true);
    setAlertMessage(null);
  };

  //useState hook for the form fields
  const [fields, setFields] = useState({
    name: props.user.name,
    email: props.user.email,
    password: props.user.password_hash,
    date: props.user.date,
    imgUrl: props.user.imgUrl,
  });

  //useState hook for the alert message
  const [alertMessage, setAlertMessage] = useState(null);

  //useState hook for the determining the type of the alert message
  const [success, setSuccess] = useState(false);

  //event handler for the input change of the form
  const handleInputChange = (e) => {
    //field name
    const name = e.target.name;
    //field value
    const value = e.target.value;

    const inputFields = { ...fields };
    inputFields[name] = value;

    //set the new input fields data
    setFields(inputFields);
  };

  //get the users from the local storage by parsing the JSON format

  //password regex to validate the correct format:
  //at least six characters and should be a mix of uppercase and lowercase characters, numbers and special characters.
  const passwordRegex = new RegExp(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[-!@#$%^&*()_+|~=`{}[\]:";'<>?,./]).{6,}$/
  );
  const trimFields = () => {
    const trimmedFields = {};
    Object.keys(fields).map((key) => {
      if (fields[key] !== null) {
        return (trimmedFields[key] = fields[key].trim());
      } else {
        return (trimmedFields[key] = fields[key]);
      }
    });
    setFields(trimmedFields);

    return trimmedFields;
  };

  //event handler for submit button
  const handleSubmit = async (event) => {
    //prevent the default event from occuring
    event.preventDefault();

    const trimmedFields = trimFields();

    //if users is null, return empty array
    /*
    if (users === null) {
      users = [];
    }*/

    //if fields are empty, prompt to fill in.
    if (
      !trimmedFields.name ||
      !trimmedFields.email ||
      !trimmedFields.password
    ) {
      const emptyFieldsMessage = "Please fill in all the necessary fields";
      setAlertMessage(emptyFieldsMessage);
      alert(emptyFieldsMessage);
      setSuccess(false);
    } else if (trimmedFields.name.length > 64) {
      const emptyFieldsMessage = "Max length of name is 64 characters";
      setAlertMessage(emptyFieldsMessage);
      alert(emptyFieldsMessage);
      setSuccess(false);
    } else if (trimmedFields.password.length > 96) {
      const emptyFieldsMessage = "Max length of password is 96 characters";
      setAlertMessage(emptyFieldsMessage);
      alert(emptyFieldsMessage);
      setSuccess(false);
    } else if (
      !fields.password === props.user.password_hash ||
      !passwordRegex.test(fields.password)
    ) {
      //check if it pass the password regex validation
      setAlertMessage(
        "Invalid password format: the password must be at least six characters and should be a mix of uppercase and lowercase characters, numbers and special characters."
      );
      alert("Invalid password format");
      setSuccess(false);
    } else {
      const profile = await editUser(trimmedFields);

      props.setUser(profile);

      //assign the new edited data
      /*
      for (const i of users.keys()) {
        if (users[i].email === props.currentEmail) {
          users[i].email = fields.email;
          users[i].name = fields.name;
          users[i].password = fields.password;
        }
      }*/
      //set the new posts from the user changes

      let newPosts = [...props.posts];

      props.posts.forEach((tmpPost, index) => {
        if (tmpPost.userEmail === props.user.email) {
          newPosts[index].user.name = trimmedFields.name;
        }
      });

      props.setPosts(newPosts);

      let newComments = [...props.comments];
      props.comments.forEach((tmpComment, index) => {
        if (tmpComment.userEmail === props.user.email) {
          newComments[index].user.name = trimmedFields.name;
        }
      });

      props.setComments(newComments);
      //set the new comments from the user changes
      /*
      let newComments = [...props.comments];
      props.comments.forEach((tmpComment, index) => {
        if (tmpComment.email === props.currentEmail) {
          newComments[index].name = fields.name;
        }
      });
      */
      //set the new posts data on local storage
      /*
      localStorage.setItem("posts", JSON.stringify(newPosts));
      props.setPosts(newPosts);*/

      //set the new comments data on local storage
      /*
      localStorage.setItem("comments", JSON.stringify(newComments));
      props.setComments(newComments);*/

      //set the current email on local storageif new email is assigned
      //localStorage.setItem("currentUser", fields.email);

      //set the new user data on local storage
      //localStorage.setItem("users", JSON.stringify(users));

      //set new data for the state
      //props.setCurrentEmail(fields.email);
      //props.setUserData(users);

      //show alert message
      const messageSuccess = "Edit is saved.";
      setAlertMessage(messageSuccess);
      alert(messageSuccess);
      setSuccess(true);
    }
  };

  //function to determining the alert message type and message content
  const showAlertMessage = (message) => {
    if (message) {
      if (success) {
        return (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        );
      } else {
        return (
          <div className="alert alert-warning" role="alert">
            {message}
          </div>
        );
      }
    }
  };

  return (
    <>
      <Button variant="outline-warning" size="sm" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        {showAlertMessage(alertMessage)}
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Please enter your name"
                className="form-control mb-3"
                onChange={handleInputChange}
                value={fields.name}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-muted">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Please enter your email address"
                className="form-control mb-3"
                onChange={handleInputChange}
                value={fields.email}
                disabled
              />
            </div>
            <div className="form-group">
              <label className="form-control-label text-muted">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Please enter your password"
                className="form-control mb-4"
                onChange={handleInputChange}
                value={fields.password}
                required
              />
            </div>
            <div className="row justify-content-center my-3 px-3">
              <button className="btn btn-blue-left" type="submit">
                Save changes
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PopupForm;
