import React from "react";
import { Link } from "react-router-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Navbar = (props) => {
  //function to decide the color of the navbar
  const navbarColor = () => {
    if (props.color === "transparent") {
      return "navbar-dark bg-transparent";
    } else {
      return "navbar-light bg-light";
    }
  };

  //function to redirect the anchor of about section with smooth scroll
  const anchorRedirect = () => {
    if (props.about === "anchor") {
      return (
        <AnchorLink href="#about" className="nav-link">
          About
        </AnchorLink>
      );
    } else {
      return (
        <a href="/#about" className="nav-link">
          About
        </a>
      );
    }
  };

  return (
    <nav className={"navbar navbar-expand-lg " + (navbarColor() || "")}>
      <div className="container-fluid m-3">
        <Link to="/" className="navbar-brand">
          VIBE CHECK
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {props.user === null ? (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  {/** react-anchor-link-smooth-scroll **/}
                  {anchorRedirect()}
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/home" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/posting" className="nav-link">
                    Posting
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-link"
                    onClick={props.logoutUser}
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
