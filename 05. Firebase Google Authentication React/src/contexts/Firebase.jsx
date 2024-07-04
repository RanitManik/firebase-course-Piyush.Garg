import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBb2MMmZAWMWvaHlVr8QRFnFiLeexX0ifs",
  authDomain: "yt-ranit.firebaseapp.com",
  projectId: "yt-ranit",
  storageBucket: "yt-ranit.appspot.com",
  messagingSenderId: "288125328435",
  appId: "1:288125328435:web:fb15a3b426a5f5bec61746",
  databaseURL: "https://yt-ranit-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// Create a context for Firebase
const FirebaseContext = createContext(null);

// Custom hook to use the Firebase context
export const useFirebase = () => useContext(FirebaseContext);

// Firebase provider component
export const FirebaseProvider = ({ children }) => {
  const signUpUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      // Handle successful sign up
      console.log("User signed up:", userCredential.user);
    } catch (error) {
      // Handle errors
      console.error("Error signing up:", error.message);
    }
  };

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      // Handle successful log in
      console.log("User logged in:", userCredential.user);
    } catch (error) {
      // Handle errors
      console.error("Error logging in:", error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(firebaseAuth, googleProvider);
      // Handle successful sign in with Google
      console.log("User signed in with Google:", res.user);
    } catch (error) {
      // Handle errors
      console.error("Error signing in with Google:", error.message);
    }
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user ? user : null);
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    return signOut(firebaseAuth);
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        signUpUserWithEmailAndPassword,
        logInWithEmailAndPassword,
        signInWithGoogle,
        handleSignOut,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
