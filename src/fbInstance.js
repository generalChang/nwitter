import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCZtWXKSENMoPwrLbq3KFhrG_XPDWDj0sA",
  authDomain: "nwitter-8d439.firebaseapp.com",
  projectId: "nwitter-8d439",
  storageBucket: "nwitter-8d439.appspot.com",
  messagingSenderId: "65337635359",
  appId: "1:65337635359:web:b0e67bda580ff311fddb2a",
  measurementId: "G-QK97V613JM",
};

const app = initializeApp(firebaseConfig);

export default app;

export const authService = getAuth(app);
export const dbService = getFirestore(app);
export const storageService = getStorage(app);
