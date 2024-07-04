import SignIn from "../components/sign-in/sign-in.jsx";
import SignUp from "../components/sign-up-page/sign-up.jsx";
import SignWithGoogle from "../components/sign-with-google/sign-with-google.jsx";
import { useFirebase } from "../contexts/Firebase.jsx";

const HomePage = () => {
  const {
    user,
    handleSignOut,
    writeData,
    makeSubCollection,
    getDocument,
    getDocuments,
    updateDocument
  } = useFirebase();

  if (!user) {
    return (
      <div className="App">
        <h1>Firebase React App</h1>
        <div className="container">
          <SignUp />
          <SignIn />
        </div>
        <SignWithGoogle />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Hello, {user.displayName ? user.displayName : user.email}</h1>
      <button onClick={handleSignOut}>Log out</button>
      <div className="btn-container">
        <button onClick={writeData}>put Document</button>
        <button onClick={makeSubCollection}>make Collection</button>
        <button onClick={getDocument}>get Document</button>
        <button onClick={getDocuments}>get Documents by query</button>
        <button onClick={updateDocument}>update Document</button>
      </div>
    </div>
  );
};
export default HomePage;
