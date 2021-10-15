import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { verifyUser } from "../data/repository";

//Styled-Components
const Wrapper = styled.section`
  background: rgb(2, 0, 36);
  background: linear-gradient(
    270deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 67%,
    rgba(0, 212, 255, 1) 100%
  );
  min-height: calc(100vh - 40px);
`;

const Login = (props) => {
  //declare useHistory hook to navigate
  let history = useHistory();

  //useState hook for the form fields for email and password
  const [fields, setFields] = useState({ email: "", password: "" });

  //useState hook for alert message
  const [alertMessage, setAlertMessage] = useState(null);

  //event handler for input fields data change
  const handleInputChange = (e) => {
    //fields name
    const name = e.target.name;
    //fields value
    const value = e.target.value;

    const inputFields = { ...fields };
    inputFields[name] = value;
    setFields(inputFields);
  };

  //for retrieving the users's local storage
  //let users = JSON.parse(localStorage.getItem("users"));

  //event handler for form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //if no users in users record, show error message
    const user = await verifyUser(fields.email, fields.password);

    if (user === null) {
      const message = "Invalid email address or password.";
      setAlertMessage(message);
      alert(message);
    } else if (user.isBlocked === true) {
      const message = "Account is blocked";
      setAlertMessage(message);
      alert(message);
    } else {
      //login is verified
      const message = "Login successful";
      alert(message);

      //set the current user on local storage
      localStorage.setItem("currentUser", fields.email);

      //send the email to the parent component
      props.loginUser(user);

      //navigate to home page
      history.push("/home");
    }
  };

  return (
    <Wrapper>
      <div className="container px-5 py-5 ">
        {alertMessage !== null && (
          <div className="alert alert-warning" role="alert">
            {alertMessage}
          </div>
        )}
        <div className="card border-5">
          <div className="d-flex flex-lg-row flex-column">
            <div className="card card1 border-0">
              <div className="row justify-content-center my-auto">
                <div className="col-md-8 col-10 my-5">
                  <div className="justify-content-center px-3 mb-3">
                    <h1 style={{ color: "#42daf5" }}>
                      <strong>Login</strong>
                    </h1>
                  </div>
                  <hr />
                  <h3 className="mt-5">Welcome back!</h3>
                  <h6 className="p-2">Please enter your credentials</h6>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="text-muted">Email address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Please enter your email address"
                        className="form-control mb-3"
                        onChange={handleInputChange}
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
                        required
                      />
                    </div>
                    <div className="row justify-content-center my-3 px-3">
                      <button className="btn btn-blue-right" type="submit">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="bottom text-center mb-5">
                <p className="sm-text mx-auto mb-3">
                  Don't have an account?
                  <Link to="/signup" className="ms-1 text-muted" href="">
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>
            <div className="card card2 border-0">
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
                <h3 className="text-white ">To Stay Connected.</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
