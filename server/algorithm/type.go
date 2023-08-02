package algorithm

type Node struct {
	name       string
	neighbours []string
	id         int
	low_link   int
	visited    bool
}

type NodeArray struct {
	nodes []Node
}

type AdjacencyMatrix struct {
	nodeName []string
	adj      [][]int
}

type NodeInput struct {
	Nodes [][]string
}

type Output struct {
	SSCs    [][]string
	Bridges [][]string
}