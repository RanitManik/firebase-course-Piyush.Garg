import "./sign-up.css";
import { useState } from "react";
import { useFirebase } from "../../contexts/Firebase.jsx";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpPage = () => {
  const firebase = useFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      const res = await firebase.signUpUserWithEmailAndPassword(email, password);
      console.log(res);
      console.log("Signed up Successfully");
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  };

  return (
    <div className="signup-page">
      <h2>Sign up Page</h2>
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
      <button onClick={signUp}>Sign up</button>
    </div>
  );
};

export default SignUpPage;
