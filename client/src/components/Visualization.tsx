import React from "react";

interface NodeInput {
  nodes: string[][];
}

interface Output {
  Bridges: string[][];
  SSCs: string[][];
}

interface VisualizationProps {
  data: NodeInput;
  answer: Output;
  loading: boolean;
  runtime: number;
}

const Visualization = ({
  data,
  answer,
  loading,
  runtime,
}: VisualizationProps) => {
  return (
    <div className="flex flex-col items-center justify-center bg-red-50">
      <div>
        {data.nodes.map((node, index) => (
          <div key={index}>{node}</div>
        ))}
      </div>
    </div>
  );
};

export default Visualization;
