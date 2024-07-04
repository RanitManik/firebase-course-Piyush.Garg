import "./App.css";
import SignInPage from "./components/sign-in-page/sign-in-page.jsx";
import SignUpPage from "./components/sign-up-page/sign-up-page.jsx";

const App = () => {
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
