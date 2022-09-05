import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { dbService, storageService } from "../fbInstance";

export default ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false); //editing mode.
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you wanna delete this nweet?");
    if (ok) {
      //delete
      await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
      if (nweetObj.attachmentUrl !== "") {
        await deleteObject(ref(storageService, nweetObj.attachmentUrl));
      }
    } else {
    }
  };

  const toggleEditting = () => {
    setEditing((prev) => !prev);
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
      text: newNweet,
    });

    setEditing(false);
  };
  return (
    <div key={nweetObj.id}>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="edit your nweet"
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditting}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditting}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};
