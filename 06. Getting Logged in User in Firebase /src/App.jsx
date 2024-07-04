import "./App.css";
import SignInPage from "./components/sign-in-page/sign-in-page.jsx";
import SignUpPage from "./components/sign-up-page/sign-up-page.jsx";
import { useFirebase } from "./contexts/Firebase.jsx";

const App = () => {
  const { user, handleSignOut } = useFirebase();

  if (!user) {
    return (
      <div className="App">
        <h1>Firebase React App</h1>
        <div className="container">
          <SignUpPage />
          <SignInPage />
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <h1>Firebase React App</h1>
      <div className="container logged-in">
        <h2>Hello, {user.email}</h2>
        <button onClick={handleSignOut}>Log out</button>
      </div>
    </div>
  );
};
export default App;
