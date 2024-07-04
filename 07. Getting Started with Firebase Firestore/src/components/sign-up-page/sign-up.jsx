import "../sign-up.css";
import { useState } from "react";
import { useFirebase } from "../../contexts/Firebase.jsx";

const SignUp = () => {
  const firebase = useFirebase();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () =>
    await firebase.signUpUserWithEmailAndPassword(email, password);

  return (
    <div className="sign-up-page">
      <h2>Sign up Page</h2>
      <label htmlFor="sign-up-name"></label>
      <input
        onChange={(e) => setName(e.target.value)}
        id="sign-up-name"
        value={name}
        type="text"
        placeholder="enter your name here"
      />

      <label htmlFor="sign-up-email"></label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        id="sign-up-email"
        value={email}
        type="email"
        placeholder="enter your email here"
      />
      <label htmlFor="sign-up-password"></label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        id="sign-up-password"
        type="password"
        value={password}
        placeholder="enter your password here"
      />
      <button onClick={signUp}>Sign up</button>
    </div>
  );
};

export default SignUp;
