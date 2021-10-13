import React, { useState, useEffect } from "react";
import {
  getFollows,
  getUsers,
  createFollows,
  deleteFollow,
} from "../data/repository";

const Follow = (props) => {
  const [follows, setFollows] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function loadFollows() {
      const currentFollowings = await getFollows();
      setFollows(currentFollowings);
    }
    loadFollows();
  }, [follows.length]);

  useEffect(() => {
    async function loadUsers() {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    }
    loadUsers();
  }, [follows.length]);

  const currentUserFollowings = () => {
    return follows.filter((f) => f.userEmail === props.user.email);
  };

  const filterUnfollowedUsers = () => {
    const allEmail = users.map((u) => u.email);
    const followed = currentUserFollowings().map((f) => f.followEmail);
    const newList = [];
    for (const x of allEmail) {
      if (!followed.includes(x) && x !== props.user.email) {
        newList.push(x);
      }
    }
    const resList = [];
    for (const i of users) {
      if (newList.includes(i.email)) {
        resList.push(i);
      }
    }
    return resList;
  };

  const handleFollow = async (event) => {
    event.preventDefault();
    let newFollow = {
      userEmail: props.user.email,
      followEmail: event.target.value,
    };
    const tmpFollows = await createFollows(newFollow);

    setFollows([...follows, tmpFollows]);
  };

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
