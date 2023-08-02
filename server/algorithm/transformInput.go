package algorithm

import "fmt"

func InputToNodeArray(nodeInput *NodeInput) *NodeArray {
	symbols := getAllSymbol(nodeInput)
	var nodes []Node
	for _, symbol := range symbols {
		var neighbor []string
		for _, node := range nodeInput.Nodes {
			if node[0] == symbol {
				neighbor = append(neighbor, node[1])
			}
		}
		node := Node{
			name:       symbol,
			neighbours: neighbor,
			id:         -1,
			low_link:   -1,
			visited:    false,
		}
		nodes = append(nodes, node)
	}
	nodeArray := NodeArray{nodes}
	return &nodeArray
}

func InputToAdjacencyMatrix(nodeInput *NodeInput) *AdjacencyMatrix {
	symbols := getAllSymbol(nodeInput)
	fmt.Println(symbols)
	var adj [][]int

	for _, symbol := range symbols {
		adjrow := make([]int, len(symbols))
		for _, node := range nodeInput.Nodes {
			if node[0] == symbol {
				adjrow[getIdxFromSymbol(symbols, node[1])] = 1
			}
		}
		adj = append(adj, adjrow)
	}
	adjacencyMatrix := &AdjacencyMatrix{
		nodeName: symbols,
		adj:      adj,
	}
	return adjacencyMatrix
}

func getAllSymbol(nodeInput *NodeInput) []string {
	var symbols []string

	for _, node := range nodeInput.Nodes {
		for _, nodee := range node {
			if !isContain(symbols, nodee) {
				symbols = append(symbols, nodee)
			}
		}
	}
	return symbols
}

func isContain(symbols []string, check string) bool {
	for _, member := range symbols {
		if member == check {
			return true
		}
	}
	return false
}

func getIdxFromSymbol(symbols []string, check string) int {
	for i := 0; i < len(symbols); i++ {
		if symbols[i] == check {
			return i
		}
	}
	return -1
}