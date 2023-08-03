import { Node, Edge } from "vis-network/standalone/esm/vis-network";

export function dataToSSCEdge(data: string[][], sscs: string[][]): Edge[] {
  const edges: Edge[] = [];
  let id = 1;

  // all node that have pair
  for (let i = 0; i < sscs.length; i++) {
    for (const node of sscs[i]) {
      const child = getChildren(data, node);
      if (child.length != 0) {
        for (const childNode of child) {
          if (sscs[i].includes(childNode)) {
            if (!isExistOnEdgeList(edges, node, childNode)) {
              edges.push({
                from: node,
                to: childNode,
                id: id++,
                arrows: { to: true },
              });
            }
          }
        }
      }
    }
  }

  return edges;
}

export function dataToEdge(data: string[][]): Edge[] {
  const edges: Edge[] = [];
  let id = 0;

  for (const node of data) {
    edges.push({
      from: node[0],
      to: node[1],
      id: id++,
      arrows: { to: true },
    });
  }

  return edges;
}

export function getNodes(symbol: string[]): Node[] {
  const nodes: Node[] = [];
  const maxNodes = symbol.length;

  for (let id = 0; id < maxNodes; id++) {
    nodes.push({
      id: symbol[id],
      label: symbol[id],
    });
  }

  return nodes;
}

export function getSymbol(data: string[][]): string[] {
  const symbol: string[] = [];
  for (const nodes of data) {
    for (const nodeName of nodes) {
      if (!symbol.includes(nodeName)) {
        symbol.push(nodeName);
      }
    }
  }
  return symbol;
}

function getChildren(data: string[][], check: string): string[] {
  const children: string[] = [];
  for (const node of data) {
    if (node[0] == check) {
      children.push(node[1]);
    }
  }
  return children;
}

function isExistOnEdgeList(edges: Edge[], from: string, to: string): boolean {
  for (const edge of edges) {
    if (edge.from == from && edge.to == to) {
      return true;
    }
  }
  return false;
}
