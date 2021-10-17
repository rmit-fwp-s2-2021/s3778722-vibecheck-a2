import React, { useState, useEffect } from "react";
import {
  getFollows,
  getUsers,
  createFollows,
  deleteFollow,
} from "../data/repository";

//Props is used to receive data from parent
const Follow = (props) => {
  //useState hooks for follows and users
  const [follows, setFollows] = useState([]);
  const [users, setUsers] = useState([]);

  //useEffect hook will be executed when the follows length is changed.
  useEffect(() => {
    //load the latest follows
    async function loadFollows() {
      const currentFollowings = await getFollows();
      setFollows(currentFollowings);
    }
    loadFollows();
  }, [follows.length]);

  //useEffect hook will be executed when the follows length is changed.
  useEffect(() => {
    //load the latest users
    async function loadUsers() {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    }
    loadUsers();
  }, [follows.length]);

  //filter the matching emails from follows
  //to obtain the current user followings
  const currentUserFollowings = () => {
    return follows.filter((f) => f.userEmail === props.user.email);
  };
  //filter the users available to be followed
  const filterUnfollowedUsers = () => {
    const allEmail = users.map((u) => u.email);
    const followed = currentUserFollowings().map((f) => f.followEmail);
    const newList = [];

    //loop through all the emails
    for (const x of allEmail) {
      //check if it is already included in the current user followings
      //excludes the current email if matches
      if (!followed.includes(x) && x !== props.user.email) {
        newList.push(x);
      }
    }
    const resList = [];
    //loop through users to obtain all the data fields needed
    //Include only the users that matches the previous "newList" obtained
    for (const i of users) {
      if (newList.includes(i.email)) {
        resList.push(i);
      }
    }
    return resList;
  };

  //handle the follow event
  const handleFollow = async (event) => {
    event.preventDefault();
    let newFollow = {
      userEmail: props.user.email,
      followEmail: event.target.value,
    };
    const tmpFollows = await createFollows(newFollow);
    setFollows([...follows, tmpFollows]);
  };

  //handle the unfollow event
  const handleUnfollow = async (event) => {
    event.preventDefault();
    const deletedFollow = await deleteFollow(event.target.value);
    setFollows([...follows, deletedFollow]);
  };

  return (
    <div>
      <h1 className="display-6">Users to Follow</h1>

      <ul className="list-group list-group-numbered">
        {filterUnfollowedUsers().length === 0 && (
          <p className="text-info bg-dark">No users to follow...</p>
        )}
        {filterUnfollowedUsers().map((i) => {
          return (
            <li className="list-group-item" key={i.email}>
              <h5>{i.name}</h5>
              <p>Email: {i.email}</p>
              <p>Date joined: {i.date}</p>
              <button
                type="button"
                className="btn btn-primary"
                value={i.email}
                onClick={handleFollow}
              >
                Follow
              </button>
            </li>
          );
        })}
      </ul>
      <br />

      <br />
      <h1 className="display-6">My Followings</h1>
      <ul className="list-group list-group-numbered">
        {currentUserFollowings().length === 0 && (
          <p className="text-info bg-dark">No followings...</p>
        )}
        {currentUserFollowings().map((f) => {
          return (
            f.user && (
              <li className="list-group-item" key={f.follow_id}>
                <h5>{f.user.name}</h5>
                <p>Email: {f.user.email}</p>
                <p>Date joined: {f.user.date}</p>
                <button
                  type="button"
                  className="btn btn-danger"
                  value={f.follow_id}
                  onClick={handleUnfollow}
                >
                  Unfollow
                </button>
              </li>
            )
          );
        })}
      </ul>
      <br />
      <br />
    </div>
  );
};

export default Follow;
