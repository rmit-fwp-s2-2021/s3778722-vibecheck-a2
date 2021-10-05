import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import defaultUser from "../assets/user.svg";
import S3 from "react-aws-s3";

//s3 config data
const S3_BUCKET = "vibe-check-bucket";
const REGION = "us-east-2";
const ACCESS_KEY = "AKIAY2GYTGQRMNTBUBGO";
const SECRET_ACCESS_KEY = "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";

//assign the s3 config data
const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};

//initialize the s3 config data with the client
const ReactS3Client = new S3(config);

const Posts = (props) => {
  //useState hooks
  const [post, setPost] = useState("");
  const [comment, setComment] = useState("");
  const [postEdit, setPostEdit] = useState("");
  const [editId, setEditId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorEditMessage, setErrorEditMessage] = useState(null);
  const [fileSelected, setFileSelected] = useState(null);

  //useLocation hook to retrieve the current page location
  let location = useLocation();

  //event handler for the input change on the post field
  const handleInputChange = (event) => {
    setPost(event.target.value);
  };

  //event handler for the edit input change
  const handleEditInputChange = (event) => {
    setPostEdit(event.target.value);
  };

  //event handler for the comment input change
  const handleCommentInputChange = (event) => {
    setComment(event.target.value);
  };

  //event handler for the postID when editing
  const handleEditID = (event) => {
    //remove error message once opened
    setErrorEditMessage(null);
    setEditId(event.target.value);
  };

  //event handler for the comment
  const handleComment = (event) => {
    event.preventDefault();

    //assign all the comment data with new comment input
    let commentsData = [
      ...props.comments,
      {
        postID: event.target.value,
        commentId: uuidv4(),
        name: props.user.name,
        comment: comment,
        email: props.user.email,
        date: new Date().toLocaleString("en-US", {
          timeZone: "Australia/Melbourne",
        }),
      },
    ];

    //set the comment data and save it to local storage in json format
    localStorage.setItem("comments", JSON.stringify(commentsData));
    props.setComments(commentsData);
    setComment("");
  };

  //event handler for editing a post
  const handleEdit = (event) => {
    event.preventDefault();
    const postTrimmed = postEdit.trim();
    //make sure the field is not empty
    if (postTrimmed === "") {
      setErrorEditMessage("An edit post cannot be empty.");
      return;
    }

    //assign the post data
    let tmpPost = [...props.posts];

    //loop through the post data and assign the new post input
    props.posts.forEach((postTmp, index) => {
      if (postTmp.postID === editId) {
        tmpPost[index].postID = postTmp.postID;
        tmpPost[index].email = postTmp.email;
        tmpPost[index].name = postTmp.name;
        tmpPost[index].text = postEdit;
        tmpPost[index].date = postTmp.date;
        tmpPost[index].dateData = postTmp.dateData;
      }
    });
    //set the new post data in local storage in json format
    props.setPosts(tmpPost);
    localStorage.setItem("posts", JSON.stringify(tmpPost));

    //reset the states
    setPostEdit("");
    setErrorEditMessage(null);
    setEditId(null);
  };

  //event handler for deleting a post
  const handleDelete = (event) => {
    //filter out the matched posts
    const removedPost = props.posts.filter(
      (removingPost) => removingPost.postID !== event.target.value
    );

    //filter out the matched comments
    const removedComment = props.comments.filter(
      (removingComment) => removingComment.postID !== event.target.value
    );

    //set and save the data on local storage in json format
    localStorage.setItem("posts", JSON.stringify(removedPost));
    props.setPosts(removedPost);
    localStorage.setItem("comments", JSON.stringify(removedComment));
    props.setComments(removedComment);
  };

  //event handler for form submit with async function
  //makes JavaScript wait until that promise settles and returns its result.
  const handleSubmit = async (event) => {
    event.preventDefault();
    //set a new unique id
    const uuid = uuidv4();
    // Trim the post text.
    const postTrimmed = post.trim();

    //make sure the post is not empty
    if (postTrimmed === "") {
      setErrorMessage("A post cannot be empty.");
      return;
    }

    //set new file name as the uuid
    const newFileName = uuid;

    let loc = null;

    //if file input is present, upload the file to react s3 bucket
    if (fileSelected) {
      setErrorMessage("Loading...");
      //The keyword await makes it wait until that promise settles and returns its result.
      const data = await ReactS3Client.uploadFile(fileSelected, newFileName);
      loc = data.location;
    }

    //assign post data
    let postsData = [
      ...props.posts,
      {
        //postid as the uuid
        postID: uuid,
        email: props.user.email,
        name: props.user.name,
        text: postTrimmed,
        //australia timezone in a presentable format
        date: new Date().toLocaleString("en-US", {
          timeZone: "Australia/Melbourne",
        }),
        //the current data
        dateData: Date.now(),
        //the s3 data location.
        imgUrl: loc,
      },
    ];

    //reset the input file field
    document.getElementById("fileUpload").value = "";
    //set the new post and save it in local storage as json format
    props.setPosts(postsData);
    localStorage.setItem("posts", JSON.stringify(postsData));

    // Reset post content.
    setPost("");
    setErrorMessage("");
    setFileSelected(null);
  };

  //get data from local storage by parsing the json
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let comments = JSON.parse(localStorage.getItem("comments")) || [];

  //find the matching email address
  const found = (email) => {
    return users.find((u) => u.email === email);
  };

  //filter out the matching comments linked to the post
  const foundComments = (id) => {
    return comments.filter((c) => c.postID === id);
  };

  //event handler for file input
  const handleFileInput = (event) => {
    setFileSelected(event.target.files[0]);
  };

  return (
    <>
      {location.pathname !== "/home" && (
        <h1 className="display-6 mt-4">New Post</h1>
      )}
      <div className="wrapper">
        {location.pathname !== "/home" && (
          <form onSubmit={handleSubmit}>
            <fieldset>
              <div className="form-group mb-3">
                <textarea
                  name="post"
                  id="post"
                  className="form-control"
                  rows="3"
                  placeholder="Share your thoughts..."
                  value={post}
                  onChange={handleInputChange}
                />
              </div>
              {errorMessage !== null && (
                <div className="form-group">
                  <span className="text-danger">{errorMessage}</span>
                </div>
              )}
              <input
                className="form-control form-control-sm mb-3"
                id="fileUpload"
                type="file"
                onChange={handleFileInput}
              />
              <div className="form-group">
                <input
                  type="button"
                  className="btn btn-danger me-2"
                  value="Cancel"
                  onClick={() => {
                    setPost("");
                    setErrorMessage(null);
                  }}
                />

                <input type="submit" className="btn btn-primary" value="Post" />
              </div>
            </fieldset>
          </form>
        )}
        <hr />
        {location.pathname === "/home" ? (
          <h1 className="display-6 mt-4">All Posts</h1>
        ) : (
          <h1 className="display-6 mt-4">My Posts</h1>
        )}
        <div>
          {props.posts.length === 0 ? (
            <span className="text-muted">No posts have been submitted.</span>
          ) : (
            props.posts.map((x) => {
              if (x.email === props.email && location.pathname !== "/home") {
                return (
                  <div
                    className="border my-3 p-3"
                    style={{ whiteSpace: "pre-wrap" }}
                    key={x.postID}
                  >
                    <div className="container mt-5 mb-5">
                      <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-md-6">
                          <div className="card">
                            <div className="d-flex justify-content-between p-2 px-3">
                              <div className="d-flex flex-row align-items-center">
                                {props.user.imgUrl ? (
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
                                <div className="d-flex flex-column ms-2">
                                  <span className="fw-bold me-auto">
                                    {x.name}
                                  </span>
                                  <small className="text-primary">
                                    {x.email}
                                  </small>
                                </div>
                              </div>
                              <div className="d-flex flex-row ellipsis">
                                <small className="text-muted">{x.date}</small>
                                <i className="fa fa-ellipsis-h"></i>{" "}
                              </div>
                            </div>{" "}
                            {x.imgUrl && (
                              <img
                                src={x.imgUrl}
                                className="img-fluid"
                                alt="post-img"
                              />
                            )}
                            <div className="p-2">
                              <p className="text-center">{x.text}</p>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex flex-row muted-color ms-auto">
                                  {foundComments(x.postID).length} comments
                                </div>
                              </div>

                              {props.comments.map((c) => {
                                if (c.postID === x.postID) {
                                  return (
                                    <>
                                      <hr />
                                      <div className="d-flex flex-row align-items-center">
                                        {props.user.imgUrl ? (
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
                                        <div className="d-flex flex-column ms-2">
                                          <span className="fw-bold me-auto">
                                            {c.name}
                                          </span>
                                          <span className="me-auto text-primary">
                                            {c.email}
                                          </span>
                                          <small className="comment-text me-auto">
                                            {c.comment}
                                          </small>
                                          <div className="d-flex flex-row align-items-center status">
                                            <small>{c.date}</small>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                }
                                return null;
                              })}

                              <hr />
                              <form>
                                <textarea
                                  name="comment"
                                  id="comment"
                                  className="form-control"
                                  rows="3"
                                  placeholder="Add your comment."
                                  value={comment}
                                  onChange={handleCommentInputChange}
                                />
                                <button
                                  type="Submit"
                                  className="btn btn-primary mt-3 mb-2"
                                  onClick={handleComment}
                                  value={x.postID}
                                >
                                  Comment
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="btn btn-outline-danger m-1"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      value={x.postID}
                      onClick={handleEditID}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      value={x.postID}
                      onClick={handleDelete}
                    >
                      Delete
                    </button>

                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Edit content
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            {errorEditMessage !== null && (
                              <div className="form-group">
                                <span className="text-danger">
                                  {errorEditMessage}
                                </span>
                              </div>
                            )}
                            <form>
                              <textarea
                                name="edit-post"
                                id="edit-post"
                                className="form-control"
                                rows="3"
                                placeholder="Edit your post..."
                                value={postEdit}
                                onChange={handleEditInputChange}
                              />
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="Submit"
                                  className="btn btn-primary"
                                  onClick={handleEdit}
                                >
                                  Save changes
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else if (location.pathname === "/home") {
                return (
                  <div
                    className="border my-3 p-3"
                    style={{ whiteSpace: "pre-wrap" }}
                    key={x.postID}
                  >
                    <div className="container mt-5 mb-5">
                      <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-md-6">
                          <div className="card">
                            <div className="d-flex justify-content-between p-2 px-3">
                              <div className="d-flex flex-row align-items-center">
                                {found(x.email).imgUrl ? (
                                  <img
                                    src={found(x.email).imgUrl}
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
                                <div className="d-flex flex-column ms-2">
                                  <span className="fw-bold me-auto">
                                    {x.name}
                                  </span>
                                  <small className="text-primary">
                                    {x.email}
                                  </small>
                                </div>
                              </div>
                              <div className="d-flex flex-row ellipsis">
                                <small className="text-muted">{x.date}</small>
                                <i className="fa fa-ellipsis-h"></i>{" "}
                              </div>
                            </div>{" "}
                            {x.imgUrl && (
                              <img
                                src={x.imgUrl}
                                className="img-fluid"
                                alt="post-img"
                              />
                            )}
                            <div className="p-2">
                              <p className="text-center">{x.text}</p>
                              <hr />
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex flex-row muted-color ms-auto">
                                  {" "}
                                  <span className="me-2">
                                    {foundComments(x.postID).length} comments
                                  </span>{" "}
                                </div>
                              </div>

                              {props.comments.map((c) => {
                                if (c.postID === x.postID) {
                                  return (
                                    <>
                                      <hr />
                                      <div className="d-flex flex-row align-items-center">
                                        {found(c.email).imgUrl ? (
                                          <img
                                            src={found(c.email).imgUrl}
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
                                        <div className="d-flex flex-column ms-2">
                                          <span className="fw-bold me-auto">
                                            {c.name}
                                          </span>
                                          <span className="me-auto text-primary">
                                            {c.email}
                                          </span>
                                          <small className="comment-text me-auto">
                                            {c.comment}
                                          </small>
                                          <div className="d-flex flex-row align-items-center status">
                                            <small>{c.date}</small>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  );
                                }
                                return null;
                              })}

                              <hr />
                              <form>
                                <textarea
                                  name="comment"
                                  id="comment"
                                  className="form-control"
                                  rows="3"
                                  placeholder="Add your comment."
                                  value={comment}
                                  onChange={handleCommentInputChange}
                                />
                                <button
                                  type="Submit"
                                  className="btn btn-primary mt-3 mb-2"
                                  onClick={handleComment}
                                  value={x.postID}
                                >
                                  Comment
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Posts;
