export function dataToGraph(data: string[][], sscs: string[][]): string[][] {
  const nodes: string[][] = [];

  // all node that have pair
  for (let i = 0; i < sscs.length; i++) {
    for (const node of sscs[i]) {
      const child = getChildren(data, node);
      if (child.length != 0) {
        for (const childNode of child) {
          if (sscs[i].includes(childNode)) {
            const newPair = [node, childNode];
            if (!nodes.includes(newPair)) {
              nodes.push(newPair);
            }
          }
        }
      }
    }
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
