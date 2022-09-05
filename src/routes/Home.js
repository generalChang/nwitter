import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import { dbService, storageService } from "../fbInstance";
import { v4 as uuidv4 } from "uuid";
import NweetFactory from "../components/NweetFactory";
export default ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    //real-time 적용하기.
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setNweets(nweetArray);
    });
  }, []);

  return (
    <div>
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            isOwner={nweet.creatorId === userObj.uid}
            nweetObj={nweet}
          />
        ))}
      </div>
    </div>
  );
};
