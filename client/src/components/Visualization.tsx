import { useEffect, useState } from "react";
import Graph from "./Graph";
import { dataToGraph, getSymbol } from "./transformGraph";

interface NodeInput {
  nodes: string[][];
}

interface Output {
  Bridges: string[][];
  SSCs: string[][];
}

interface GraphProps {
  nodeName: string[];
  neighbour: string[][];
}

interface VisualizationProps {
  data: NodeInput;
  answer: Output;
  loading: boolean;
  runtime: number;
  getAnswer: () => void;
  selected: number;
  selectedChange: (n: number) => void;
}

const Visualization = ({
  data,
  answer,
  loading,
  runtime,
  getAnswer,
  selected,
  selectedChange,
}: VisualizationProps) => {
  const [graph, setGraph] = useState<GraphProps>({
    nodeName: [],
    neighbour: [],
  });

  useEffect(() => {
    if (selected == 1) {
      setGraph({
        nodeName: getSymbol(data.nodes),
        neighbour: data.nodes,
      });
    } else if (selected == 2) {
      setGraph({
        nodeName: getSymbol(data.nodes),
        neighbour: dataToGraph(data.nodes, answer.SSCs),
      });
    } else if (selected == 3) {
      setGraph({
        nodeName: getSymbol(data.nodes),
        neighbour: dataToGraph(data.nodes, answer.Bridges),
      });
    }
  }, [selected, data.nodes, answer.Bridges, answer.SSCs]);

  return (
    <div className="flex flex-row items-center justify-center gap-5">
      <Graph {...graph} />
      <div className="flex flex-col items-center justify-center bg-white p-4 shadow-lg rounded-xl">
        <div className="font-medium text-[20px] pb-2">Visualization</div>
        <div className="flex flex-col justify-center items-center w-full gap-1">
          <button
            disabled={data.nodes.length == 0 || loading}
            onClick={getAnswer}
            className="disabled:bg-dimBlue disabled:cursor-not-allowed bg-primaryBlue w-full py-2 px-6 rounded-md text-white font-medium hover:scale-105 active:scale-95 disabled:hover:scale-100 transition-all"
          >
            Find Answer
          </button>
          <div>Runtime : {runtime.toFixed(3)} ms</div>
        </div>
        <div className=" bg-gray-400 w-full h-[1px] my-2" />
        <div className="mb-2">Choose Visualization</div>
        <div className="flex flex-col justify-center items-center text-white gap-1">
          <button
            disabled={data.nodes.length == 0}
            onClick={() => {
              selectedChange(1);
            }}
            className="disabled:bg-dimBlue disabled:cursor-not-allowed bg-primaryBlue w-full py-2 px-6 rounded-md text-white font-medium hover:scale-105 active:scale-95 disabled:hover:scale-100 transition-all"
          >
            Original Graph
          </button>
          <button
            disabled={answer.SSCs.length == 0}
            onClick={() => {
              selectedChange(2);
            }}
            className="disabled:bg-dimBlue disabled:cursor-not-allowed bg-primaryBlue w-full py-2 px-6 rounded-md text-white font-medium hover:scale-105 active:scale-95 disabled:hover:scale-100 transition-all"
          >
            SSCs
          </button>
          <button
            disabled={answer.Bridges.length == 0}
            onClick={() => {
              selectedChange(3);
            }}
            className="disabled:bg-dimBlue disabled:cursor-not-allowed bg-primaryBlue w-full py-2 px-6 rounded-md text-white font-medium hover:scale-105 active:scale-95 disabled:hover:scale-100 transition-all"
          >
            Bridges
          </button>
        </div>
      </div>
    </div>
  );
};

export default Visualization;
