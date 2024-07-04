import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBb2MMmZAWMWvaHlVr8QRFnFiLeexX0ifs",
  authDomain: "yt-ranit.firebaseapp.com",
  projectId: "yt-ranit",
  storageBucket: "yt-ranit.appspot.com",
  messagingSenderId: "288125328435",
  appId: "1:288125328435:web:fb15a3b426a5f5bec61746",
  databaseURL: "https://yt-ranit-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

// Create a context for Firebase
const FirebaseContext = createContext(null);

// Custom hook to use the Firebase context
export const useFirebase = () => useContext(FirebaseContext);

// Firebase provider component
export const FirebaseProvider = ({ children }) => {
  const signUpUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const logInWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const putData = (key, data) => set(ref(database, key), data);

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user ? user : null);
    });
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(firebaseAuth);
      console.log("signOut successfully");
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  };


  return (
    <FirebaseContext.Provider
      value={{
        signUpUserWithEmailAndPassword,
        logInWithEmailAndPassword,
        putData,
        user,
        handleSignOut
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
