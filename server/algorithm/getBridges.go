package algorithm

func GetBridges(nodeInput *NodeInput) [][]string {
	adjMatrix := InputToAdjacencyMatrix(nodeInput)
	return tarjanBridges(adjMatrix)
}

func tarjanBridges(adjMatrix *AdjacencyMatrix) [][]string {
	n := len(adjMatrix.nodeName)
	visited := make([]bool, n)
	disc := make([]int, n)
	low := make([]int, n)
	parent := make([]int, n)
	bridges := [][]string{}

	// Helper function to find bridges in the graph
	var dfsBridge func(u, time int)

	dfsBridge = func(u, time int) {
		children := 0
		time++
		disc[u] = time
		low[u] = time
		visited[u] = true

		for v := 0; v < n; v++ {
			if adjMatrix.adj[u][v] == 1 {
				if !visited[v] {
					children++
					parent[v] = u
					dfsBridge(v, time)
					low[u] = min(low[u], low[v])

					if low[v] > disc[u] {
						// Bridge found
						bridge := []string{adjMatrix.nodeName[u], adjMatrix.nodeName[v]}
						bridges = append(bridges, bridge)
					}
				} else if v != parent[u] {
					low[u] = min(low[u], disc[v])
				}
			}
		}
	}

	for i := 0; i < n; i++ {
		if !visited[i] {
			dfsBridge(i, 0)
		}
	}

	return bridges
}