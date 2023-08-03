interface GraphProps {
  nodeName: string[];
  neighbour: string[][];
}

const Graph = ({ nodeName, neighbour }: GraphProps) => {
  return (
    <div>
      <div className="flex flex-row gap-1">
        {nodeName.map((node, index) => (
          <div key={index}>{node}</div>
        ))}
      </div>
      <div>
        {neighbour.map((node, index) => (
          <div key={index}>
            {node[0]}
            {"->"}
            {node[1]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Graph;
