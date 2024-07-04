import { useState } from "react";
import { useFirebase } from "../../contexts/Firebase.jsx";

const SignIn = () => {
  const firebase = useFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () =>
    await firebase.logInWithEmailAndPassword(email, password);

  return (
    <div className="signup-page">
      <h2>Sign in Page</h2>
      <label htmlFor="sign-in-email"></label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        id="sign-in-email"
        value={email}
        type="email"
        placeholder="enter your email here"
      />
      <label htmlFor="sign-in-password"></label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        id="sign-in-password"
        type="password"
        value={password}
        placeholder="enter your password here"
      />
      <button onClick={signIn}>Sign in</button>
    </div>
  );
};

export default SignIn;
