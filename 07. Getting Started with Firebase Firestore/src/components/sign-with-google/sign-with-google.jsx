import "../sign-with-google.css";
import { useFirebase } from "../../contexts/Firebase.jsx";

const SignWithGoogle = () => {
  const firebase = useFirebase();

  return (
    <button onClick={firebase.signInWithGoogle} className="sign-with-google">
      Continue with Google
    </button>
  );
};

export default SignWithGoogle;
