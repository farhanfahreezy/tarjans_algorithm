import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [message, setmessage] = useState("Hello");

  useEffect(() => {
    console.log();
    fetchData();
  }, []);

  async function fetchData() {
    axios
      .get("http://localhost:3000/")
      .then((res) => {
        console.log("Get Data");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="font-openSans min-h-screen w-full flex flex-col justify-center items-center">
      {message}
    </div>
  );
}

export default App;
