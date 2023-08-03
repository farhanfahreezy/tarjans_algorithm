export function validateInputString(input: string): boolean {
  // split
  const lines = input.trim().split("\n");

  // regex
  const regex = /^\s*\S+\s+\S+\s*$/;

  // check
  for (const line of lines) {
    if (!regex.test(line)) {
      return false;
    }
  }
  return true;
}

export function inputToData(input: string): string[][] {
  const lines = input.trim().split("\n");
  const nodes: string[][] = [];

  for (const line of lines) {
    const [node1, node2] = line.trim().split(" ");
    nodes.push([node1, node2]);
  }

  return nodes;
}
