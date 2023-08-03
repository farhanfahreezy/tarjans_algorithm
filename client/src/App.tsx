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
  const [selected, setSelected] = useState(1);

  const BASE_URL = "http://localhost:3000/";

  const submitInput = () => {
    if (validateInputString(input)) {
      const newNodes = inputToData(input);
      setData({
        nodes: newNodes,
      });
      setSelected(1);
      setAnswer({
        SSCs: [],
        Bridges: [],
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
    setRuntime(0);
    setLoading(true);
    const start = performance.now();

    try {
      const response = await axios.post(BASE_URL + "getAnswer", data);
      const responseData = response.data.result as Output;
      setAnswer(responseData);
      toast.success("SSCs and Bridges Found");
    } catch (err) {
      console.error(err);
    } finally {
      const end = performance.now();
      const runtime = end - start;
      setRuntime(runtime);
      setLoading(false);
    }
  };

  const inputChange = (s: string) => {
    setInput(s);
  };

  const selectedChange = (n: number) => {
    setSelected(n);
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-auto flex flex-col-reverse md:flex-row justify-start items-center bg-secondaryWhite font-openSans">
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
          getAnswer={getResponse}
          selected={selected}
          selectedChange={selectedChange}
        />
      </div>
    </div>
  );
}

export default App;
