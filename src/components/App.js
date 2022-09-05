import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import firebase, { authService } from "../fbInstance";
import { onAuthStateChanged, updateCurrentUser } from "firebase/auth";
function App() {
  //로그인 여부 알기 가능.
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    //유저가 변화하는 것을 관찰하는 리스너 설정.
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = async () => {
    await updateCurrentUser(authService, authService.currentUser);
    setUserObj(authService.currentUser);
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        "initializing..."
      )}
    </>
  );
}

export default App;
