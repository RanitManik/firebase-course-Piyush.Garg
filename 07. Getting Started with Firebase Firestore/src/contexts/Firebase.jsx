import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc
} from "firebase/firestore";

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
export const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// Create a context for Firebase
const FirebaseContext = createContext(null);

// Custom hook to use the Firebase context
export const useFirebase = () => useContext(FirebaseContext);

// Initialize firestore
const firestore = getFirestore(firebaseApp);

// Firebase provider component
export const FirebaseProvider = ({ children }) => {
  const signUpUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
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
        password
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

  // firestore functions =>
  const writeData = async () => {
    const res = await addDoc(collection(firestore, "cities"), {
      name: "delhi",
      pinCode: 1234
    });
    console.log(res);
  };

  const makeSubCollection = async () => {
    try {
      const res = await addDoc(collection(firestore, "cities/2XxUHX1SaH6XTeASWpTH/places"), {
        name: "This is a place in delhi",
        description: "This is a place in delhi",
        date: Date.now()
      });
      console.log("successfully created sub collection");
    } catch (error) {
      console.log(error);
    }
  };

  const getDocument = async () => {
    const ref = doc(firestore, "cities", "2XxUHX1SaH6XTeASWpTH");
    const snapshot = await getDoc(ref);
    console.log(snapshot);
  };

  const getDocuments = async () => {
    const collectionRef = collection(firestore, "users");
    const q = query(collectionRef, where("isMale", "==", true));
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  const updateDocument = async (user) => {
    const DocRef = doc(firestore, "cities", "2XxUHX1SaH6XTeASWpTH");
    await updateDoc(DocRef, {
      name: "Old Delhi"
    });
    console.log("Updated document successfully:");
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        signUpUserWithEmailAndPassword,
        logInWithEmailAndPassword,
        signInWithGoogle,
        handleSignOut,
        writeData,
        makeSubCollection,
        getDocument,
        getDocuments,
        updateDocument
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
