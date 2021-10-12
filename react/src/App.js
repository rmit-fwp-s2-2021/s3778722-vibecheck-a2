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
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import wallpaper from "./assets/Landing.jpg";
import {
  getUser,
  removeUser,
  findUser,
  getPosts,
  getUsers,
  getComments,
} from "./data/repository";

//Styled-Components
const Wrapper = styled.section`
  background: url(${wallpaper}) no-repeat center center fixed;
  background-size: cover;
`;

function App() {
  //useState hook for userData that retrieve from local storage of 'users' key.
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  //useState hook for currentUser, which uses email as unique identifier that retrieve from local storage of 'currentUser' key.
  const [email, setEmail] = useState(localStorage.getItem("currentUser"));

  const [user, setUser] = useState(getUser());
  //const [users, setUsers] = useState([]);

  const [posts, setPosts] = useState([]);
  //const [isLoading, setIsLoading] = useState(true);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function loadProfile() {
      const currentProfile = await findUser(email);
      setUser(currentProfile);
      //setFieldsNullToEmpty(currentProfile);
    }
    console.log("run here");
    loadProfile();
  }, [email]);

  useEffect(() => {
    async function loadPosts() {
      const currentPosts = await getPosts();
      setPosts(currentPosts);
      //setIsLoading(false);
    }
    loadPosts();
  }, [posts.length]);

  useEffect(() => {
    async function loadComments() {
      const currentComments = await getComments();
      setComments(currentComments);
      //setIsLoading(false);
    }
    loadComments();
  }, [comments.length]);

  /*
  useEffect(() => {
    async function loadUsers() {
      const currentUsers = await getUsers();

      setUsers(currentUsers);
    }
    loadUsers();
    console.log("run user effect");
  }, []);
  */
  //useState hook for posts that retrieve from local storage of 'posts' key.
  /*
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("posts")) || []
  );*/

  //useState hook for comments that retrieve from local storage of 'comments' key.
  /*
  const [comments, setComments] = useState(
    JSON.parse(localStorage.getItem("comments")) || []
  );
    */
  //useEffect hook for listening to localStorage of current user with side effects

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  //useEffect hook for listening to localStorage of users with side effects
  /*
  useEffect(() => {
    window.addEventListener("storage", () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    });
  }, []);*/

  //function to filter and find the current user data
  const currentUser = () => {
    if (userData !== null) {
      //Necessary to use the original for-loop to loop through it because for-of loop won't work here.
      for (let i = 0; i < userData.length; i++) {
        if (userData[i].email === email) {
          setUserData(userData[i]);
        }
      }
    }
  };
  //currentUser();

  //check if user is logged in
  const loggedIn = () => {
    if (user !== null) {
      return true;
    }
    return false;
  };

  //to set the email with the emailEntered field
  /*const loginUser = (emailEntered) => {
    setEmail(emailEntered);
  };*/

  const loginUser = (user) => {
    setUser(user);
  };

  //Remove a user from localStorage and set the email to null,
  // while setting the user data to all users, instead of the current user data.
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
