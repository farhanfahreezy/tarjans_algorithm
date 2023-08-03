import axios from "axios";
import { useState } from "react";
import FileInput from "./components/FileInput";
import { inputToData, validateInputString } from "./components/validateInput";
import { toast } from "react-hot-toast";
import Visualization from "./components/Visualization";

interface NodeInput {
  nodes: string[][];
}

interface Output {
  Bridges: string[][];
  SSCs: string[][];
}

function App() {
  const [input, setInput] = useState("");

  const [data, setData] = useState<NodeInput>({
    nodes: [],
  });

  const [answer, setAnswer] = useState<Output>({
    Bridges: [],
    SSCs: [],
  });

  const [runtime, setRuntime] = useState(0);
  const [loading, setLoading] = useState(false);

  const BASE_URL = "http://localhost:3000/";

  const submitInput = () => {
    if (validateInputString(input)) {
      const newNodes = inputToData(input);
      setData({
        nodes: newNodes,
      });
      toast.success("Converted Input");
    } else {
      toast.error("Wrong Input");
      setData({
        nodes: [],
      });
    }
  };

  const getResponse = async () => {
    try {
      const response = await axios.post(BASE_URL + "getAnswer", data);
      const responseData = response.data.result as Output;
      setAnswer(responseData);
    } catch (err) {
      console.error(err);
    }
  };

  const inputChange = (s: string) => {
    setInput(s);
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-auto flex flex-col md:flex-row justify-start items-center bg-secondaryWhite font-openSans">
      <div className="md:w-1/3 w-full md:min-h-full bg-primaryWhite p-5 flex flex-col justify-center items-center shadow-md z-[1]">
        <FileInput
          value={input}
          onChange={inputChange}
          onSubmit={submitInput}
          loading={loading}
        />
      </div>
      <div className="md:w-2/3 w-full md:min-h-full bg-secondaryWhite p-5 flex flex-col justify-center items-center z-[0]">
        <Visualization
          data={data}
          answer={answer}
          loading={loading}
          runtime={runtime}
        />
      </div>
    </div>
  );
}

export default App;
