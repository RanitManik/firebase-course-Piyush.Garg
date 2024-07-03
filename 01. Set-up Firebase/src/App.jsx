import { app } from "./firebase.js";
import { getDatabase, ref, set } from "firebase/database";
import "./App.css";

const db = getDatabase(app);

function App() {
  const putData = () => {
    set(ref(db, "users/ranit"), {
      id: 1,
      name: "ranit Manik",
      age: 19
    });
  };
  return (
    <>
      <h1>Firebase React App</h1>
      <button onClick={putData}>Put Data</button>
    </>
  );
}

export default App;
