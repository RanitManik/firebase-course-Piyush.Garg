// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
