import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "./firebase.js";
import "./App.css";
import SignInPage from "./pages/sign-in-page/sign-in-page.jsx";
import SignUpPage from "./pages/sign-up-page/sign-up-page.jsx";

const auth = getAuth(firebaseApp);

const App = () => {
  const signUpUser = async () => {
    const response = await createUserWithEmailAndPassword(
      auth,
      "iamranitmanik.dev@gmail.com",
      "iamranitmanik@123"
    );
    console.log(response.user);
  };

  return (
    <div className="App">
      <h1>Firebase React App</h1>
      <div className="container">
        <SignUpPage />
        <SignInPage />
      </div>
    </div>
  );
};

export default App;
