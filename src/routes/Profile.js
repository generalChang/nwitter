import { signOut, updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { authService, dbService } from "../fbInstance";

export default ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(
    userObj.displayName ? userObj.displayName : userObj.email.split("@")[0]
  );
  const onLogOutClick = () => {
    signOut(authService);
  };

  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc"),
      where("creatorId", "==", userObj.uid)
    );

    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {});
  };
  useEffect(() => {
    getMyNweets();
  }, []);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(authService.currentUser, {
      displayName: newDisplayName,
    });
    refreshUser();
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update" />
      </form>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};
