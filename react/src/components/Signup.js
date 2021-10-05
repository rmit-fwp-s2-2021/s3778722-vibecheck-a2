import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { findUser, createUser } from "../data/repository";

//Styled-Components
const Wrapper = styled.section`
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 67%,
    rgba(0, 212, 255, 1) 100%
  );
  min-height: calc(100vh - 40px);
`;

const Signup = (props) => {
  //get the current data
  const currentDate = new Date();
  //date format in day - month - year
  const date =
    currentDate.getDate() +
    "-" +
    (currentDate.getMonth() + 1) +
    "-" +
    currentDate.getFullYear();

  //useState hook for input fields
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    date: "",
  });
  //const [name, setName] = useState("");   Able to use both methods
  //const [email, setEmail] = useState(""); Able to use both methods
  //const [password, setPassword] = useState(""); Able to use both methods
  const [alertMessage, setAlertMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const trimFields = () => {
    const trimmedFields = {};
    Object.keys(fields).map((key) => (trimmedFields[key] = fields[key].trim()));
    setFields(trimmedFields);

    return trimmedFields;
  };

  /* Able to use both methods 
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  */

  //event handler for the input change
  const handleInputChange = (e) => {
    //field name
    const name = e.target.name;
    //field value
    const value = e.target.value;

    //set the input field for the fields state
    const inputFields = { ...fields };
    inputFields[name] = value;
    setFields(inputFields);
  };

  //get the users from local storage by parsing the json format
  //let users = JSON.parse(localStorage.getItem("users"));

  //password regex validation
  //at least six characters and should be a mix of uppercase and lowercase characters, numbers and special characters.
  const passwordRegex = new RegExp(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[-!@#$%^&*()_+|~=`{}[\]:";'<>?,./]).{6,}$/
  );

  //form submit event handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    //trim the fields to sanitize all input fields
    const trimmedFields = trimFields();

    //if users is null, return empty array
    /*
    if (users === null) {
      users = [];
    }
    */
    //check if the fields are empty
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
    } else if (trimmedFields.email.length > 320) {
      const emptyFieldsMessage = "Max length of email is 320 characters";
      setAlertMessage(emptyFieldsMessage);
      alert(emptyFieldsMessage);
      setSuccess(false);
    } else if (trimmedFields.password.length > 96) {
      const emptyFieldsMessage = "Max length of password is 96 characters";
      setAlertMessage(emptyFieldsMessage);
      alert(emptyFieldsMessage);
      setSuccess(false);
    } else if ((await findUser(trimmedFields.email)) !== null) {
      //check if the email already existed
      const emailErrorMessage =
        "The email address has already been taken. Please try another email address.";
      setAlertMessage(emailErrorMessage);
      alert(emailErrorMessage);
      setSuccess(false);
    } else if (!passwordRegex.test(trimmedFields.password)) {
      //check if the passowrd input pass the regex validation
      setAlertMessage(
        "Invalid password format: the password must be at least six characters and should be a mix of uppercase and lowercase characters, numbers and special characters."
      );
      alert("Invalid password format");
      setSuccess(false);
    } else {
      //assign the new data to the users array
      let userData = {
        name: trimmedFields.name,
        email: trimmedFields.email,
        password: trimmedFields.password,
        date: date,
      };

      //save it to the localstorage by using json stringify
      //localStorage.setItem("users", JSON.stringify(users));

      const user = await createUser(userData);

      //set the new users data
      //props.setUserData(users);
      const messageSuccess =
        "Congratulations, your account has been successfully created.";
      setAlertMessage(messageSuccess);
      alert(messageSuccess);
      setSuccess(true);

      //reset the input fields
      const inputFields = { ...fields };
      const keys = Object.keys(inputFields);
      keys.forEach((key) => {
        inputFields[key] = "";
      });
      setFields(inputFields);
    }
  };

  //function to handle the alert message type and message parameter
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
    <Wrapper>
      <div className="container px-5 py-5 mx-auto">
        {showAlertMessage(alertMessage)}
        <div className="card border-5">
          <div className="d-flex flex-lg-row flex-column">
            <div className="card card2-reg border-0">
              <div className="my-auto mx-md-5 right">
                <h1
                  className="title-special"
                  style={{
                    color: "#42daf5",
                    fontSize: "5rem",
                  }}
                >
                  VIBE CHECK
                </h1>
                <h3 className="text-white">To Stay Connected.</h3>
              </div>
            </div>
            <div className="card card1 border-0">
              <div className="row justify-content-center my-auto">
                <div className="col-md-8 col-10 my-5">
                  <div className="justify-content-center px-3 mb-3">
                    <h1 style={{ color: "#42daf5" }}>
                      <strong>Register</strong>
                    </h1>
                  </div>
                  <hr />
                  <h3 className="mt-5">Welcome!</h3>
                  <h6 className="p-2">Please enter your credentials</h6>
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
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-control-label text-muted">
                        Password
                      </label>
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
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="bottom text-center mb-5">
                <p href="#" className="sm-text mx-auto mb-3">
                  Already have an account?
                  <Link to="/login" className="ms-1 text-muted">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Signup;
