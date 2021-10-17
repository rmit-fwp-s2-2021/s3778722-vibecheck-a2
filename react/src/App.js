import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Main from "./components/Main";
import Profile from "./components/Profile";
import Posts from "./components/Posts";
import Follow from "./components/Follow";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import wallpaper from "./assets/Landing.jpg";
import {
  getUser,
  removeUser,
  findUser,
  getPosts,
  getComments,
} from "./data/repository";

//Styled-Components
const Wrapper = styled.section`
  background: url(${wallpaper}) no-repeat center center fixed;
  background-size: cover;
`;

function App() {
  //Just to store the current user session
  //useState hook for currentUser, which uses email as unique identifier.
  const [email, setEmail] = useState(localStorage.getItem("currentUser"));

  //When a user logins.. it sets the data to the localstorage
  //After verifying from API
  const [user, setUser] = useState(getUser());

  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  //useEffect hook to load the current user
  useEffect(() => {
    async function loadProfile() {
      const currentProfile = await findUser(email);
      setUser(currentProfile);
    }
    loadProfile();
  }, [email]);

  //useEffect hook to load the current posts when the post length changes
  useEffect(() => {
    async function loadPosts() {
      const currentPosts = await getPosts();
      setPosts(currentPosts);
    }
    loadPosts();
  }, [posts.length]);

  //useEffect hook to load the current comments when the comment length changes
  useEffect(() => {
    async function loadComments() {
      const currentComments = await getComments();
      setComments(currentComments);
    }
    loadComments();
  }, [comments.length]);

  //useEffect hook to make local storage sync with user changes

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  //check if user is logged in
  const loggedIn = () => {
    if (user !== null) {
      return true;
    }
    return false;
  };

  //login user function
  const loginUser = (user) => {
    setUser(user);
  };

  //Remove a user from localStorage and set the email to null,
  //Set fields to null
  const logoutUser = () => {
    removeUser();
    localStorage.removeItem("currentUser");
    setEmail(null);
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              loggedIn() ? (
                <Redirect to="/home" />
              ) : (
                <Wrapper>
                  <Navbar
                    color="transparent"
                    about="anchor"
                    user={user}
                    logoutUser={logoutUser}
                  />
                  <Main />
                  <About />
                </Wrapper>
              )
            }
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <>
                <Navbar {...props} user={user} logoutUser={logoutUser} />
                <Login {...props} loginUser={loginUser} />
              </>
            )}
          ></Route>
          <Route exact path="/signup">
            <Navbar user={user} logoutUser={logoutUser} />
            <Signup />
          </Route>

          <Route exact path="/home">
            <Navbar user={user} logoutUser={logoutUser} />
            <Home email={email} user={user} />
            <Posts
              email={email}
              user={user}
              //setUserData={setUserData}
              logoutUser={logoutUser}
              posts={posts}
              setPosts={setPosts}
              comments={comments}
              setComments={setComments}
              //isLoading={isLoading}
            />
          </Route>
          <Route exact path="/profile">
            <Navbar user={user} logoutUser={logoutUser} />
            {/* 
            <Profile
              email={email}
              user={userData}
              setUserData={setUserData}
              setCurrentEmail={setEmail}
              logoutUser={logoutUser}
              posts={posts}
              setPosts={setPosts}
              comments={comments}
              setComments={setComments}
            />
            comment here */}
            <Profile
              user={user}
              setUser={setUser}
              logoutUser={logoutUser}
              posts={posts}
              setPosts={setPosts}
              comments={comments}
              setComments={setComments}
            />
            <Follow user={user} />
          </Route>
          <Route exact path="/posting">
            <Navbar email={email} logoutUser={logoutUser} />
            <Posts
              email={email}
              user={user}
              //setUserData={setUserData}
              //isLoading={isLoading}
              //setIsLoading={setIsLoading}
              logoutUser={logoutUser}
              posts={posts}
              setPosts={setPosts}
              comments={comments}
              setComments={setComments}
            />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
