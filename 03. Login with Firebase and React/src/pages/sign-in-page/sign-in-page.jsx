import "./sign-in-page.css";
import { useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { firebaseApp } from "../../firebase.js";

const auth = getAuth(firebaseApp);
const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      console.log("Sign in successfully");
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  };

  return (
    <div className="signup-page">
      <h2>Sign in Page</h2>
      <label htmlFor="email"></label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="enter your email here"
      />
      <label htmlFor="password"></label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        value={password}
        placeholder="enter your password here"
      />
      <button onClick={signIn}>Sign in</button>
    </div>
  );
};

export default SignInPage;
