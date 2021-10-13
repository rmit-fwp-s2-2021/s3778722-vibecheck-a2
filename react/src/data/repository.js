import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------

async function getUsers() {
  const response = await axios.get(API_HOST + `/api/users/`);
  return response.data;
}

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
  console.log(response.data);
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

async function editPost(post) {
  const response = await axios.put(API_HOST + "/api/posts/edit", post);
  return response.data;
}

async function deletePost(post_id) {
  const response = await axios.delete(
    API_HOST + `/api/posts/delete/${post_id}`
  );

  return response.data;
}

// --- Comment ------------------------------------------------------------------------------------
async function getComments() {
  const response = await axios.get(API_HOST + "/api/comments");

  return response.data;
}

async function createComment(comment) {
  const response = await axios.post(API_HOST + "/api/comments", comment);
  return response.data;
}

// Post Likes
async function getPostLikes() {
  const response = await axios.get(API_HOST + "/api/postlikes");

  return response.data;
}

async function createPostLikes(postlike) {
  const response = await axios.post(API_HOST + "/api/postlikes", postlike);
  return response.data;
}

async function editPostLikes(postlike) {
  const response = await axios.put(API_HOST + "/api/postlikes/edit", postlike);
  return response.data;
}

// Comment Likes
async function getCommentLikes() {
  const response = await axios.get(API_HOST + "/api/commentlikes");

  return response.data;
}

async function createCommentLikes(commentlike) {
  const response = await axios.post(
    API_HOST + "/api/commentlikes",
    commentlike
  );
  return response.data;
}

async function editCommentLikes(commentlike) {
  const response = await axios.put(
    API_HOST + "/api/commentlikes/edit",
    commentlike
  );
  return response.data;
}

// Follows
async function getFollows() {
  const response = await axios.get(API_HOST + "/api/follows");

  return response.data;
}

// Follows
async function createFollows(user) {
  const response = await axios.post(API_HOST + "/api/follows", user);

  return response.data;
}

async function deleteFollow(follow_id) {
  const response = await axios.delete(
    API_HOST + `/api/follows/delete/${follow_id}`
  );

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
  getUsers,
  editPost,
  deletePost,
  getComments,
  createComment,
  getPostLikes,
  createPostLikes,
  editPostLikes,
  getCommentLikes,
  createCommentLikes,
  editCommentLikes,
  getFollows,
  createFollows,
  deleteFollow,
};
