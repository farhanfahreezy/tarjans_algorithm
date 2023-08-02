import axios from "axios";
import { useState } from "react";

interface NodeInput {
  nodes: string[][];
}

interface Output {
  Bridges: string[][];
  SSCs: string[][];
}

function App() {
  const [data, setData] = useState<NodeInput>({
    nodes: [],
  });

  const [answer, setAnswer] = useState<Output>({
    Bridges: [],
    SSCs: [],
  });

  const buttonClick = () => {
    setData({
      nodes: [
        ["A", "B"],
        ["B", "C"],
        ["C", "A"],
        ["B", "D"],
        ["D", "E"],
        ["E", "F"],
        ["F", "E"],
      ],
    });
  };

  const buttonClick2 = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/getAnswer",
        data
      );
      const responseData = response.data.result as Output;
      setAnswer(responseData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="font-openSans min-h-screen w-full flex flex-col justify-center items-center">
      <button
        className="border-2 border-black py-2 px-4 rounded-md"
        onClick={buttonClick}
      >
        Click Me
      </button>
      {data.nodes.map((node, index) => (
        <div key={index}>{node}</div>
      ))}
      <button
        className="border-2 border-black py-2 px-4 rounded-md"
        onClick={buttonClick2}
      >
        Click Me 2
      </button>
      <div>
        <div>SSCs</div>
        {answer.SSCs.map((ssc, index) => (
          <div key={index}>{ssc}</div>
        ))}
      </div>
      <div>
        <div>Bridges</div>
        {answer.Bridges.map((bridge, index) => (
          <div key={index}>{bridge}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
