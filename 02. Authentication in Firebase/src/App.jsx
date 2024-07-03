import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "./firebase.js";
import "./App.css";
import SignUpPage from "./pages/sign-up-page.jsx";

const auth = getAuth(firebaseApp);

const App = () => {
  const signUpUser = async () => {
    const response = await createUserWithEmailAndPassword(
      auth,
      "iamranitmanik.dev@gmail.com",
      "iamranitmanik@123",
    );
    console.log(response.user);
  };

  return (
    <div className="App">
      <h1>Firebase React App</h1>
      <SignUpPage />
    </div>
  );
};

export default App;
