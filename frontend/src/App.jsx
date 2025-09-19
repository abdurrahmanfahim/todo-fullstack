import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((data) => {});
  });
  return (
    <>
      <h1>hello devs</h1>
    </>
  );
}

export default App;
