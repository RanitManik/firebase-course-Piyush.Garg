import "./App.css";
import SignInPage from "./components/sign-in-page/sign-in-page.jsx";
import SignUpPage from "./components/sign-up-page/sign-up-page.jsx";
import { useFirebase } from "./contexts/Firebase.jsx";
import { useState, useEffect } from "react";

const App = () => {
  const { putData, getData, onValueRealTime } = useFirebase();
  const [name, setName] = useState("");

  const putNewData = async () => {
    await putData("root/a/b", {
      id: 1,
      name: "ranit manik",
    });
  };

  const getNewData = async () => {
    const data = await getData("root/a/b");
    if (data) {
      setName(data.name);
    }
  };

  useEffect(() => {
    const unsubscribe = onValueRealTime("root/a/b", (data) => {
      if (data) {
        setName(data.name);
      }
    });

    return () => unsubscribe();
  }, [onValueRealTime]);

  return (
    <div className="App">
      <h1>Firebase React App</h1>
      <div className="container">
        <SignUpPage />
        <SignInPage />
      </div>
      <button onClick={putNewData}>Put New Data</button>
      <button onClick={getNewData}>Get New Data</button>
      <h3>{name}</h3>
    </div>
  );
};

export default App;
