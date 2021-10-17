import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import defaultUser from "../assets/user.svg";
import S3 from "react-aws-s3";
import {
  createPost,
  editPost,
  deletePost,
  createComment,
  getPostLikes,
  getPosts,
  getComments,
  editPostLikes,
  createPostLikes,
  getCommentLikes,
  editCommentLikes,
  createCommentLikes,
} from "../data/repository";

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
  const [postLikes, setPostLikes] = useState([]);
  const [commentLikes, setCommentLikes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorEditMessage, setErrorEditMessage] = useState(null);
  const [fileSelected, setFileSelected] = useState(null);
  //destructure props
  const { setPosts, setComments } = props;
  //useEffect Hook to load the latest post likes when postlikes length is changed
  useEffect(() => {
    async function loadPostLikes() {
      const currentPostLikes = await getPostLikes();
      const currentPosts = await getPosts();
      setPostLikes(currentPostLikes);
      setPosts(currentPosts);
    }
    loadPostLikes();
  }, [setPosts, postLikes.length]);

  //useEffect Hook to load the latest comment likes when commentlikes length is changed
  useEffect(() => {
    async function loadCommentLikes() {
      const currentCommentLikes = await getCommentLikes();
      const currentComments = await getComments();
      setCommentLikes(currentCommentLikes);
      setComments(currentComments);
    }
    loadCommentLikes();
  }, [setComments, commentLikes.length]);

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

  //Handle create post like, like is set to true
  const handleCreatePostLike = async (event) => {
    event.preventDefault();
    let newPostLike = {
      like: true,
      dislike: false,
      userEmail: props.user.email,
      postPostId: parseInt(event.target.value),
    };
    const tmpPostLike = await createPostLikes(newPostLike);
    setPostLikes([...postLikes, tmpPostLike]);
  };

  //Handle create post dislike, dislike is set to true
  const handleCreatePostDislike = async (event) => {
    event.preventDefault();
    let newPostLike = {
      like: false,
      dislike: true,
      userEmail: props.user.email,
      postPostId: parseInt(event.target.value),
    };
    const tmpPostLike = await createPostLikes(newPostLike);
    setPostLikes([...postLikes, tmpPostLike]);
  };

  //Handle create comment like, like is set to true
  const handleCreateCommentLike = async (event) => {
    event.preventDefault();

    let newCommentLike = {
      like: true,
      dislike: false,
      userEmail: props.user.email,
      commentCommentId: parseInt(event.target.value),
    };
    const tmpCommentLike = await createCommentLikes(newCommentLike);
    setCommentLikes([...commentLikes, tmpCommentLike]);
  };

  //Handle create comment dislike, dislike is set to true
  const handleCreateCommentDislike = async (event) => {
    event.preventDefault();
    let newCommentLike = {
      like: false,
      dislike: true,
      userEmail: props.user.email,
      commentCommentId: parseInt(event.target.value),
    };
    const tmpCommentLike = await createCommentLikes(newCommentLike);
    setCommentLikes([...commentLikes, tmpCommentLike]);
  };

  //Edit post like
  const handlePostLike = async (event) => {
    event.preventDefault();
    let tmpPostLike = {};
    postLikes.forEach((x) => {
      if (x.postlike_id === parseInt(event.target.value)) {
        tmpPostLike["postlike_id"] = x.postlike_id;
        tmpPostLike["like"] = true;
        tmpPostLike["dislike"] = false;
        tmpPostLike["postPostId"] = x.postPostId;
        tmpPostLike["userEmail"] = x.userEmail;
      }
    });
    const editedPostLike = await editPostLikes(tmpPostLike);
    setPostLikes([...postLikes, editedPostLike]);
  };

  //Edit post dislike
  const handlePostDislike = async (event) => {
    event.preventDefault();
    let tmpPostDislike = {};
    postLikes.forEach((x) => {
      if (x.postlike_id === parseInt(event.target.value)) {
        tmpPostDislike["postlike_id"] = x.postlike_id;
        tmpPostDislike["like"] = false;
        tmpPostDislike["dislike"] = true;
        tmpPostDislike["postPostId"] = x.postPostId;
        tmpPostDislike["userEmail"] = x.userEmail;
      }
    });
    const editedPostLike = await editPostLikes(tmpPostDislike);
    setPostLikes([...postLikes, editedPostLike]);
  };

  //Edit comment like
  const handleCommentLike = async (event) => {
    event.preventDefault();
    let tmpCommentLike = {};
    commentLikes.forEach((x) => {
      if (x.commentlike_id === parseInt(event.target.value)) {
        tmpCommentLike["commentlike_id"] = x.commentlike_id;
        tmpCommentLike["like"] = true;
        tmpCommentLike["dislike"] = false;
        tmpCommentLike["commentCommentId"] = x.commentCommentId;
        tmpCommentLike["userEmail"] = x.userEmail;
      }
    });
    const editedCommentLike = await editCommentLikes(tmpCommentLike);
    setCommentLikes([...commentLikes, editedCommentLike]);
  };
  //Edit comment dislike
  const handleCommentDislike = async (event) => {
    event.preventDefault();
    let tmpCommentDislike = {};
    commentLikes.forEach((x) => {
      if (x.commentlike_id === parseInt(event.target.value)) {
        tmpCommentDislike["commentlike_id"] = x.commentlike_id;
        tmpCommentDislike["like"] = false;
        tmpCommentDislike["dislike"] = true;
        tmpCommentDislike["commentCommentId"] = x.commentCommentId;
        tmpCommentDislike["userEmail"] = x.userEmail;
      }
    });
    const editedCommentLike = await editCommentLikes(tmpCommentDislike);
    setCommentLikes([...commentLikes, editedCommentLike]);
  };

  //handler for showing post likes and dislikes
  const showPostLikesDislikes = (userEmail, post) => {
    const found = () => {
      if (post.postLikes) {
        //get the post like by finding the email that match the current user and current post
        return post.postLikes.find(
          (x) => x.userEmail === userEmail && x.postPostId === post.post_id
        );
      }
    };

    if (
      found() &&
      found().like === true &&
      found().dislike === false &&
      found().userEmail === userEmail
    ) {
      return (
        <>
          <button type="button" className="btn btn-primary btn-sm me-2">
            Like
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            value={found().postlike_id}
            onClick={handlePostDislike}
          >
            Dislike
          </button>
        </>
      );
    } else if (
      found() &&
      found().like === false &&
      found().dislike === true &&
      found().userEmail === userEmail
    ) {
      return (
        <>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm me-2"
            value={found().postlike_id}
            onClick={handlePostLike}
          >
            Like
          </button>
          <button type="button" className="btn btn-danger btn-sm">
            Dislike
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm me-2"
            value={post.post_id}
            onClick={handleCreatePostLike}
          >
            Like
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            value={post.post_id}
            onClick={handleCreatePostDislike}
          >
            Dislike
          </button>
        </>
      );
    }
  };

  //handler for showing comment likes and dislikes
  const showCommentLikesDislikes = (userEmail, comment) => {
    const found = () => {
      if (comment.commentLikes) {
        //get the comment like by finding the email that match the current user and current comment
        return comment.commentLikes.find(
          (x) =>
            x.userEmail === userEmail &&
            x.commentCommentId === comment.comment_id
        );
      }
    };
    if (
      found() &&
      found().like === true &&
      found().dislike === false &&
      found().userEmail === userEmail
    ) {
      return (
        <>
          <button type="button" className="btn btn-primary btn-sm me-2">
            Like
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            value={found().commentlike_id}
            onClick={handleCommentDislike}
          >
            Dislike
          </button>
        </>
      );
    } else if (
      found() &&
      found().like === false &&
      found().dislike === true &&
      found().userEmail === userEmail
    ) {
      return (
        <>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm me-2"
            value={found().commentlike_id}
            onClick={handleCommentLike}
          >
            Like
          </button>
          <button type="button" className="btn btn-danger btn-sm">
            Dislike
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm me-2"
            value={comment.comment_id}
            onClick={handleCreateCommentLike}
          >
            Like
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            value={comment.comment_id}
            onClick={handleCreateCommentDislike}
          >
            Dislike
          </button>
        </>
      );
    }
  };

  //event handler for the comment
  const handleComment = async (event) => {
    event.preventDefault();
    const commentTrimmed = comment.trim();

    //make sure the post is not empty
    if (commentTrimmed === "") {
      alert("A comment cannot be empty.");
      return;
    } else if (commentTrimmed.length > 600) {
      alert("A comment cannot be more than 600 characters long.");
      return;
    }

    //assign all the comment data with new comment input
    let newComment = {
      postPostId: event.target.value,
      userEmail: props.user.email,
      text: commentTrimmed,
      date: new Date().toLocaleString("en-US", {
        timeZone: "Australia/Melbourne",
      }),
    };
    const resComment = await createComment(newComment);

    props.setComments([...props.comments, resComment]);
    setComment("");
  };

  //event handler for editing a post
  const handleEdit = async (event) => {
    event.preventDefault();
    const postTrimmed = postEdit.trim();
    //make sure the field is not empty
    if (postTrimmed === "") {
      setErrorEditMessage("An edit post cannot be empty.");
      return;
    }

    //assign the post data
    let tmpPost = {};
    //loop through the post data and assign the new post input
    props.posts.forEach((postTmp) => {
      if (postTmp.post_id === parseInt(editId)) {
        tmpPost["post_id"] = postTmp.post_id;
        tmpPost["text"] = postTrimmed;
        tmpPost["imgUrl"] = postTmp.imgUrl;
        tmpPost["date"] = postTmp.date;
        tmpPost["dateData"] = postTmp.dateData;
      }
    });
    const editedPost = await editPost(tmpPost);
    props.setPosts([...props.posts, editedPost]);

    //reset the states
    setPostEdit("");
    setErrorEditMessage(null);
    setEditId(null);
  };

  //event handler for deleting a post
  const handleDelete = async (event) => {
    //filter out the matched posts

    await deletePost(event.target.value);
    const removedPost = props.posts.filter(
      (removingPost) => removingPost.post_id !== parseInt(event.target.value)
    );
    props.setPosts(removedPost);
  };

  //event handler for form submit with async function
  //makes JavaScript wait until that promise settles and returns its result.
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Trim the post text.
    const postTrimmed = post.trim();

    //make sure the post is not empty
    if (postTrimmed === "") {
      setErrorMessage("A post cannot be empty.");
      return;
    } else if (postTrimmed.length > 600) {
      setErrorMessage("A post cannot be more than 600 characters long.");
      return;
    }

    let loc = null;
    const dateNow = Date.now().toString();
    //if file input is present, upload the file to react s3 bucket
    if (fileSelected) {
      setErrorMessage("Loading...");
      //The keyword await makes it wait until that promise settles and returns its result.
      const data = await ReactS3Client.uploadFile(fileSelected, dateNow);
      loc = data.location;
    }

    //assign post data
    let newPost = {
      userEmail: props.user.email,
      text: postTrimmed,
      //australia timezone in a presentable format
      date: new Date().toLocaleString("en-US", {
        timeZone: "Australia/Melbourne",
      }),
      //the current data
      dateData: Date.now(),
      //the s3 data location.
      imgUrl: loc,
    };
    const resPost = await createPost(newPost);
    //reset the input file field
    document.getElementById("fileUpload").value = "";

    props.setPosts([...props.posts, resPost]);
    // Reset post content.
    setPost("");
    setErrorMessage("");
    setFileSelected(null);
  };

  //filter out the matching comments linked to the post
  const foundComments = (id) => {
    return props.comments.filter((c) => c.postPostId === id);
  };
  //filter the post likes and count
  const countLikes = (post) => {
    if (post.postLikes) {
      const list = post.postLikes.filter((x) => x.like === true);
      return list.length;
    }
  };

  // filter the post dislikes and count
  const countDislikes = (post) => {
    if (post.postLikes) {
      const list = post.postLikes.filter((x) => x.dislike === true);
      return list.length;
    }
  };

  //filter the comment likes and count
  const countCommentLikes = (comment) => {
    if (comment.commentLikes) {
      const list = comment.commentLikes.filter((x) => x.like === true);
      return list.length;
    }
  };

  //filter the comment dislikes and count
  const countCommentDislikes = (comment) => {
    if (comment.commentLikes) {
      const list = comment.commentLikes.filter((x) => x.dislike === true);
      return list.length;
    }
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
              if (
                x.userEmail === props.user.email &&
                location.pathname !== "/home"
              ) {
                return (
                  <div
                    className="border my-3 p-3"
                    style={{ whiteSpace: "pre-wrap" }}
                    key={x.post_id}
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
                                {x.user && (
                                  <div className="d-flex flex-column ms-2">
                                    <span className="fw-bold me-auto">
                                      {x.user.name}
                                    </span>
                                    <small className="text-primary">
                                      {x.user.email}
                                    </small>
                                  </div>
                                )}
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
                                <div className="d-flex flex-row muted-color me-auto">
                                  {showPostLikesDislikes(props.user.email, x)}
                                </div>
                                <div className="d-flex flex-row muted-color ms-auto">
                                  <p className="badge bg-primary text-wrap mt-2 me-2">
                                    {countLikes(x)} Likes{" "}
                                  </p>
                                  <p className="badge bg-danger text-wrap mt-2 me-2">
                                    {countDislikes(x)} Dislikes{" "}
                                  </p>
                                  <p className="badge bg-secondary text-wrap mt-2 me-2">
                                    {foundComments(x.post_id).length} Comments
                                  </p>
                                </div>
                              </div>

                              {props.comments.map((c) => {
                                if (c.postPostId === x.post_id) {
                                  return (
                                    <div key={c.comment_id}>
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
                                            {c.user.name}
                                          </span>
                                          <span className="me-auto text-primary">
                                            {c.user.email}
                                          </span>
                                          <small className="text-comment me-auto">
                                            {c.text}
                                          </small>
                                          <div className="d-flex flex-row align-items-center badge bg-secondary text-wrap">
                                            <small>{c.date}</small>
                                          </div>
                                          <div className="d-flex flex-row muted-color ">
                                            <p className="badge bg-primary text-wrap mt-2 me-2">
                                              {countCommentLikes(c)} Likes{" "}
                                            </p>
                                            <p className="badge bg-danger text-wrap mt-2">
                                              {countCommentDislikes(c)} Dislikes{" "}
                                            </p>
                                          </div>
                                        </div>

                                        <div className="d-flex flex-row muted-color ms-auto">
                                          {showCommentLikesDislikes(
                                            props.user.email,
                                            c
                                          )}
                                        </div>
                                      </div>
                                    </div>
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
                                  value={x.post_id}
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
                      value={x.post_id}
                      onClick={handleEditID}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      value={x.post_id}
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
                    key={x.post_id}
                  >
                    <div className="container mt-5 mb-5">
                      <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-md-6">
                          <div className="card">
                            <div className="d-flex justify-content-between p-2 px-3">
                              <div className="d-flex flex-row align-items-center">
                                {x.user.imgUrl ? (
                                  <img
                                    src={x.user.imgUrl}
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
                                    {x.user.name}
                                  </span>
                                  <small className="text-primary">
                                    {x.user.email}
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
                                <div className="d-flex flex-row muted-color me-auto">
                                  {showPostLikesDislikes(props.user.email, x)}
                                </div>
                                <div className="d-flex flex-row muted-color ms-auto">
                                  <p className="badge bg-primary text-wrap mt-2 me-2">
                                    {countLikes(x)} Likes{" "}
                                  </p>
                                  <p className="badge bg-danger text-wrap mt-2 me-2">
                                    {countDislikes(x)} Dislikes{" "}
                                  </p>
                                  <p className="badge bg-secondary text-wrap mt-2 me-2">
                                    {foundComments(x.post_id).length} comments
                                  </p>
                                </div>
                              </div>

                              {props.comments.map((c) => {
                                if (c.postPostId === x.post_id) {
                                  return (
                                    <div key={c.comment_id}>
                                      <hr />
                                      <div className="d-flex flex-row align-items-center">
                                        {c.user.imgUrl ? (
                                          <img
                                            src={c.user.imgUrl}
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
                                            {c.user.name}
                                          </span>
                                          <span className="me-auto text-primary">
                                            {c.user.email}
                                          </span>
                                          <small className="comment-text me-auto">
                                            {c.text}
                                          </small>
                                          <div className="d-flex flex-row align-items-center badge bg-secondary text-wrap">
                                            <small>{c.date}</small>
                                          </div>
                                          <div className="d-flex flex-row muted-color ">
                                            <p className="badge bg-primary text-wrap mt-2 me-2">
                                              {countCommentLikes(c)} Likes{" "}
                                            </p>
                                            <p className="badge bg-danger text-wrap mt-2">
                                              {countCommentDislikes(c)} Dislikes{" "}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="d-flex flex-row muted-color ms-auto">
                                          {showCommentLikesDislikes(
                                            props.user.email,
                                            c
                                          )}
                                        </div>
                                      </div>
                                    </div>
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
                                  value={x.post_id}
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
