import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(email, password) {
  const response = await axios.get(API_HOST + "/api/users/login", {
    params: { email, password },
  });
  const user = response.data;

  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if (user !== null) {
    setUser(user);
  }
  return user;
}

async function findUser(email) {
  const response = await axios.get(API_HOST + `/api/users/select/${email}`);
  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

async function editUser(user) {
  const response = await axios.put(API_HOST + "/api/users/edit", user);
  return response.data;
}

async function deleteUser(user) {
  const response = await axios.delete(API_HOST + "/api/users/delete", {
    data: user,
  });
  return response.data;
}

// --- Post ---------------------------------------------------------------------------------------
async function getPosts() {
  const response = await axios.get(API_HOST + "/api/posts");

  return response.data;
}

async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);

  return response.data;
}

// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser,
  findUser,
  createUser,
  editUser,
  getPosts,
  createPost,
  getUser,
  removeUser,
  setUser,
  deleteUser,
};
